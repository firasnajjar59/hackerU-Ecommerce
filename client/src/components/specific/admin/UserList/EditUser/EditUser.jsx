/** @format */

import ExpandSection from 'components/common/ExpandSection/ExpandSection';
import './editUser.scss';
import DropMenu from 'components/common/Input/DropMenu';
import { useEffect, useState } from 'react';
import Button from 'components/common/Button/Button';
import updateInputs from 'functions/updateInputs';
import axios from 'axios';

const EditUser = (props) => {
    const [inputs,setInputs]=useState({role:"",activeUser:""})
    useEffect(()=>{
        setInputs({
            role:props.role,
            activeUser:props.activeUser
        })
    },[])
    // 
    const handleInputs = ev => updateInputs(ev,setInputs);
    // 
    const handleAppleButton=async ()=>{
        try {
            const {data}=await axios.patch(`/v1/users/admin/${props.id}`,inputs)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <ExpandSection title="Edit User">
      <div className=''>
        <p>Role</p>
        <DropMenu
          datalabel='role'
          value={inputs.role}
          onchange={handleInputs}
          classes='custmizeSelection p-1 my-2'
          options={['admin', 'contributor', 'user']}
          />
          <p>Active User</p>
        <DropMenu
          datalabel='activeUser'
          value={inputs.activeUser}
          onchange={handleInputs}
          classes='custmizeSelection p-1 my-2'
          options={['true', 'false']}
        />
        <Button onclick={handleAppleButton} classes="primary-button">Apply</Button>
      </div>
    </ExpandSection>
  );
};

export default EditUser;
