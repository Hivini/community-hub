docker run --detach --name community-mariadb --env MARIADB_USER=hub --env MARIADB_PASSWORD=ubuntu --env MARIADB_ROOT_PASSWORD=ubuntu -p 3306:3306  mariadb:latest
