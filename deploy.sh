#!/user/bin/env sh

# 錯誤時終止scrip
set -e

# build
yarn build

# 移動到build的目錄
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.git.io/<REPO>
git push -f git@github.com:ccok12345678/space-coffee.git main:gh-pages

cd -