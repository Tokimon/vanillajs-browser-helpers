#!/bin/sh

ok() {
  echo -e "\e[1;32m🗸\e[0m \e[1;33m$1\e[0m removed"
}

rm -f ./*.mjs
ok '.mjs'

rm -f ./*.cjs
ok '.cjs'

for file in ./src/*.ts; do
  b=$(basename $file .ts)
  rm -f ./$b.js
  rm -f ./$b.d.ts
done

ok '.js\e[0m and \e[1;33m.d.ts'

rm -f ./src/index.ts

ok 'generated index file'

find . -type d -empty -delete

ok 'Empty directories'