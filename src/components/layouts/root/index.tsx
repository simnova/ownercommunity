import React from 'react';
import { BlobToLocalStorage } from '../../shared/blob-to-local-storage';
import { SectionLayout } from './section-layout';

export const Root: React.FC<any> = (_props) => {
  return (
    <BlobToLocalStorage>
      <SectionLayout />
    </BlobToLocalStorage>
  );
};
