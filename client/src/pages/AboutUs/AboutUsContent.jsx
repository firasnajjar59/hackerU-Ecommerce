import axios from "axios"
import { useEffect, useState } from "react"

export const AboutUsContent = () => {
    const [contents,setContents]=useState([])
    useEffect(()=>{
        (async()=>{
            try {
                const { data } = await axios.get('/v1/users/admin/webcontent/aboutus');
                console.log(data.data.doc[0].contents);
                setContents(data.data.doc[0].contents)
            } catch (error) {
                console.log(error);
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
