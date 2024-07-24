import { useNode } from '@craftjs/core';
import { Button, Input, Radio, Space, theme } from 'antd';
import { Container } from './container';
import { TextComponent } from './text-component';
import { TextThing } from './text-thing';
import { FileUploadButton } from '../../layouts/shared/components/file-upload-button';
import { useMutation } from '@apollo/client';
import { AuthResult } from '../../ui/molecules/azure-upload';
import {
  AhpIdFormCommunityPublicFileCreateAuthHeaderDocument,
  AhpIdFormCommunityPublicFileRemoveDocument
} from '../../../generated';
import Title from 'antd/es/typography/Title';
import { DeleteFilled, FileTextOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

interface AhpIdFormConfirmationProps {
  fileName: string;
  blobPath: string;
  value: number;
  response: string;
  submitted: boolean;
}

const communityId = '669ff09eae443cf6818a5bed';
const AhpIdFormConfirmationTop = (props: any) => {
  const {
    connectors: { connect }
  } = useNode();
  return <div ref={(ref) => connect(ref as HTMLDivElement)}>{props.children}</div>;
};

AhpIdFormConfirmationTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === TextComponent || TextThing)
  }
};
const AhpIdFormConfirmation: any = ({
  fileName,
  blobPath,
  response,
  value,
  submitted,
  ...props
}: AhpIdFormConfirmationProps) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const {
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
    fileName: state.data.props.fileName,
    blobPath: state.data.props.blobPath,
    value: state.data.props.value,
    response: state.data.props.response,
    submitted: state.data.props.submitted
  }));

  const handleRadioChange = (value: number) => {
    setProp((props: any) => {
      props.value = value;
    });
  };

  const handleInputChange = (response: string) => {
    setProp((props: any) => {
      props.response = response;
    });
  };

  const [uploadImage] = useMutation(AhpIdFormCommunityPublicFileCreateAuthHeaderDocument);
  const [communityPublicFileRemove] = useMutation(AhpIdFormCommunityPublicFileRemoveDocument);
  const handleAuthorizeRequest = async (file: File): Promise<AuthResult> => {
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
        setProp((props: any) => {
          props.fileName = file.name;
          props.blobPath = `https://ownercommunity.blob.core.windows.net/${communityId}/public-files/${file.name}`;
        });
        return { ...result?.data?.communityPublicFileCreateAuthHeader, ...{ isAuthorized: true } } as AuthResult;
      })
      .catch((e) => {
        console.log('error', e);
        return { isAuthorized: false } as AuthResult;
      });
  };

  const removeFile = async () => {
    console.log('heyooo');
    communityPublicFileRemove({
      variables: {
        input: { fileName: fileName, communityId: communityId }
      }
    })
      .then((result) => {
        setProp((props: any) => {
          props.fileName = null;
          props.blobPath = null;
        });
        return result?.data?.communityPublicFileRemove?.status?.success ?? false;
      })
      .catch((e) => {
        console.log('error', e);
        return false;
      });
  };

  const submitReview = () => {
    setProp((props: any) => {
      props.submitted = true;
    });
  };

  const downloadFile = async () => {
    const blob = await (await fetch(blobPath)).blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Container background={colorBgContainer}>
      <div
        style={{
          backgroundColor: 'white',
          paddingTop: '25px',
          paddingBottom: '50px',
          paddingLeft: '25px',
          paddingRight: '25px',
          border: '1px solid black',
          textAlign: 'left'
        }}
      >
        <Title
          level={5}
          style={{
            marginBottom: 10
          }}
        >
          {submitted ? 'ID Form Review: Completed' : 'Does your ID Form look Accurate?'}
        </Title>
        <div style={{ marginBottom: 10 }}>
          {fileName && blobPath ? (
            <Button type="link" onClick={() => downloadFile()} style={{ border: '1px solid black', marginRight: 10 }}>
              <FileTextOutlined />
              {fileName}
            </Button>
          ) : (
            <></>
          )}
          {!submitted ? (
            <FileUploadButton
              authorizeRequest={handleAuthorizeRequest}
              blobPath={`https://ownercommunity.blob.core.windows.net/${communityId}`}
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
          ) : (
            <></>
          )}
          {fileName && blobPath && !submitted ? (
            <Button
              type="default"
              onClick={removeFile}
              style={{ border: '1px solid black', marginLeft: 10, background: 'red' }}
            >
              <DeleteFilled style={{ color: 'white' }} />
            </Button>
          ) : (
            <></>
          )}
          {!submitted ? (
            <div style={{ marginTop: 10 }}>
              <Radio.Group value={value} onChange={(e: any) => handleRadioChange(e.target.value)}>
                <Space direction="vertical">
                  <Radio value={1}>Yes, my ID form is accurate</Radio>
                  <Radio value={2}>No, it needs some corrections</Radio>
                  <TextArea
                    onChange={(e: any) => handleInputChange(e.target.value)}
                    style={{
                      width: 400,
                      marginLeft: 10
                    }}
                    value={response}
                    autoSize
                  />
                </Space>
              </Radio.Group>
            </div>
          ) : (
            <></>
          )}
        </div>
        {!submitted ? (
          <Button type="primary" style={{ float: 'right' }} onClick={submitReview}>
            Complete Review
          </Button>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

AhpIdFormConfirmation.craft = {
  props: {
    bgColor: '#ffffff',
    padding: 0
  }
};

export { AhpIdFormConfirmation, AhpIdFormConfirmationTop };
