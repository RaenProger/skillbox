#!/usr/bin/env sh

# остановить публикацию  при ошибках
set -e

# сборка приложения
cd dist

#инициаллизация репозитория и загрузка кода в gitHub
git init 
git add -A
git commit -m 'deploy'

git push -f https://github.com/RaenProger/vue_skillbox_app.git master:gh-pages

cd - 