# Backup
## Install requirements to run the script
```bash
pip install -r requirements.txt
```

## Update file permissions
Just in case it's needed in the Unix system, make sure that files can be executed.
```bash
# If permissions are needed
chmod a+x restore_mariadb.sh
chmod a+x dump_mariadb.sh
chmod a+x crontab_setup.sh
chmod a+x run_mariadb.sh
```

## Setup crontab
This script will add a line in the crontab file to execute the sqldata_backup script every day at 17:00 hours.
```bash
./crontab_setup.sh
```

## Run backup manually
Make sure that the requirements are installed and that you have a file called `credentials.json` from the **APIs & Services** of Google Cloud Platform project.
```bash
python3 sqldata_backup.py
```

On the first run you will receive a prompt to login using Google OAuth, after that, the token will be stored in a file called `token.json`.

## Restore backup
In case that a restore is needed, we have a script to restore it: 
```bash
./restore_mariadb.sh
```
Note: Make sure that the Docker instance **is running first** and that you have the file `dbdata/all-databases.sql`.