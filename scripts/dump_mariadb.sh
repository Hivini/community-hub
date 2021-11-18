# Cleanup first in case a previous folder exists.
[ -d "dbdata" ] && rm -r dbdata
mkdir dbdata
docker exec community-mariadb sh -c \
    'exec mysqldump --all-databases -uroot -p"$MARIADB_ROOT_PASSWORD"' > \
    dbdata/all-databases.sql
