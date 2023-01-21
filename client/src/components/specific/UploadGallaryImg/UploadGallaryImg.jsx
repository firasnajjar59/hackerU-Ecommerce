import Box from 'components/common/Box/Box';
import './uploadGallaryImg.scss'
import Input from 'components/common/Input/Input';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import Button from 'components/common/Button/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import updateInputs from 'functions/updateInputs';
import ExpandSection from 'components/common/ExpandSection/ExpandSection';


const UploadGallaryImg = () => {
    const [photo,setPhoto]=useState()
    const [photoName,setPhotoName]=useState("example.jpg/png")
    const [inputs,setInputs]=useState({
        alt:"",
        caption:""
    })
    const handleInputs = ev => updateInputs(ev, setInputs);
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
    <Box classes={'bg-secondary-ofwood'}>
    <ExpandSection title="Gallary">

   
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
      </ExpandSection>
      </Box>
  )
}

export default UploadGallaryImg