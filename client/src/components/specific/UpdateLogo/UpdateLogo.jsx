import DropMenu from 'components/common/Input/DropMenu';
import './updateLogo.scss'
import Box from 'components/common/Box/Box';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import axios from 'axios';
import { useState } from 'react';
import updateInputs from 'functions/updateInputs';
import ExpandSection from 'components/common/ExpandSection/ExpandSection';

const UpdateLogo = () => {
    const [logo,setLogo]=useState()
  const [logoName,setlogoName]=useState("example.jpg/png")
  const handleInputs = ev => updateInputs(ev, setInputs);
  const [inputs,setInputs]=useState({
    name:"What to update"
})
  const AddImgTologo = async () => {
      console.log(logo);
    try {
      const formData = new FormData();
      if(inputs.name!="What to update"){
          formData.append('name',inputs.name)
          formData.append('img', logo)
        let { data } = await axios.patch(
            '/v1/users/admin/webcontent',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          setlogoName("example.jpg/png")
          setInputs({
            name:"",
        })
        setLogo()
          console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box classes={'bg-secondary-ofwood'}>
    <ExpandSection title="Update logo">

      <DropMenu classes="custmizeSelection" datalabel="name" onchange={handleInputs} value={inputs.name} options={["What to update","darklogo","lightlogo"]} />
        <label htmlFor='logo' className='file-input-label'>
          Select Image
          <MaterialIcon title="image" />
          <Input type="file" classes="file-input" onchange={(ev)=>{setLogo(ev.target.files[0]);setlogoName(ev.target.files[0].name);console.log(ev);}} name="logo" id="logo" />
          <span className='file-name'>{logoName}</span>
        </label>
        <Button
          onclick={AddImgTologo}
          classes='primary-button'>
          Upload images to gallery
        </Button>
    </ExpandSection>
      </Box>
  )
}

export default UpdateLogo