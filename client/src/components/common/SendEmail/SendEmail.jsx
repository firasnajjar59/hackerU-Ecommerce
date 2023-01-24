/** @format */

import { useEffect, useState } from 'react';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Input from '../Input/Input';
import TextArea from '../Input/TextArea';
import './sendEmail.scss';
import axios from 'axios';
import updateInputs from 'functions/updateInputs';
import Error from '../Errors/Error';
import { Success } from '../Success/Success';
import useOfwoodErrorhandler from '../Errors/errorhandler';

const SendEmail = props => {
  const ofwoodErrorhandler=useOfwoodErrorhandler()
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const [sending,setSending]=useState(false)
    const [inputs,setInputs]=useState({
        email:"",
        subject:"",
        message:"",
    })
    useEffect(()=>{
        setInputs({
            email:props.email,
            subject:"",
            message:"",
        })
    },[])
    useEffect(()=>{
        setError("")
        if(inputs.subject.length>0||inputs.message.length>0){
          setSuccess("")
        }
    },[inputs])
    const handleInputs = ev => updateInputs(ev, setInputs);

    const handleSendMessage= async()=>{
        setSending(true)
        try {
            await axios.post(`/v1/order/${props.id}`,inputs)
            setInputs({
                email:props.email,
                subject:"",
                message:"",
            })
            setSending(false)
            setSuccess("The email has been sent")
        } catch (error) {
          if(error.response.data.err.statusCode==400){
            setSending(false)
            setError(error.response.data.message)
          }else{
            ofwoodErrorhandler(error.response.data)
          }
        }
    }

  return (
    <Box classes='bg-primary-opacity'>
      <Box classes='bg-secondary-ofwood'>
        <div className='row d-flex align-items-center'>
          <div className='col-sm-8 px-2 py-1'>To: {props.email}</div>
          <div className='col-sm-4 px-2 py-1'>
            <Button
              onclick={handleSendMessage}
              classes='primary-button'>
              {sending?"Sending...":"Send a message"}
            </Button>
          </div>
          <div className="col-sm-12 d-flex align-items-center justify-content-center">
            {error.length>0&&<Error>{error}</Error>}
            {success.length>0&&<Success>{success}</Success>}
          </div>
        </div>
      </Box>
      <div className='row d-flex align-items-center'>
        <div className='col-sm-12 px-2 py-1'>Subject</div>
        <Input
          classes='bg-secondary-ofwood'
          datalabel='subject'
          value={inputs.subject}
          onchange={handleInputs}
          placeholder='Subject'
        />
      </div>
      <div className='row d-flex align-items-center'>
        <div className='col-sm-12 px-2 py-1'>Message</div>
        <TextArea
          datalabel='message'
          value={inputs.message}
          onchange={handleInputs}
          placeholder='Message'
        />
      </div>
    </Box>
  );
};

export default SendEmail;
