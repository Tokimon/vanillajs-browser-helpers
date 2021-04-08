for file in ./src/*.ts; do
  b=$(basename $file .ts)
  name=./src/test/$b.test.ts;

  if [ ! -f $name ]; then
    echo $b
  fi
done
