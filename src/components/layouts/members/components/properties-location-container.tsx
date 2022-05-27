import PropTypes from 'prop-types';
import { PropertiesLocation } from './properties-location';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    communityId: PropTypes.string.isRequired
  })
};

interface ComponentPropInterface {
  data: {
    id: string;
    communityId: string;
  };
}

export type PropertiesLocationContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & 
  ComponentPropInterface;

export const PropertiesLocationContainer: React.FC<PropertiesLocationContainerPropTypes> = (props) => {

  const content = () => {
    return <PropertiesLocation />;
  }

  return <>
    {content()}
  </>
}


