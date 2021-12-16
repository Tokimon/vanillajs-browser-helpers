missing=0

for file in ./src/*.ts; do
  b=$(basename $file .ts)
  testfile=./src/tests/$b.test.ts;

  if [ ! -f $testfile ]; then
    missing=$(expr $missing + 1)
    echo $b
  fi
done

if [ $missing = 0 ]; then
  echo -e "\e[1;32m🗸\e[0m All good! There are no missing tests"
else
  echo -e "\e[1;31m$missing missing tests\e[0m"
fi
