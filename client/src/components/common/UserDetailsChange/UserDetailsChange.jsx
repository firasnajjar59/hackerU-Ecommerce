/** @format */

import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import './userDetailsChange.scss';
import updateInputs from 'functions/updateInputs';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import ExpandSection from '../ExpandSection/ExpandSection';
import Box from '../Box/Box';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import useOfwoodErrorhandler from '../Errors/errorhandler';
import { resetMessage, setMessage } from 'store/toast';

const UserDetailsChange = () => {
  const dispatch=useDispatch()
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const updateUser=useUpdateUserRedux()
  const user = useSelector(state => state.loggedUser.user);
  const [inputs, setInputs] = useState({
    name: '',
    userName: '',
    phone: '',
    birthday: '',
  });
  useEffect(() => {
    if (user)
      setInputs({
        name: user.name,
        userName: user.userName,
        phone: user.phone,
        birthday: user.birthday
          ? new Date(user.birthday).toISOString().split('T')[0]
          : '',
      });
  }, [user]);

  const handleInputs = ev => updateInputs(ev, setInputs);

  const handleChangeUserInfo = async () => {
    try {
      let { data } = await axios.patch('/v1/users/updateme', inputs);
      updateUser(data.data.token)
      dispatch(setMessage("The user details updated"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
    } catch (error) {
      ofwoodErrorhandler(error.respone.data)
    }
  };
  return (
    <Box classes="bg-secondary-ofwood" >
      <ExpandSection title='User information'>
        <div>
          <label htmlFor='name'>Name</label>
          <Input
            value={inputs.name}
            onchange={handleInputs}
            datalabel='name'
            id='name'
            type='text'
          />
        </div>
        <div>
          <label htmlFor='userName'>Username</label>
          <Input
            value={inputs.userName}
            onchange={handleInputs}
            datalabel='userName'
            id='userName'
            type='text'
          />
        </div>
        <div>
          <label htmlFor='phone'>Phone</label>
          <Input
            value={inputs.phone}
            onchange={handleInputs}
            datalabel='phone'
            id='phone'
            type='text'
          />
        </div>
        <div>
          <label htmlFor='birthday'>Birthday</label>
          <Input
            value={inputs.birthday}
            onchange={handleInputs}
            datalabel='birthday'
            id='birthday'
            type='text'
          />
        </div>
        <Button
          onclick={handleChangeUserInfo}
          classes='primary-button'>
          Update my information
        </Button>
      </ExpandSection>
    </Box>
  );
};

export default UserDetailsChange;
