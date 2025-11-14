---
tags: [arch, hugo]
title: Архитектура
weight: 3
prev: /docs/getting-started
sidebar:
  open: false
---

## Общий обзор

Приложение **momo-store** развёрнуто в Kubernetes-кластере и управляется системой `GitOps` через **Argo CD**.  
Архитектура включает два независимых микросервиса:

- **backend** — API-сервис на `Go`
- **frontend** — `Vue.js` приложение, обслуживаемое через `Nginx`

Каждый компонент разворачивается как отдельный под-чарт Helm и имеет собственный Deployment, Service, ConfigMap и связанные объекты Kubernetes.
Argo CD визуализирует состояние всех ресурсов и отслеживает их синхронизацию с Git-репозиторием конфигурации.

## Логическая архитектура компонентов

Архитектура состоит из следующих основных уровней:

### Структура Helm-чартов

{{< filetree/container >}}
{{< filetree/folder name="charts" state="open" >}}

    {{< filetree/folder name="backend" state="closed" >}}
      {{< filetree/folder name="templates" state="open" >}}
        {{< filetree/file name="_helpers.tpl" >}}
        {{< filetree/file name="configmap.yaml" >}}
        {{< filetree/file name="deployment.yaml" >}}
        {{< filetree/file name="NOTES.txt" >}}
        {{< filetree/file name="secrets.yaml" >}}
        {{< filetree/file name="service.yaml" >}}
        {{< filetree/file name="vpa.yaml" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name=".helmignore" >}}
      {{< filetree/file name="Chart.yaml" >}}
      {{< filetree/file name="values.yaml" >}}
    {{< /filetree/folder >}}

    {{< filetree/folder name="frontend" state="closed" >}}
      {{< filetree/folder name="nginx" state="closed" >}}{{< /filetree/folder >}}
      {{< filetree/folder name="templates" state="open" >}}
        {{< filetree/file name="_helpers.tpl" >}}
        {{< filetree/file name="configmap.yaml" >}}
        {{< filetree/file name="deployment.yaml" >}}
        {{< filetree/file name="ingress.yaml" >}}
        {{< filetree/file name="NOTES.txt" >}}
        {{< filetree/file name="service.yaml" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name=".helmignore" >}}
      {{< filetree/file name="Chart.yaml" >}}
      {{< filetree/file name="values.yaml" >}}
    {{< /filetree/folder >}}

    {{< filetree/file name=".helmignore" >}}
    {{< filetree/file name="Chart.yaml" >}}
    {{< filetree/file name="values.yaml" >}}
    {{< filetree/file name="values-prod.yaml" >}}

{{< /filetree/folder >}}
{{< /filetree/container >}}

### **Корневой Helm-чарт (momo-store)**

Управляет всей структурой приложения и описывает его зависимые компоненты.
Корневой чарт также предоставляет базовые значения для окружений (`values-dev.yaml`, `values-prod.yaml`), которые обновляются CI/CD.

Корневой чарт в каталоге `charts/` описывает приложение целиком и может содержать зависимости на дочерние чарты `backend` и `frontend`.

- `Chart.yaml`
  - метаданные приложения (имя, версия чарта, `appVersion`);
  - список зависимостей на под-чарты (backend и frontend).

- `values.yaml`
  - базовые настройки по умолчанию для всех компонентов;
  - секции вида:
    - `backend: …`
    - `frontend: …`
  - общие параметры (namespace, глобальные аннотации/labels и т.п.).

- `values-prod.yaml`
  - переопределения для прод-окружения:
    - количество реплик;
    - ресурсы (requests/limits);
    - домены и аннотации ingress;
    - включение/отключение отдельных возможностей.

**Связь с CI/CD**

- GitLab-job `deploy` из шаблона `.deploy_template` работает по GitOps-подходу:  
  он копирует базовый `values.yaml` в `values-${CI_ENVIRONMENT_NAME}.yaml` в отдельном конфиг-репозитории, обновляет:
  - `.${DEPENDENCY_CHART_NAME}.image.tag = "${VERSION}"`
  - `.appVersion = "${VERSION}"` в `Chart.yaml`,
    после чего коммитит изменения.
- Применением этих изменений в кластер занимается внешний CD-инструмент (например, Argo CD).

### Helm-чарт backend

Каталог: `charts/backend`.

**Основные шаблоны:**

- `templates/deployment.yaml`
  - описание `Deployment` для backend-сервиса;
  - образ задаётся через `.Values.image.repository` и `.Values.image.tag`, которые обновляются из CI/CD;
  - конфигурация probe (readiness/liveness), ресурсы, переменные окружения.

- `templates/service.yaml`
  - сервис типа `ClusterIP` (как правило);
  - экспорт портов backend-приложения внутри кластера.

- `templates/configmap.yaml`
  - конфигурация приложения (строки подключения, флаги фич, URL-ы внешних сервисов и т.п.), прокидываемая в поды через env или volume.

- `templates/secrets.yaml`
  - описание `Secret` для чувствительных данных;
  - содержимое может приходить из внешних хранилищ (Vault, K8s-secrets), а чарт отвечает за монтирование.

- `templates/vpa.yaml`
  - объект `VerticalPodAutoscaler` (если включён), регулирующий ресурсы контейнеров.

- `_helpers.tpl`
  - шаблоны имён ресурсов (`fullname`, `name`, labels и т.п.), используемые во всех манифестах.

- `values.yaml`
  - значения по умолчанию: имя образа, тег, ресурсы, параметры сервиса, env-переменные.

### Helm-чарт frontend

Каталог: `charts/frontend`.

**Основные шаблоны:**

- `templates/deployment.yaml`
  - Deployment для SPA / frontend-сервиса (часто Nginx + статические файлы);
  - образ определяется через `.Values.image.*`, тег обновляется CI/CD.

- `templates/service.yaml`
  - сервис для frontend (обычно `ClusterIP`), к которому привязан ingress.

- `templates/ingress.yaml`
  - объект `Ingress`, публикующий frontend наружу;
  - домены и пути задаются в `.Values.ingress.hosts`, `.Values.ingress.tls`;
  - здесь же могут быть аннотации под ingress-контроллер (nginx, cert-manager, и т.п.).

- `templates/configmap.yaml`
  - конфигурация frontend (например, переменные окружения, URL API), монтируемая в контейнер.

- каталог `nginx/`
  - конфигурация Nginx, используемая образом frontend-сервиса (custom nginx.conf, location-правила и т.д.).

- `_helpers.tpl` и `values.yaml`
  - аналогично backend-чарту, содержат хелперы и значения по умолчанию.

### Среда и окружения

- **dev**
  - базируется на `values.yaml` с дополнительными dev-переключателями
  - CI/CD формирует `values-dev.yaml` в конфиг-репозитории и прописывает туда нужный `image.tag`

- **prod**
  - использует `values-prod.yaml` как основу
  - деплой в prod-окружение инициируется вручную (`when: manual`) для ветки `main`

### Роль Helm-чартов в общем потоке

1. Разработчик изменяет код backend или frontend
2. CI/CD:
  - собирает Docker-образы
  - рассчитывает `VERSION`
  - обновляет значения образов и `appVersion` в Helm-чартах в конфиг-репозитории
3. Внешний CD-контур (Argo CD) применяет изменения к кластеру
4. Kubernetes пересоздаёт поды backend и frontend на новых версиях образов
