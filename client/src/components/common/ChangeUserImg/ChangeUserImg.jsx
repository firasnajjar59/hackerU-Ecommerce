import { useState } from 'react';
import './changeUserImg.scss'
import axios from 'axios';
import Input from '../Input/Input';
import Button from '../Button/Button';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import ExpandSection from '../ExpandSection/ExpandSection';
import Box from '../Box/Box';


export const ChangeUserImg = () => {
    const [photo,setPhoto]=useState()
    const [photoName,setPhotoName]=useState("example.jpg/png")
    const handleImgSend=async()=>{
      try {
        const formData=new FormData();
        formData.append("photo",photo)
        console.log(formData.get("photo"));
        let {data}= await axios.patch("/v1/users/updateme",formData,{ headers: {'Content-Type': 'multipart/form-data'}})
        setPhotoName("Image Uploaded")
        console.log(data.data.token);
        localStorage.setItem("token",data.data.token)
      } catch (error) {
        console.log(error);
      }
      
    }
  return (
    <Box classes="bg-secondary-ofwood">
      <ExpandSection title="Upload Image">
        <label htmlFor='photo' className='file-input-label'>
          Select Image
          <MaterialIcon title="image" />
          <Input type="file" classes="file-input" onchange={(ev)=>{setPhoto(ev.target.files[0]);setPhotoName(ev.target.files[0].name);console.log(ev);}} name="photo" id="photo" />
          <span className='file-name'>{photoName}</span>
        </label>
        <Button classes="primary-button" onclick={handleImgSend}>Send</Button>
      </ExpandSection>
    </Box>
  )
}
