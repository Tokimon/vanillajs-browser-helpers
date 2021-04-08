#!/bin/sh

build() {
  printf 'Building .%s ... ' $1

  # Compile the typescript files
  npx tsc -p tsconfig.$1.json

  # Move buld files to the root of the project
  for file in ./$1/*.js; do
    mv $file ./$(basename $file .js).$1
  done

  rmdir ./$1

  echo 'done'
}

build mjs
build cjs

printf 'Building .js + .d.ts ... '

npx tsc -p tsconfig.json

echo 'done'