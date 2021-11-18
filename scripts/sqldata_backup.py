#!/usr/bin/python

import os.path
import sys
from __future__ import print_function
from subprocess import call
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.http import MediaFileUpload


class Logger:
    INFO = '\033[94m'
    ERROR = '\033[91m'

    def LogError(self, message: str):
        print(self._CreateMessage(self.ERROR, f'ERROR: {message}'))

    def LogInfo(self, message: str):
        print(self._CreateMessage(self.INFO, message))

    def _CreateMessage(self, escapeCode: str, message) -> str:
        return f'{escapeCode}{message}\033[0m'


class GoogleDriveConnector:
    # If modifying these scopes, delete the file token.json.
    SCOPES = ['https://www.googleapis.com/auth/drive',
              'https://www.googleapis.com/auth/drive.file']

    def __init__(self, logger: Logger) -> None:
        self.logger = logger
        creds = None

        # Obtain credentials if they exist.
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file(
                'token.json', self.SCOPES)
        # If no credentials the user must login.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', self.SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(creds.to_json())

        self.service = build('drive', 'v3', credentials=creds)

    def UploadFile(self, file_path, folder_name):
        self.logger.LogInfo('Connecting to Google Drive...')
        query = f'mimeType=\'application/vnd.google-apps.folder\' and name =\'{folder_name}\' and \'root\' in parents'
        file = self.service.files().list(q=query,
                                         spaces='drive',
                                         fields='nextPageToken, files(id, name)').execute()
        files = file['files']
        folder_id = None
        if len(files) == 0:
            self.logger.LogInfo(
                f'{folder_name}/ has not been found in drive root, creating folder...')
            file_metadata = {
                'name': folder_name,
                'mimeType': 'application/vnd.google-apps.folder'
            }
            file = self.service.files().create(body=file_metadata,
                                               fields='id').execute()
            self.logger.LogInfo('Folder successfully created.')
            folder_id = file.get('id')
        else:
            folder_id = files[0].get('id')

        self.logger.LogInfo('Uploading file to drive...')
        file_metadata = {
            'name': file_path.split('/')[-1],
            'parents': [folder_id]
        }
        media = MediaFileUpload(file_path,
                                resumable=True)
        file = self.service.files().create(body=file_metadata,
                                           media_body=media,
                                           fields='id').execute()
        self.logger.LogInfo('File has been uploaded successfully.')


logger = Logger()
logger.LogInfo('Running dump_mariadb.sh ...')
rc = call("./dump_mariadb.sh", shell=True)
if rc != 0:
    logger.LogError('There was a problem executing the script.')
    sys.exit(1)
logger.LogInfo('Created backup successfully.')
logger.LogInfo('========= Upload process =========')
connector = GoogleDriveConnector(logger)
connector.UploadFile('dbdata/all-databases.sql', 'community hub backup')
