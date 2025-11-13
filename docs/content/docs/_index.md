---
linkTitle: "Документация"
title: Введение
comments: true
---

<!--more-->

## **Ключевые технологии и стек**

**`Архитектурные практики`** - микросервисный подход, разделение frontend/backend, GitOps-модель доставки, декларативные окружения через Helm и Argo CD.

**`DevOps и инфраструктура`** - Kubernetes (k8s) в Yandex Cloud, Docker, Terraform (создание сети и ВМ), Ansible (bootstrap кластера через kubeadm), Helm-чарты, GitLab CI/CD, Argo CD для GitOps-синхронизации.

**`Безопасность и IAM`** - использование imagePullSecrets, TLS-сертификаты от cert-manager, безопасная публикация образов в GitLab Container Registry, SSH-доступ с ключами, защита CI-переменных.

**`Данные и интеграция`** - backend взаимодействует с внутренними сервисами и внешними API, конфигурации управляются через ConfigMap/Secrets, коммуникация внутри кластера через Service DNS.

**`Языки и фреймворки`**
- **Backend:** `Go` (REST API, компактный бинарный файл в Docker-образе).
- **Frontend:** `Vue.js` + Nginx (SPA).
- **CI-инфраструктура:** Bash/YAML (GitLab pipelines).

**`Мониторинг и Observability`** - `Prometheus` для метрик и состояния кластера, `Grafana` для визуализации; логирование через stdout Pod’ов с анализом в стандартных k8s-инструментах и `Grafana Loki`.

## Далее

{{< cards cols=1 >}}
  {{< card link="getting-started" title="Главная" icon="document-text" subtitle="Описание проекта" >}}
{{< /cards >}}
