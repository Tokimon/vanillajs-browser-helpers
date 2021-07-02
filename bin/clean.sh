#!/bin/sh

ok() {
  echo '🗸' $1 'removed'
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

ok '.js and .d.ts'

find . -type d -empty -delete

ok 'Empty directories'