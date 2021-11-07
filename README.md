# Proyecto final de laboratorio web.

Example run for dev:
```bash
$ DB_HOST='localhost' DB_USER='root' DB_PASS='ubuntu' JWT_SECRET='secret' npm run dev
```

## Database Setup
---
**NOTE**

This assumes you are going to run Docker locally.

---
### Run the script
Make sure to have your docker running, then run this:
```bash
$ ./run_mariadb.sh
```
Check that the container appears:
```bash
$ docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS                                       NAMES
8866fa369d01   mariadb:latest   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp   community-mariadb
```

### Access the database
```bash
# Access the container
$ docker exec -it community-mariadb bash
# Inside the container run
root@12345e:/$ mysql -u root -p
# Enter ubuntu
Enter password: ubuntu
# You should be inside MARIADB
MariaDB [(none)]> 
```

### Prepare tables
Copy the contents of `create_tables.sql` and paste them. If everything went find you should see at the end:

```
MariaDB [community_hub]>
```

To make sure everything is setup properly, check the tables, you should see 6 of them:
```
MariaDB [community_hub]> show tables;
+-------------------------+
| Tables_in_community_hub |
+-------------------------+
| COMMUNITY               |
| COMMUNITY_EVENT         |
| HOUSE                   |
| MESSAGE                 |
| REQUEST                 |
| USER                    |
+-------------------------+
6 rows in set (0.001 sec)
```

Now you should be able to run the program using the following command:
```bash
$ DB_HOST='localhost' DB_USER='root' DB_PASS='ubuntu' JWT_SECRET='secret' npm run dev
```
