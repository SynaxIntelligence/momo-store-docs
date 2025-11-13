---
title: Решения
weight: 3
prev: /docs/getting-started
sidebar:
  open: false
math: true
---

## Архитектурные решения

В этом разделе представлены архитектурные решения, разработанные для различных доменных областей. Каждая область имеет свою специфику — от регуляторных ограничений до требований по масштабируемости и надежности.

| Домен            | Специфика                                                                                                                                    | Технологический стек                                                                                              |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Медицина**     | • Защита персональных данных (HIPAA, GDPR) <br> • Интеграция HL7/FHIR <br> • Масштабируемость для пациентов и устройств                      | Kubernetes, Keycloak, Vault, PostgreSQL, Kafka, MinIO, .NET 8 (backend), React (frontend), Spark, Python ML       |
| **АБС**          | • Соответствие требованиям ЦБ РФ, Basel III <br> • Критичность транзакций <br> • Высокая доступность и DR <br> • Усиленная безопасность      | Java/.NET, PostgreSQL/Oracle, Kafka, Kubernetes/OpenShift, GitLab CI/CD, DevSecOps-инструменты                    |
| **DLH**          | • Большие объемы данных (Tb–Pb) <br> • Data Lake + DWH подход <br> • Batch + Real-time обработка <br> • ML/AI интеграция                     | Hadoop/Spark, Delta Lake/Apache Iceberg, ClickHouse, MinIO/S3, Kafka, Airflow, SQLMesh, Python, Superset, Grafana |
| **Страхование**  | • Гибкие продуктовые модели <br> • Поддержка API для партнёров <br> • Интеграция с провайдерами <br> • Аналитика рисков                      | .NET 8, Python, PostgreSQL, ClickHouse, Kafka, Keycloak, Kubernetes, Argo CD, ML-алгоритмы для оценки рисков      |
| **Недвижимость** | • Каталоги объектов и сделки <br> • Интеграция с гос. системами (ЕГРН, кадастр) <br> • Поддержка геоданных <br> • Массовые поисковые запросы | .NET 8/Python, PostgreSQL + PostGIS, ElasticSearch, Kafka, React, Kubernetes + Argo CD, Grafana, Superset         |


## MindMap

{{< plantuml id="solutions_mindmap" file="docs/architecture/assets/solutions.puml" >}}

---

Каждый проект иллюстрирует применение **единых архитектурных принципов** — надёжности, безопасности и масштабируемости — с учётом особенностей конкретного домена.
