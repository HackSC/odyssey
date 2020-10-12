#!/bin/sh
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D andreasdb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D chloedb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D jasondb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D maxdb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D katiedb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D rolanddb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D wilsondb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D testdb
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D production
cat db2.0/Apis.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p -D d4v1qrf33toril

cat db2.0/insert_apilinks.sql | mysql -u HackSCProd -h 159.89.138.243 -P 3306 -p