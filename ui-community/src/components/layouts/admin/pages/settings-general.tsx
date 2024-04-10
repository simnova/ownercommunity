
import { useParams } from 'react-router-dom';
import { SettingsGeneralContainer,  } from '../components/settings-general.container';

export const SettingsGeneral: React.FC<any> = () => {
  const params = useParams();
  return (
    <>
      <h1>General</h1>
      {params.communityId && <SettingsGeneralContainer data={{id: params.communityId}} />}
    </>
  )
} 