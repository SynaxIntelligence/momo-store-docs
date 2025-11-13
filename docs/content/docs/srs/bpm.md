---
tags: [dev]
title: Диаграммы бизнес-процессов
weight: 19
prev: /docs/getting-started
sidebar:
open: true
---

# BPM

## Перечень бизнес-процессов

| № | Код           | Наименование                |
|---|---------------|-----------------------------|
| 1 | [BP-001-Reg]  | Регистрация пользователя    |
| 2 | [BP-001-Auth] | Аутентификация пользователя |
|   |               |                             |
|   |               |                             |
|   |               |                             |


## Описание бизнес-процессов

### Регистрация пользователя {id = 'BP-001-Reg'}



### Аутентификация пользователя {id = 'BP-001-Auth'}

```plantuml
@startuml
!define ICON_SIZE 32

!define USER_ICON <&user width=ICON_SIZE height=ICON_SIZE>
!define LOCK_ICON <&lock width=ICON_SIZE height=ICON_SIZE&>
!define EMAIL_ICON <&envelope width=ICON_SIZE height=ICON_SIZE&>
!define SOCIAL_ICON <&wifi width=ICON_SIZE height=ICON_SIZE&>
!define SUCCESS_ICON <&check width=ICON_SIZE height=ICON_SIZE&>
!define FAILURE_ICON <&times width=ICON_SIZE height=ICON_SIZE&>

start

:Выберите метод аутентификации;
note left: <&times> Пользователь может выбрать\nметод входа: через учетную запись\nв приложении или через\nсоциальную сеть

if (Учетная запись или соцсеть?) then (Учетная запись)
  :Введите учетные данные;
  note left: Пользователь вводит свой логин\nи пароль
elseif (Соцсеть) then (Соцсеть)
  :Выберите социальную сеть;
  note left: Пользователь выбирает\nсоциальную сеть для входа
  :{SOCIAL_ICON} Аутентификация через\nсоциальную сеть;
  note left: Пользователь аутентифицирован\nи получил доступ к приложению
  stop
else (Ошибка)
  :{FAILURE_ICON} Ошибка выбора метода аутентификации;
  note left: Пользователь не выбрал метод аутентификации\nи не может получить доступ
  stop
endif

if (Данные верны?) then (да)
  :{SUCCESS_ICON} Аутентификация успешна;
  note left: Пользователь аутентифицирован\nи получил доступ к приложению
  stop
else (нет)
  :{FAILURE_ICON} Ошибка аутентификации;
  note left: Пользователь ввел неверные данные\nи не может получить доступ
  stop
endif

@enduml
```
