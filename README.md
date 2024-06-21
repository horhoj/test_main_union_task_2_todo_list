# Туду лист на JS БЕЗ ФРЭЙМВОРКОВ

ДЕМО: https://test-main-union-task-2-todo-list.vercel.app/

# Используется: 

vite, typescript, docker(docker-compose), nginx (для раздачи статики билда), eslint + prettier

# запуск

npm i

npm run dev


# запуск в докере (протестировано только на линукс, нужны make, docker, docker-compose)

запуск в режиме разработки (порт 3000)

make docker-ddev

запуск в режиме раздачи билда через nginx (порт 80)

make docker-init


разумеется порты можно поменять в настройках
