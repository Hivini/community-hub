#!/usr/bin/python

from subprocess import call


class Logger:
    INFO = '\033[94m'
    ERROR = '\033[91m'

    def LogError(self, message: str):
        print(self._CreateMessage(self.ERROR, f'ERROR: {message}'))

    def LogInfo(self, message: str):
        print(self._CreateMessage(self.INFO, message))

    def _CreateMessage(self, escapeCode: str, message) -> str:
        return f'{escapeCode}{message}\033[0m'


logger = Logger()
logger.LogInfo('Running dump_mariadb.sh ...')
rc = call("./dump_mariadb.sh", shell=True)
if rc != 0:
    logger.LogError('There was a problem executing the script.')
logger.LogInfo('Created backup successfully.')
