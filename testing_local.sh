echo Start testing_local.sh: `date +"%Y-%m-%d %T"` &&

echo npm run db:truncate:testing_local: `date +"%Y-%m-%d %T"` &&
npm run db:truncate:testing_local &&

echo npm run unit:tests: `date +"%Y-%m-%d %T"` &&
npm run unit:tests
