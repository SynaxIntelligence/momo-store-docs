---
tags: [arch, hugo]
title: Архитектура
weight: 3
prev: /docs/getting-started
sidebar:
  open: false
---

# Архитектура приложения

## 1. Общий обзор

Приложение **momo-store** развёрнуто в Kubernetes-кластере и управляется системой GitOps через **Argo CD**.  
Архитектура включает два независимых микросервиса:

- **backend** — API-сервис на Go
- **frontend** — SPA-приложение, обслуживаемое через Nginx

Каждый компонент разворачивается как отдельный под-чарт Helm и имеет собственный Deployment, Service, ConfigMap и связанные объекты Kubernetes.

Argo CD визуализирует состояние всех ресурсов и отслеживает их синхронизацию с Git-репозиторием конфигурации.

---

## 2. Логическая архитектура компонентов

Архитектура состоит из следующих основных уровней:

### ● **Корневой Helm-чарт (momo-store)**
Управляет всей структурой приложения и описывает его зависимые компоненты.

**Ресурсы корневого уровня:**
- `configmap momo-store-backend`
- `configmap momo-store-frontend`
- `docker-config secret` (секрет для контейнерного registry)
- два сервисных ресурса:
    - `momo-store-backend`
    - `momo-store-frontend`

Корневой чарт также генерирует окруженческие значения (`values-dev.yaml`, `values-prod.yaml`), которые обновляются CI/CD.

---

## 3. Backend слой

### ● Deployment: `momo-store-backend`
Backend представлен как отдельный Deployment, содержащий одну реплику (по скриншоту), но допускающий автоматическую горизонтальную или вертикальную масштабируемость.

**Backend включает:**

#### 3.1. ConfigMap `momo-store-backend`
Хранит конфигурационные параметры сервиса:
- адреса внешних зависимостей
- параметры подключения
- переменные окружения

#### 3.2. Secret `docker-config`
Используется как imagePullSecret для скачивания Docker-образа.

#### 3.3. Service `momo-store-backend`
- тип: `ClusterIP`
- публикует backend внутри кластера
- используется frontend-приложением

#### 3.4. ReplicaSets
Argo CD отображает множество ReplicaSet с историей ревизий:

- `momo-store-backend-7cdc89…`
- `momo-store-backend-5bd857…`
- `momo-store-backend-5b6d7f…`

Каждый ReplicaSet представляет собой конкретную версию backend-образа.

#### 3.5. Pod
Каждый ReplicaSet создаёт Pod с контейнером backend:
- состояние: `running`
- готовность: `1/1`
- в логах Argo CD отображается возраст Pod и версия образа

Backend обновляется **через GitOps** — изменения в values-файлах приводят к созданию нового ReplicaSet и замене Pod.

---

## 4. Frontend слой

### ● Deployment: `momo-store-frontend`
Frontend — SPA-сайт, обслуживаемый Nginx.

**Frontend включает:**

#### 4.1. ConfigMap `momo-store-frontend`
Используется для:
- хранения Nginx-конфигурации
- подключения переменных окружения, используемых SPA

#### 4.2. Service `momo-store-frontend`
- тип: `ClusterIP`
- frontend доступен в кластере по этому сервису
- используется ingress-контроллером

#### 4.3. Ingress `momo-store-frontend`
Ingress определяет:
- внешний URL приложения
- аннотации под nginx-controller
- TLS-конфигурацию

Argo CD отображает также сертификат `app-k8s-snx-tls`, автоматически управляемый cert-manager.

#### 4.4. ReplicaSets frontend
История деплоев:

- `momo-store-frontend-dc8b77f…`
- `momo-store-frontend-5fb547…`
- `momo-store-frontend-8d8d4c…`
- `momo-store-frontend-7cf86c…`

Каждый ReplicaSet соответствует очередному образу frontend.

---

## 5. Поток данных и взаимодействие компонентов

### 5.1. Взаимодействие frontend → backend
- Frontend вызывает backend по внутреннему DNS-имени сервиса:

```text
http://momo-store-backend:PORT
```
### 5.2. Внешний доступ

Все внешние запросы идут через:

* Ingress Controller
* TLS-сертификат (`app-k8s-snx-tls`)
* Nginx в frontend-поде
* далее SPA обращается к backend по сервису

### 5.3. Обновление приложения

1. CI обновляет chart в Git (image.tag + appVersion).
2. Argo CD детектирует drift.
3. Argo CD применяет новую версию Helm-чарта.
4. Kubernetes создаёт новый ReplicaSet.
5. Поды заменяются по rolling update.

## 6. GitOps-архитектура

### Основные свойства:

* Helm-чарты не деплоятся напрямую из CI/CD.
* Вместо этого CI обновляет конфигурационный репозиторий.
* Argo CD синхронизирует состояние с кластером.
* Репликация и rollback управляются через ReplicaSet историю.

Это делает архитектуру предсказуемой, декларативной и безопасной.

---

## 7. Преимущества архитектуры

* **Микросервисность** — backend и frontend изолированы, обновляются независимо.
* **Надёжность** — autosync Argo CD гарантирует консистентное состояние.
* **История версий** — полная история ReplicaSet развёртываний.
* **GitOps** — кластер всегда соответствует Git.
* **Безопасность** — TLS сертификаты и imagePullSecrets.
* **Гибкость** — можно разворачивать dev/prod через разные values-файлы.



