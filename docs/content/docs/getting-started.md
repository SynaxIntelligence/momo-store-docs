---
title: Главная
weight: 1
next: /docs/guide
prev: /docs
---

## Портальное решение

**Добро пожаловать на архитектурный портал!**<br></br>
Этот ресурс создан как портфолио `Solution Architect` и объединяет в себе опыт проектирования сложных систем, практику применения технологий и реальные примеры решений.
Его цель — показать путь архитектора: от концепции и схем до работающей реализации.

**Здесь вы найдете**

- **Архитектурные схемы и модели** (PlantUML, Draw.io, C4 Model).

- **Примеры проектов и решений** с использованием современных технологий.

- **Технические инструкции и руководства**, собранные в формате “how-to”.

- **Базу знаний по DevOps**, безопасности, данным и интеграции.

Портал построен на `Hugo` — статическом генераторе сайтов, что позволяет легко расширять его и поддерживать в актуальном виде.

## Структура проекта

{{< filetree/container >}}
  {{< filetree/folder name="arch-portal" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/folder name="architecture" state="closed" >}}
      {{< /filetree/folder >}}      

      {{< filetree/folder name="develop" state="closed" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}

      {{< filetree/folder name="methodology" state="closed" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}
    
      {{< filetree/folder name="srs" state="closed" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
  {{< filetree/file name="hugo.yaml" >}}
{{< /filetree/container >}}

## Далее

Перейти в раздел

{{< cards >}}
  {{< card link="../architecture" title="Архитектура" icon="document-duplicate" >}}  
  {{< card link="../methodology" title="Методология" icon="document" >}}  
  {{< card link="../srs" title="Требования" icon="academic-cap" >}}
  {{< card link="../develop" title="Разработка" icon="desktop-computer" >}}
{{< /cards >}}
