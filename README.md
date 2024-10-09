# Тестовое задание для компании Emfy

## Описание:

✅ ВАЖНО. Тестовое задание должно быть выполнено полностью на frontend в виде отдельно сверстанной страницы без использования backend.
Для обхода CORS-политики можете использовать локальный или внешний прокси сервер, либо плагин для браузера.

- ✅ Сверстайте основную страницу вашего проекта. Она должна быть выполнена в виде таблицы со сделками.
- ✅ Далее вам необходимо получить все созданные карточки по API и вывести их на
  созданную вами страничку. Достаточно вывести только название, бюджет и id.
- ✅ При обращении к API получайте не более 3х карточек раз в секунду. Это очень важно,
  так как amoCRM имеет ограничение. Несомненно, оно больше чем 3 карточки, но это
  нужно для проверки навыков.
- ✅ При нажатии на карточку, выводит на месте карточки загрузку и получаем
  развернутые данные по API.
- ✅ При этом, если есть открытая карточка, то она должна закрываться.
- ✅ После получения данных от сервера убираем спиннер и вставляем в эту же карточку
  название, id, дату в формате DD.MM.YYYY, статус ближайщей задачи.
- ✅Статус должен является тегом svg и представлять собой раскрашенный в цвет статуса
  круг:
  Если нет задачи или она просрочена (поставлена на вчера), то круг должен быть красным.
  Если задача будет в этот день, то зеленым.
  Если более чем через день, то желтым.

## Комментарии:

- Проект выполнен на TS, HTML и CSS, т.к. в вакансии были отмечены только эти технологии - в самом техническом задании стэк не указан
- Для обхода CORS используется proxy-сервер `https://thingproxy.freeboard.io/fetch/`
- [Созданный аккаунт на amoCRM](https://vysotskayaliya.amocrm.ru/)
- access_token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI1ZDQwODQ2M2Y1ZmFlYzA0ZTc3ZGY5MDk2ZDFhMGM5ODY0OWQyZDg4OGI3NDNmZTkxMDRmYTE1ZDdlODFlMzBjZWIwOTdhMDg1ZWJhODE2In0.eyJhdWQiOiIxYmZkZjAwNi0yNWY4LTRlNGMtYmM3MC1kODRkYjkxNjYyZTMiLCJqdGkiOiIyNWQ0MDg0NjNmNWZhZWMwNGU3N2RmOTA5NmQxYTBjOTg2NDlkMmQ4ODhiNzQzZmU5MTA0ZmExNWQ3ZTgxZTMwY2ViMDk3YTA4NWViYTgxNiIsImlhdCI6MTcyODI4ODM0MywibmJmIjoxNzI4Mjg4MzQzLCJleHAiOjE3MzU2ODk2MDAsInN1YiI6IjExNjEzMjQ2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTkzMjE4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZTIwNGZhNmYtMWUzMy00OGRiLWFhYjAtZTBlNzhhYjAwZTFiIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.a9QWRV13i-A0jWThrZyLxLYheJqCWSp3GW4nAS4HOG0j7_ABNlNyvSyTy2vwd96jNcdbA8Sm_726RULqHj1B0wBV487w8foSdyiHn3RHjwAoIzDRFbWbgr8XaTFxDLFdDhmYZJUTRFYl1txThxIoBApKIYHn7RLPshCI2uxgmP-36oAyMrcCfoQbtTwNCvjhVSvPj_0R8VIBG7C0z_kqTiBwl0Z1kOrMTa4mTS5CfOSAJbDVJj52H5uaqKteg4IQu5i-yQzX8L_2fYgWQeiCBXJbwiALyFLc9nr-JWVoQupY2CLLZa6L4qraSiK489N-4VhZeK6PASMvZilsRwYGSA`

## Запуск проекта:

Для запуска проекта необходимо склонировать репозиторий, далее выполнить в терминале команды:

```
npm install
```

```
npm run dev
```

Посмотреть в консоли, на каком порту был запущен проект, открыть проект в браузере
