import { useNode } from '@craftjs/core';
import { Button, theme } from 'antd';
import { Container } from './container';
import { TextComponent } from './text-component';
import { TextThing } from './text-thing';
import { FileUploadButton } from '../../layouts/shared/components/file-upload-button';
import { useMutation } from '@apollo/client';
import { AuthResult } from '../../ui/molecules/azure-upload';
import { AhpIdFormCommunityPublicFileCreateAuthHeaderDocument } from '../../../generated';

interface AhpIdFormProps {
  fileName: string;
  blobPath: string;
}

const communityId = '669ff09eae443cf6818a5bed';
const AhpIdFormTop = (props: any) => {
  const {
    connectors: { connect }
  } = useNode();
  return <div ref={(ref) => connect(ref as HTMLDivElement)}>{props.children}</div>;
};

AhpIdFormTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === TextComponent || TextThing)
  }
};
const AhpIdForm: any = ({ fileName, blobPath, ...props }: AhpIdFormProps) => {
  console.log('here we are');
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const {
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
    fileName: state.data.props.fileName,
    blobPath: state.data.props.blobPath
  }));
  console.log('next stop');

  const [uploadImage] = useMutation(AhpIdFormCommunityPublicFileCreateAuthHeaderDocument);
  const handleAuthorizeRequest = async (file: File): Promise<AuthResult> => {
    console.log('the polar express');

    setProp((props: any) => {
      props.fileName = file.name;
      props.blobPath = `https://ownercommunity.blob.core.windows.net/${communityId}/public-files/${file.name}`;
    });

    console.log('tickets please');

    return uploadImage({
      variables: {
        input: {
          communityId: communityId,
          fileName: file.name,
          contentType: file.type,
          contentLength: file.size
        }
      }
    })
      .then((result) => {
        return { ...result?.data?.communityPublicFileCreateAuthHeader, ...{ isAuthorized: true } } as AuthResult;
      })
      .catch((e) => {
        console.log('error', e);
        return { isAuthorized: false } as AuthResult;
      });
  };

  const downloadFile = () => {
    const a = document.createElement('a');
    a.href = blobPath;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  console.log('here data', blobPath, fileName);
  return (
    <Container background={colorBgContainer}>
      <div
        className=" shadow rounded-lg"
        style={{
          backgroundColor: colorBgContainer,
          padding: 10
        }}
      >
        <div>Hey how are you doing susan? Here is the upload for the document you requested.</div>
        {fileName && blobPath ? (
          <Button type="link" onClick={() => downloadFile()}>
            {fileName}
          </Button>
        ) : (
          <></>
        )}
        <FileUploadButton
          authorizeRequest={handleAuthorizeRequest}
          blobPath={`https://ownercommunity.blob.core.windows.net/${communityId}`}
          onRemoveRequested={() => {
            throw new Error('Not implemented');
          }}
          permittedContentTypes={[
            'image/jpeg',
            'image/png',
            'image/gif',
            'text/plain',
            'text/csv',
            'application/json',
            'application/pdf'
          ]}
          permittedExtensions={['jpg', 'jpeg', 'png', 'gif', 'txt', 'csv', 'json', 'pdf']}
          maxFileSizeBytes={10 * 1024 * 1024} // 10MB,
          maxWidthOrHeight={2048}
        />
      </div>
    </Container>
  );
};

AhpIdForm.craft = {
  props: {
    bgColor: '#ffffff',
    padding: 0
  }
};

export { AhpIdForm, AhpIdFormTop };
