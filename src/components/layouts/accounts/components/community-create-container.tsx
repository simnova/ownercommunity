import { CommunityCreate } from './community-create';
import { CommunityCreateContainerMutationCommunityCreateDocument,CommunityCreateInput} from '../../../../generated';
import { useMutation } from '@apollo/client';
import { message } from 'antd';

export const CommunityCreateContainer: React.FC<any> = (props) => {

  const [createCommunity, { data, loading, error }] = useMutation(CommunityCreateContainerMutationCommunityCreateDocument);  

  const handleSave = async (values: any) => {
    var newCommunity: CommunityCreateInput = {
      ...values
    }
    try {
      await createCommunity({
        variables: {
          input:newCommunity
        }
      });
      message.success('Community Created');      
    } catch (saveError) {
      message.error(`Error creating listing: ${JSON.stringify(saveError)}`);
    }
  }

  const content = () => {
    if(loading) {
      return <div>Loading...</div>
    } else if(error) {  
      return <div>Error {JSON.stringify(error)}</div>
    } 
    // else if(data){
    //   return <div>Data {JSON.stringify(data)}</div>
    // } 
    else {
      return <CommunityCreate onSave={handleSave} />
    }
  }

  return (
    <>
      {content()}
    </>
  )
}