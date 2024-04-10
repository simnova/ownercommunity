import { UploadOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import axios from 'axios';
import { BlobIndexTag, BlobMetadataField } from '../../../../generated';
import { AuthResult } from '../../../ui/molecules/azure-upload';


export interface SiteEditorProp {
  authorizeRequest: (file: File) => Promise<AuthResult>;
  blobPath: string;
}

export const SiteEditor: React.FC<SiteEditorProp> = (props) => {
  const customizeUpload = async (file: File): Promise<void> => {
    console.log('SiteEditor customizeUpload');
    const result = await props.authorizeRequest(file);
    console.log('result', JSON.stringify(result));
    if (result && result.isAuthorized) {
      let metadataHeaders: any = getMetadataHeaders(result.authHeader.metadataFields);
      let indexTagsHeaders: any = getIndexTagsHeaders(result.authHeader.indexTags);
      const headers = {
        ...metadataHeaders,
        ...indexTagsHeaders,
        Authorization: result.authHeader.authHeader,
        'x-ms-blob-type': 'BlockBlob',
        'x-ms-version': '2021-04-10',
        'x-ms-date': result.authHeader.requestDate,
        'Content-Type': file.type
      };
      console.log('headers', JSON.stringify(headers));
      try {
        await axios.request({
          method: 'put',
          url: `${props.blobPath}/${result.authHeader.blobName}`,
          data: new Blob([file], { type: file.type }),
          headers: headers,
          onUploadProgress: () => {
            // const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // option.onProgress({percent:percentCompleted},option.file);
          }
        });

        message.success('Uploaded successfully');
      } catch (uploadError) {
        message.error('Upload failed : ' + JSON.stringify(uploadError));
      }
    } else {
      // not authorized - do nothing
    }
    //return option;
  };

  const getMetadataHeaders = (metadataFields?: BlobMetadataField[]) => {
    let metadataHeaders: any = {};
    if (metadataFields) {
      for (const [_, value] of Object.entries(metadataFields)) {
        metadataHeaders['x-ms-meta-' + value.name] = value.value;
      }
    }
    return metadataHeaders;
  };

  const getIndexTagsHeaders = (indexTags?: BlobIndexTag[]) => {
    let indexTagsHeaders: any = {};
    if (indexTags) {
      const output = indexTags.reduce((acc: Record<string, string>, cur: { name: string; value: string }) => {
        acc[cur.name] = cur.value;
        return acc;
      }, {});

      indexTagsHeaders['x-ms-tags'] = new URLSearchParams(output).toString();
    }
    return indexTagsHeaders;
  };

  const handleUpload = async () => {
    let pageLayouts = localStorage.getItem('pageLayouts');
    if (pageLayouts) {
      const blob = new Blob([pageLayouts], { type: 'text/json' });
      const file = new File([blob], 'pageLayouts.json', {type: 'text/json'});
      await customizeUpload(file);
    }
  };

  return (
    <Button onClick={handleUpload}>
      <UploadOutlined /> Save Site
    </Button>
  );
};
