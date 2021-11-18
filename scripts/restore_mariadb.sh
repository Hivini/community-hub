docker exec -i community-mariadb sh -c \
    'exec mysql -uroot -p"$MARIADB_ROOT_PASSWORD"' < dbdata/all-databases.sql