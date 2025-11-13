---
title: Hextra Theme
layout: hextra-home
---

{{< hextra/hero-badge >}}
  <div class="hx-w-2 hx-h-2 hx-rounded-full hx-bg-primary-400"></div>
  <span>Портал</span>
  {{< icon name="arrow-circle-right" attributes="height=14" >}}
{{< /hextra/hero-badge >}}

<div class="hx-mt-6 hx-mb-6">
{{< hextra/hero-headline >}}
  Архитектурный портал <br class="sm:hx-block hx-hidden" />
{{< /hextra/hero-headline >}}
</div>

<div class="hx-mb-12">
{{< hextra/hero-subtitle >}}
  Данный портал представляет профессиональное портфолио функционального архитектора. <br class="sm:hx-block hx-hidden" />
  Здесь собраны примеры архитектурных схем, проектных решений и практических кейсов, которые иллюстрируют мой опыт в построении комплексных систем: <br class="sm:hx-block hx-hidden" />
  от проектирования инфраструктуры и интеграции сервисов до обеспечения безопасности и масштабируемости решений. <br class="sm:hx-block hx-hidden" />
  Портал объединяет такие артефакты, как `Спецификация на разработку` и `Архитектурное решение`. <br class="sm:hx-block hx-hidden" />  
{{< /hextra/hero-subtitle >}}
</div>

<div class="hx-mb-6">
{{< hextra/hero-button text="Документы" link="docs" >}}
</div>

<div class="hx-mt-6"></div>

{{< hextra/feature-grid >}}
  {{< hextra/feature-card
    title="Описание сервисов приложения"
    subtitle="Включает описание бизнес и инфраструктурных сервисов"
    class="hx-aspect-auto md:hx-aspect-[1.1/1] max-md:hx-min-h-[340px]"
    image="images/services.svg"
    imageClass="hx-top-[20%] hx-left-[24px] hx-w-[110%] sm:hx-w-[110%] dark:hx-opacity-80"
    style="background: radial-gradient(ellipse at 50% 80%,rgba(194,97,254,0.15),hsla(0,0%,100%,0));"
  >}}
  {{< hextra/feature-card
    title="Solution архитектура"
    subtitle="Информация по архитектурным решениям портала"
    class="hx-aspect-auto md:hx-aspect-[1.1/1] max-lg:hx-min-h-[340px]"
    image="images/landscape.png"
    imageClass="hx-top-[10%] hx-left-[36px] hx-w-[110%] sm:hx-w-[110%] dark:hx-opacity-80"
    style="background: radial-gradient(ellipse at 50% 80%,rgba(142,53,74,0.15),hsla(0,0%,100%,0));"
  >}}
  {{< hextra/feature-card
    title="Поиск по wiki"
    subtitle="База знаний портала и инструкция пользователей"
    class="hx-aspect-auto md:hx-aspect-[1.1/1] max-md:hx-min-h-[340px]"
    image="images/wiki.png"
    imageClass="hx-top-[40%] hx-left-[36px] hx-w-[110%] sm:hx-w-[110%] dark:hx-opacity-80"
    style="background: radial-gradient(ellipse at 50% 80%,rgba(221,210,59,0.15),hsla(0,0%,100%,0));"
  >}}
  {{< hextra/feature-card
    title="Конфигурация"
    subtitle="Конфигурации для развёртывания системы в *разных средах*."
  >}}
  {{< hextra/feature-card
    title="Инструкции пользователей"
    subtitle="Пошаговые инструкции по работе на портале."
  >}}
  {{< hextra/feature-card
    title="Архив документов"
    subtitle="Сервер документации."
  >}} 
{{< /hextra/feature-grid >}}
