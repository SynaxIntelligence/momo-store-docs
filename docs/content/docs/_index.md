---
linkTitle: "Документация"
title: Введение
comments: true
---

<!--more-->

## **Что такое Архитектурный портал?**

Портал `{{< tooltip "Архитектурный портал" >}}` предоставляет централизованное решение для
- **Проектирования и управления архитектурными моделями** – визуальное и программное описание архитектуры с возможностью автоматической валидации.
- **Интеграции с DevOps-процессами** – автоматическая генерация YAML-манифестов для развертывания.  
- **Хранения и версионирования архитектурных артефактов** – использование Git-репозитория для контроля изменений.  
- **Автоматизации преобразований между моделями** – механизм ETL для согласования архитектурных артефактов между различными системами.  
- **Гибкой настройки маппинга методологий** – поддержка конфигурационных файлов для сопоставления сущностей и связей.

## **Ключевые технологии и стек**

**`Архитектурные практики`** - микросервисы, event-driven архитектура, гексагональная архитектура, GitOps, Clean Architecture.<br>
**`DevOps и инфраструктура`** - Kubernetes, Docker, Terraform, Ansible, Argo CD, Helm, CI/CD (GitLab, GitHub Actions).<br>
**`Безопасность и IAM`** - Keycloak, Vault, OAuth2/OIDC, TLS/PKI, DevSecOps-инструменты (Trivy, Gitleaks, Semgrep).<br>
**`Данные и интеграция`** - PostgreSQL, ClickHouse, Kafka, Spark, MinIO, SQLMesh, REST/gRPC.<br>
**`Языки и фреймворки`** - Python (ML, Data Engineering, backend), .NET 8 (enterprise backend), React/Next.js (frontend).<br>
**`Мониторинг и Observability`** - Prometheus, Grafana, Loki, ELK.

## Далее

{{< cards cols=1 >}}
  {{< card link="getting-started" title="Главная" icon="document-text" subtitle="Описание проекта" >}}
{{< /cards >}}
