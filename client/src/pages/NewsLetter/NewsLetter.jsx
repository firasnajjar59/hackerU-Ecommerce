import { useEffect, useState } from 'react'
import './newsLetter.scss'
import axios from 'axios'
import Box from 'components/common/Box/Box'
import Input from 'components/common/Input/Input'
import TextArea from 'components/common/Input/TextArea'
import Button from 'components/common/Button/Button'
import updateInputs from 'functions/updateInputs'
import Error from 'components/common/Errors/Error'
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler'
import { useDispatch } from 'react-redux'
import { resetMessage, setMessage } from 'store/toast'

const NewsLetter = () => {
    const ofwoodErrorhandler=useOfwoodErrorhandler()
    const dispatch= useDispatch()
    const [sending,setSending]=useState(false)
    const [error,setError]=useState("")
    const [emails,setEmails]=useState([])
    const [inputs,setInputs]=useState({
        subject:"",
        message:""
    })
    useEffect(()=>{
        (async()=>{
            try {
                const {data}=await axios.get("/v1/newsletter")
                const emailArr=data.data.doc.map((obj)=>obj.newsletterEmail)
                setEmails(emailArr)
            } catch (error) {
                ofwoodErrorhandler(error.response.data)
            }
        })()
    },[])
    
    const handleInputs = ev => updateInputs(ev, setInputs);
    const handleSendMessage=async()=>{
        try {
            setError("")
            await axios.post("/v1/newsletter/sendemails",{
                subject:inputs.subject,
                message:inputs.message,
                emails:emails
            })
            setInputs({
                subject:"",
                message:""
            })
            setSending(false)
            dispatch(setMessage("The E-mail sent"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
        } catch (error) {
            setError(error.response.data.message)
            ofwoodErrorhandler(error.response.data)
            setSending(false)
        }
    }
  return (
    <Box classes="bg-secondary-ofwood py-4">
        <h3>Newsletter</h3>
        {error.length>0&&<Error>{error}</Error>}
        <h6>Subject:</h6>
        <Input type="text" placeholder="Enter the subject of the message" value={inputs.subject} onchange={handleInputs} datalabel="subject" />
        <h6>Message:</h6>
        <TextArea type="text" placeholder="Enter the news message" value={inputs.message} onchange={handleInputs} datalabel="message" />
        <Button classes="primary-button" onclick={()=>{setSending(true);handleSendMessage()}} >{sending?"sending":"Send"}</Button>
    </Box>
  )
}

export default NewsLetter