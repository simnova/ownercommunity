import { Skeleton, message } from 'antd';
import { FC } from 'react';

interface ComponentQueryLoaderProps {
  error?: Error;
  loading: boolean;
  hasData: any;
  hasDataComponent: any;
  noDataComponent?: any;
  loadingRows?: number;
  loadingComponent?: any;
}

export const ComponentQueryLoader: FC<ComponentQueryLoaderProps> = (props) => {
  if (props.error) {
    message.error(props.error.message);
    return <Skeleton/>;
  }
  if (props.loading) {
    if (props.loadingComponent) {
      return props.loadingComponent;
    }
    return <Skeleton active paragraph={{ rows: props.loadingRows ?? 3 }} title= {false}/>;
  }
  if (props.hasData) {
    return props.hasDataComponent;
  }
  return props.noDataComponent;
};
