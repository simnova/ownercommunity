import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import React, { useRef } from 'react';

import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import { BlobIndexTag, BlobMetadataField } from '../../../../generated';
import { FileValidator } from './file-validator';

interface UploadButtonProp {
  authorizeRequest: (file:File) => Promise<AuthResult>
  blobPath: string
  onChange?: (value:any) => void
  onRemoveRequested?: () => Promise<boolean>
  onInvalidContentType?: () => void
  onInvalidContentLength?: () => void
  permittedContentTypes?: string[]
  permittedExtensions?: string[]
  maxFileSizeBytes?: number
  maxWidthOrHeight?: number
  onSuccess?: (file: UploadFile) => void
  button?: React.ReactNode
}

export type UploadButtonProps = UploadButtonProp;

export interface AuthResult {
  isAuthorized: boolean;
  authHeader: {
    authHeader?: string;
    requestDate?: string;
    indexTags?: BlobIndexTag[];
    metadataFields?: BlobMetadataField[];
    blobPath?: string;
    blobName?: string;
  };
}
interface ComponentProp {
  data: {
    permittedContentTypes?: string[];
    permittedExtensions?: string[];
    maxFileSizeBytes?: number;
    maxWidthOrHeight?: number;
    notificationCount?: number;
    blobPath: string;
  };
  onInvalidContentType: () => void;
  onInvalidContentLength: () => void;
  onSuccess?: (file: UploadFile) => void;
  onError?: (file: File, error: any) => void;
  onRemoveRequested?: (file: UploadFile<unknown>) => Promise<boolean>;
  authorizeRequest: (file: File) => Promise<AuthResult>;
  cropperProps?: object;
  uploadProps?: UploadProps;
  children?: React.ReactNode;
  maxFileCount?: number;
}

export type AzureUploadProps = ComponentProp;

export const AzureUpload: React.FC<AzureUploadProps> = (props) => {
  const authResultRef = useRef<AuthResult | undefined>(undefined);
  const beforeUpload = async (file: RcFile) => {

    const validatorOptions = {
      maxFileSizeBytes: props.data.maxFileSizeBytes,
      maxWidthOrHeight: props.data.maxWidthOrHeight,
      permittedContentTypes: props.data.permittedContentTypes
    };

    const validator = new FileValidator(file, validatorOptions);
    const result = await validator.validate();

    if (!result.success) {
      console.error(`Error: ${result.message}`);

      switch (result.code) {
        case 'content-type':
          props.onInvalidContentType();
          break;
        case 'content-length':
          props.onInvalidContentLength();
          break;
        case 'default':
          message.error(`File did not upload, error: ${JSON.stringify(result.message)}`);
          break;
      }

      return Upload.LIST_IGNORE;
    }

    const newFile = result.file;

    if (newFile) {
      const result = await props.authorizeRequest(newFile);
      if (result.isAuthorized) {
        //@ts-ignore
        newFile['url'] = result.blobPath;
        console.log('file', newFile);
        authResultRef.current = result;
        return newFile;
      }
    }
    return Upload.LIST_IGNORE;
  };

  const customizeUpload = async (option: any) => {
    console.log('AzureUpload customizeUpload');
    //   const result =  await props.authorizeRequest(option.file) as AuthResult;
    if (authResultRef.current && authResultRef.current.isAuthorized) {
      const { authHeader } = authResultRef.current;

      try {
        option.file.url = authHeader.blobPath;

        let metadataHeaders: any = getMetadataHeaders(authHeader.metadataFields);

        let indexTagsHeaders: any = getIndexTagsHeaders(authHeader.indexTags);

        const headers = {
          ...option.headers,
          ...metadataHeaders,
          ...indexTagsHeaders,
          Authorization: authHeader.authHeader,
          'x-ms-blob-type': 'BlockBlob',
          'x-ms-version': '2021-04-10',
          'x-ms-date': authHeader.requestDate,
          'Content-Type': option.file.type
        }
        console.log('headers',JSON.stringify(headers));

        let response = await axios.request({
          method: 'put',
          url: authHeader.blobPath,
          data: new Blob([option.file], { type: option.file.type }),
          headers: headers,
          onUploadProgress: (progressEvent) => {
            if (progressEvent !== undefined && progressEvent.total !== undefined && progressEvent.loaded !== undefined) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              option.onProgress({ percent: percentCompleted }, option.file);
            }
          }
        });

        console.log('uploaded:', option.file);
        if (props.onSuccess) {
          props.onSuccess(option.file);
        }
        option.onSuccess(response, option.file);
      } catch (uploadError) {
        if (props.onError) {
          props.onError(option.file, uploadError);
        }
        option.onError(uploadError, option.file);
      }
    } else {
      // not authorized - do nothing
    }
    return option;
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
      const output = indexTags.reduce((acc: Record<string, string>, cur: { name: string, value: string }) => {
        acc[cur.name] = cur.value;
        return acc;
      }, {});

      indexTagsHeaders['x-ms-tags'] = new URLSearchParams(output).toString();
    }
    return indexTagsHeaders;
  };

  const validFileExtensions = props.data.permittedExtensions
    ? '.' + props.data.permittedExtensions.join(', .')
    : undefined;
  console.log('validFileExtensions', validFileExtensions);

  if (props.cropperProps) {
    return (
      <ImgCrop {...props.cropperProps}>
        <Upload
          accept={validFileExtensions}
          customRequest={customizeUpload}
          beforeUpload={beforeUpload}
          onRemove={(file) => {
            return props.onRemoveRequested ? props.onRemoveRequested(file) : undefined;
          }}
          showUploadList={false}
          progress={{
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068'
            },
            strokeWidth: 3,
            format: (percent) => (percent ? `${parseFloat(percent.toFixed(2))}%` : '')
          }}
          {...props.uploadProps}
        >
          {props.children}
        </Upload>
      </ImgCrop>
    );
  }
  return (
    <Upload
      accept={validFileExtensions}
      customRequest={customizeUpload}
      beforeUpload={beforeUpload}
      onRemove={(file) => {
        return props.onRemoveRequested ? props.onRemoveRequested(file) : undefined;
      }}
      maxCount={props.maxFileCount}
      showUploadList={false}
      progress={{
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068'
        },
        strokeWidth: 3,
        format: (percent) => (percent ? `${parseFloat(percent.toFixed(2))}%` : '')
      }}
      {...props.uploadProps}
    >
      {props.children}
    </Upload>
  );
};
