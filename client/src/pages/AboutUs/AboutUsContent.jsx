import axios from "axios"
import useOfwoodErrorhandler from "components/common/Errors/errorhandler"
import { useEffect, useState } from "react"

export const AboutUsContent = () => {
    const ofwoodErrorhandler=useOfwoodErrorhandler()
    const [contents,setContents]=useState([])
    useEffect(()=>{
        (async()=>{
            try {
                const { data } = await axios.get('/v1/users/admin/webcontent/aboutus');
                setContents(data.data.doc[0].contents)
            } catch (error) {
                ofwoodErrorhandler(error.response.data)
            }
        })()
    },[])

  return (
    <>
    {contents.length>0&&contents.map((content,indx)=><div key={indx} className="">
              <h4>{content.title}</h4>
              <p>{content.content}</p>  
    </div>)}
    </>
  )
}
