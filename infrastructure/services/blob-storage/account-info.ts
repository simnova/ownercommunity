const tryGetEnvVar = (envVar:string):string =>{
  const value = process.env[envVar];
  if(value === undefined){
    throw new Error(`Environment variable: ${envVar} is not set`);
  }
  return value;
}

export const AccountInfo = () => {
  const blobContainerNameEnvKey = 'BLOB_CONTAINER_NAME';
  const blobAccountNameEnvKey = 'BLOB_ACCOUNT_NAME';
  const blobAccountKeyEnvKey = 'BLOB_ACCOUNT_KEY';

  return {
    containerName : tryGetEnvVar(blobContainerNameEnvKey),
    accountName : tryGetEnvVar(blobAccountNameEnvKey),
    accountKey : tryGetEnvVar(blobAccountKeyEnvKey),
  }
}