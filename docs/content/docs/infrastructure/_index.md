---
tags: [infra]
title: Инфраструктура
weight: 1
prev: /docs/getting-started
sidebar:
  open: false
---

## Ресурсы

{{< cards >}}
{{< card link="https://gitlab.praktikum-services.ru/std-041-32/momo-store-infra.git" title="momo-store-infra" icon="gitlab-clr" tag= "repo" >}}
{{< /cards >}}

## Описание

Раздел описывает инфраструктуру приложения, развернутого в Kubernetes-кластере.  
Кластер создаётся *полностью автоматически* с помощью **Terraform** (создание сети, подсетей, виртуальных машин) и **Ansible** (установка Kubernetes, Docker/Containerd, kubeadm-bootstrap, настройка master и worker нод).

Документация основана на топологии из YC и структуре репозитория, включающего Terraform-модули и плейбуки Ansible.  
Цель раздела - дать полное представление об архитектуре, структуре IaC-кода и процессе развёртывания инфраструктуры.

## Общая топология

Кластер развернут в **двух зонах доступности Yandex Cloud:**

- `ru-central1-a`
- `ru-central1-b`

Инфраструктура состоит из:

- **Одного master-узла**
- **Трёх worker-узлов**
- **VPC-сети с двумя подсетями**, распределёнными по зонам

### Схема (Yandex Cloud topology)

{{< zoomimg src="/docs/infrastructure/assets/topology.png" alt="topology" >}}

>[!NOTE]
> Каждая виртуальная машина привязана к своей подсети, что обеспечивает
> - отказоустойчивость на уровне зон
> - равномерное распределение нагрузки
> - корректную работу Calico / CNI

### Сетевая архитектура

#### VPC

| Параметр | Значение      |
|----------|---------------|
| Название | `k8s-network` |
| CIDR     | `10.0.0.0/16` |

#### Подсети

| Подсеть              | CIDR          | Зона          | Назначение      |
|----------------------|---------------|---------------|-----------------|
| `k8s-network-zone-a` | `10.0.1.0/24` | ru-central1-a | master + worker |
| `k8s-network-zone-b` | `10.0.2.0/24` | ru-central1-b | workers         |

## Структура репозитория инфраструктуры

Репозиторий разделён на два ключевых блока:

- **Terraform** - создание облачных ресурсов Yandex Cloud (VPC, подсети, виртуальные машины).
- **Ansible** - конфигурация ОС, установка Kubernetes, инициализация master-ноды и присоединение worker-нод.

## Terraform

Управляет жизненным циклом

- сетей
- подсетей
- виртуальных машин
- статических IP
- подготовкой инфры для Ansible

### Структура Terraform репозитория

{{< filetree/container >}}
{{< filetree/folder name="terraform" state="open" >}}

    {{< filetree/folder name="modules" state="open" >}}

      {{< filetree/folder name="tf-yc-instance" state="closed" >}}
        {{< filetree/folder name="scripts" state="closed" >}}
        {{< /filetree/folder >}}

        {{< filetree/file name="main.tf" >}}
        {{< filetree/file name="outputs.tf" >}}
        {{< filetree/file name="variables.tf" >}}
        {{< filetree/file name="versions.tf" >}}
      {{< /filetree/folder >}}

      {{< filetree/folder name="tf-yc-network" state="closed" >}}
        {{< filetree/file name="main.tf" >}}
        {{< filetree/file name="outputs.tf" >}}
        {{< filetree/file name="variables.tf" >}}
        {{< filetree/file name="versions.tf" >}}
      {{< /filetree/folder >}}

    {{< /filetree/folder >}}

    {{< filetree/file name=".terraform.lock.hcl" >}}
    {{< filetree/file name="main.tf" >}}
    {{< filetree/file name="provider.tf" >}}
    {{< filetree/file name="terraform.tfstate" >}}
    {{< filetree/file name="terraform.tfvars" >}}
    {{< filetree/file name="variables.tf" >}}
    {{< filetree/file name="versions.tf" >}}

{{< /filetree/folder >}}
{{< /filetree/container >}}

### Основные Terraform-модули

#### Модуль `tf-yc-network`

**Создаёт**

* единую VPC-сеть кластера Kubernetes
* подсети под каждую зону доступности:

    * `k8s-network-zone-a` (ru-central1-a),
    * `k8s-network-zone-b` (ru-central1-b);
* базовую структуру маршрутизации и сетевых правил

#### Модуль `tf-yc-instance`

**Отвечает за**

* создание master-ноды
* создание worker-нод в нужном количестве
* прикрепление VM к подсетям
* генерацию выходных данных (outputs) для последующего использования Ansible

### Outputs Terraform

**После выполнения `terraform apply` формируются**

* внешние и внутренние IP-адреса всех нод
* динамический Ansible-inventory
* параметры для kubeadm (например, IP master-ноды)

## Ansible

**Ansible выполняет конфигурацию**

- подготовка ОС
- установка контейнерного рантайма
- установка Kubernetes
- bootstrap master
- присоединение worker-нод

### Структура Ansible репозитория

{{< filetree/container >}}
  {{< filetree/folder name="ansible" state="open" >}}

    {{< filetree/folder name="group_vars" state="closed" >}}
      {{< filetree/file name="all.yml" >}}
      {{< filetree/file name="master.yml" >}}
      {{< filetree/file name="workers.yml" >}}
    {{< /filetree/folder >}}

    {{< filetree/folder name="inventory" state="closed" >}}
      {{< filetree/file name="inventory.ini" >}}
    {{< /filetree/folder >}}

    {{< filetree/folder name="roles" state="open" >}}

      {{< filetree/folder name="common" state="closed" >}}
        {{< filetree/folder name="tasks" state="closed" >}}
          {{< filetree/file name="disable_swap.yml" >}}
          {{< filetree/file name="install_prereqs.yml" >}}
          {{< filetree/file name="mod_hosts.yml" >}}
          {{< filetree/file name="main.yml" >}}
        {{< /filetree/folder >}}
      {{< /filetree/folder >}}

      {{< filetree/folder name="docker" state="closed" >}}
        {{< filetree/folder name="tasks" state="closed" >}}
        {{< /filetree/folder >}}
      {{< /filetree/folder >}}

      {{< filetree/folder name="kubeadm" state="closed" >}}
        {{< filetree/folder name="tasks" state="closed" >}}
          {{< filetree/file name="install_kube.yml" >}}
          {{< filetree/file name="init_master.yml" >}}
          {{< filetree/file name="join_workers.yml" >}}
        {{< /filetree/folder >}}
      {{< /filetree/folder >}}

    {{< /filetree/folder >}}

    {{< filetree/folder name="templates" state="closed" >}}
    {{< /filetree/folder >}}

    {{< filetree/file name="ansible.cfg" >}}
    {{< filetree/file name="playbook.yml" >}}

  {{< /filetree/folder >}}
{{< /filetree/container >}}

### Основные роли Ansible

#### Роль `common`

Выполняет начальную подготовку системы:

* отключение swap (обязательное требование Kubernetes)
* установка системных зависимостей (curl, apt-transport-https, socat, conntrack и др.)
* настройка `/etc/hosts` для межнодового взаимодействия
* настройка системных параметров (`sysctl`) для работы kubelet

#### Роль `docker` / containerd

Отвечает за установку контейнерного рантайма:

* установка Docker *или* containerd (в зависимости от конфигурации)
* настройка системных сервисов
* подготовка среды для CRI

#### Роль `kubeadm`

Выполняет основные операции по bootstrap кластера:

##### `install_kube.yml`

* установка kubeadm, kubelet, kubectl
* настройка версий Kubernetes
* конфигурация kubelet

##### `init_master.yml`

* выполнение `kubeadm init`
* копирование `admin.conf` для управления кластером
* установка сетевого плагина (обычно Calico)
* сохранение токена для присоединения worker-нод

##### `join_workers.yml`

* выполнение `kubeadm join`
* включение worker-нод в кластер
* проверка статуса узлов

---

## Процесс развёртывания инфраструктуры

Развёртывание полностью автоматизировано и состоит из двух этапов: Terraform → Ansible.

### Этап 1: Terraform

Выполняется создание всех требуемых облачных ресурсов:

```bash {filename=".sh",linenos=table}
terraform init
terraform apply -auto-approve
```

Результат:

* создана VPC-сеть;
* созданы подсети в двух зонах;
* развернуты виртуальные машины master и worker;
* сформирован inventory для Ansible;
* подготовлены все входные данные для следующего этапа.

### Этап 2: Ansible

После успешного выполнения Terraform выполняется настройка Kubernetes-кластера:

```bash {filename=".sh",linenos=table}
cd ansible
ansible-playbook -i inventory/inventory.ini playbook.yml
```

Этапы:

1. подготовка ОС (swap, prereqs, sysctl);
2. установка контейнерного рантайма;
3. установка Kubernetes пакетов;
4. инициализация master-ноды;
5. установка CNI;
6. присоединение worker-нод.

## Проверка кластера после развёртывания

```bash {filename=".sh",linenos=table}
kubectl get nodes -o wide
kubectl get pods -A
kubectl get cs
kubectl exec -it test -- ping 8.8.8.8
kubectl get daemonset -A
```

## Версии компонентов

| Компонент               | Версия            | Где задаётся / Источник конфигурации      |
|-------------------------|-------------------|-------------------------------------------|
| **ОС (Ubuntu)**         | 22.04 LTS         | Terraform module `tf-yc-instance`         |
| **Kubernetes**          | 1.32.x            | Ansible → роль `kubeadm` / конфиг kubeadm |
| **kubeadm**             | 1.32.x            | Ansible → роль `kubeadm`                  |
| **kubelet**             | 1.32.x            | Ansible → роль `kubeadm`                  |
| **kubectl**             | 1.32.x            | Ansible → роль `kubeadm`                  |
| **CNI (Calico)**        | v3.28.x           | Установка manifest-ом в `init_master.yml` |
| **Containerd / Docker** | Зависит от сборки | Ansible → роль `docker` или `containerd`  |
| **Terraform**           | 1.x               | Локальная среда разработчика / CI         |
| **Ansible**             | 2.16+             | Локальная среда разработчика / CI         |
| **Python**              | 3.10+             | Требуется для Ansible                     |

## Результат

* полностью работоспособный Kubernetes-кластер
* автоматизированное развертывание инфры
* кластер, распределённый по двум зонам доступности
* воспроизводимая IaC-архитектуру

## Далее

Перейти в раздел

{{< cards >}}
{{< card link="../getting-started" title="Главная" icon="document-duplicate" >}}  
{{< card link="../develop" title="Репозиторий и CI CD" icon="desktop-computer" >}}
{{< /cards >}}
