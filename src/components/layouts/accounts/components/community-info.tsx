import { useNavigate } from 'react-router-dom';
import { LocalSettingsKeys } from '../../../../constants';
import { Button, Row, Col } from 'antd';
import { CommunityListContainerCommunitiesFieldsFragment, CommunityListContainerCommunitiesFieldsFragmentDoc } from '../../../../generated';
import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay';
import { communityInfoCommunityFields$key } from './__generated__/communityInfoCommunityFields.graphql';

const DataFragment = graphql`
  fragment communityInfoCommunityFields on Community {
    name
    domain
    whiteLabelDomain
    handle
    publicContentBlobUrl
    userIsAdmin
    id
    schemaVersion
    createdAt
    updatedAt
  }
`

export interface CommunityInfoProps {
  community: communityInfoCommunityFields$key
}

export const CommunityInfo: React.FC<CommunityInfoProps> = (props: CommunityInfoProps) => {
  const navigate = useNavigate();
  const community = useFragment(DataFragment, props.community)

  return <div key={community.id}>
    <Row justify="center">
      <Col span={8} style={{ textAlign: 'center', borderRight: 'solid 1px' }}>
        <Button
          style={{ width: '250px' }}
          onClick={() =>
            navigate(
              `/community/${community.id}/member/${localStorage.getItem(
                LocalSettingsKeys.UserId
              )}`
            )
          }
        >
          {community.name} Member Site
        </Button>
      </Col>
      { community.userIsAdmin && (
      <Col span={8} style={{ textAlign: 'center' }}>
        <Button
          style={{ width: '250px' }}
          onClick={() => navigate(`/community/${community.id}/admin`)}
        >
          {community.name} Admin Site
        </Button>
      </Col>
      )}
    </Row>
  </div>
}