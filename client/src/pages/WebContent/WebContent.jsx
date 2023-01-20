/** @format */

import Box from 'components/common/Box/Box';
import './webContent.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'components/common/Button/Button';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import Input from 'components/common/Input/Input';
import updateInputs from 'functions/updateInputs';

const WebContent = () => {
    const [photo,setPhoto]=useState()
    const [photoName,setPhotoName]=useState("example.jpg/png")
    const [inputs,setInputs]=useState({
        alt:"",
        caption:""
    })
    const handleInputs = ev => updateInputs(ev, setInputs);

useEffect(()=>{
    console.log(photo);
    console.log(photoName);
},[photoName,photo])
  const AddImgsToGallary = async () => {
      console.log(photo);
    try {
      const formData = new FormData();
      if(inputs.alt&&inputs.caption&&photo){
          formData.append('alt',inputs.alt)
          formData.append('caption',inputs.caption)
          formData.append('img', photo)
          console.log("hi");
        let { data } = await axios.post(
            '/v1/gallary',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          setPhotoName("example.jpg/png")
          setInputs({
            alt:"",
            caption:""
        })
        setPhoto()
          console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <h2>Web Content</h2>
      <Box classes={'bg-secondary-ofwood'}>
        <h5>Gallary</h5>
          <Input type="text" onchange={handleInputs} value={inputs.caption} placeholder="Image Caption" datalabel="caption"  />
          <Input type="text" onchange={handleInputs} value={inputs.alt} placeholder="Image Alt" datalabel="alt"  />
        <label htmlFor='photo' className='file-input-label'>
          Select Image
          <MaterialIcon title="image" />
          <Input type="file" classes="file-input" onchange={(ev)=>{setPhoto(ev.target.files[0]);setPhotoName(ev.target.files[0].name);console.log(ev);}} name="photo" id="photo" />
          <span className='file-name'>{photoName}</span>
        </label>
        <Button
          onclick={AddImgsToGallary}
          classes='primary-button'>
          Upload images to gallery
        </Button>
      </Box>
      <Box classes={'bg-secondary-ofwood'}></Box>
      <Box classes={'bg-secondary-ofwood'}></Box>
    </Box>
  );
};

export default WebContent;
