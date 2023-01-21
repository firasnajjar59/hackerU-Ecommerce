/** @format */

import Box from 'components/common/Box/Box';
import './webContent.scss';

import UploadGallaryImg from 'components/specific/UploadGallaryImg/UploadGallaryImg';

import UpdateLogo from 'components/specific/UpdateLogo/UpdateLogo';
import UpdateAboutUs from 'components/specific/UpdateAboutUs/UpdateAboutUs';

const WebContent = () => {
  
  return (
    <Box>
      <h2>Web Content</h2>
      <UploadGallaryImg/>
      <UpdateLogo/>
      <UpdateAboutUs/>
    </Box>
  );
};

export default WebContent;
