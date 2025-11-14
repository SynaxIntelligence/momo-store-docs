---
title: Главная
weight: 1
next: /docs/guide
prev: /docs
---

## Портал документации

**DevOps для эксплуатации и разработки. Дипломная работа**<br></br>

{{< cards >}}
{{< card link="https://app.k8s.synax.ru/" title="Momo Store" subtitle="Пельмени" icon="menu" tag="app" >}}
{{< card link="/instructions/report" title="Чеклист" icon="menu" tag="report" >}}
{{< /cards >}}

> [!WARNING]
> `Ctrl + F5` в браузере, если не загружается главная страница \
> __требует подтвердить серты__

## Ресурсы

### Мониторинг

{{< cards >}}
{{< card link="http://prom.k8s.synax.ru:32011/" title="Prometheus" icon="prometheus" tag="mon" >}}
{{< card link="http://grafana.k8s.synax.ru:32010/" title="Grafana" icon="grafana" tag="mon" >}}
{{< /cards >}}

### Репозитории

{{< cards >}}
{{< card link="https://gitlab.praktikum-services.ru/std-041-32/momo-store-infra.git" title="momo-store-infra" subtitle="Terraform и Ansible" icon="gitlab-clr" tag="repo" tagType="info" >}}
{{< card link="https://gitlab.praktikum-services.ru/std-041-32/momo-store-env.git" title="momo-store-env" subtitle="Helm чарты" icon="gitlab-clr" tag="repo" tagType="info" >}}
{{< card link="https://gitlab.praktikum-services.ru/std-041-32/momo-store.git" title="momo-store" icon="gitlab-clr" subtitle="Приложение" tag="repo" tagType="info" >}}
{{< card link="https://github.com/SynaxIntelligence/momo-store-docs.git" title="momo-store-docs" icon="github" subtitle="Документация" tag="repo" tagType="info" >}}
{{< /cards >}}

### GitOps

{{< cards >}}
{{< card link="http://argocd.k8s.synax.ru:30580/" title="Argo CD" icon="argocd" tag="gitops" >}}
{{< card link="https://nexus.praktikum-services.tech/#browse/browse:sausage-store-helm-std-041-32" title="Nexus" icon="nexus" subtitle="Хранение Helm-пакетов" tag="gitops" >}}
{{< /cards >}}

## Здесь вы найдёте

### Инфраструктуру
- топологию k8s-кластера в Yandex Cloud
- Terraform + Ansible как IaC
- сетевую архитектуру, принципы развёртывания

### Архитектуру приложения
- структурную модель backend и frontend
- схемы взаимодействия компонентов
- GitOps-подход с использованием Argo CD
- Helm-чарты и окружения

### Репозиторий и CI/CD
- структуру исходного кода
- принцип работы пайплайнов GitLab CI
- сборку Docker-образов, версионирование, деплой

### Релизный цикл и версии
- правила формирования версий
- процесс выката в `dev` и `prod`
- связь между ветками, версиями и окружениями

### Стандарты и правила работы
- как обновлять инфраструктуру
- как публиковать изменения
- как проводить ревью и тестирование

Портал построен на статическом генераторе сайтов `Hugo`, что позволяет легко расширять его и поддерживать в актуальном виде.

## Структура портала

{{< filetree/container >}}
  {{< filetree/folder name="docs-portal" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/folder name="infrastructure" state="closed" >}}
      {{< /filetree/folder >}}      

      {{< filetree/folder name="develop" state="closed" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}

      {{< filetree/folder name="architecture" state="closed" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}
    
      {{< filetree/folder name="about" state="closed" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
  {{< filetree/file name="hugo.yaml" >}}
{{< /filetree/container >}}

## Далее

{{< cards >}}
  {{< card link="../infrastructure" title="Инфраструктура" icon="document" >}}  
  {{< card link="../develop" title="Репозиторий и CI/CD" icon="academic-cap" >}}
  {{< card link="../architecture" title="Архитектура" icon="document-duplicate" >}}  
{{< /cards >}}
