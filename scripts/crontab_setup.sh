# Runs every day at 15:00.
(crontab -l 2>/dev/null; echo "0 17 * * * /usr/bin/python ${PWD}/sqldata_backup.py") | crontab -
