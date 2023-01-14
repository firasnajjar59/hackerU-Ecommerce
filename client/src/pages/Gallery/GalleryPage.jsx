/** @format */

import Gallery from 'components/common/Gallery/Gallery';
import gallery from 'data/gallery';
import React from 'react';

const GalleryPage = () => {
  document.title = `Gallery | ofwood`;

  return (
    <div className='container-fluid'>
      <div className='container m-auto mt-3'><Gallery photos={gallery}/></div>
    </div>
  );
};

export default GalleryPage;
