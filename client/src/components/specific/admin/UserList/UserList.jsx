import ListCard from 'components/common/ListCard/ListCard'
import './userList.scss'
import BoxContainer from 'components/common/BoxContainer/BoxContainer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import EditUser from './EditUser/EditUser'
import { useDispatch } from 'react-redux'
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler'
import { resetMessage, setMessage } from 'store/toast'


const UserList = () => {
  document.title = `Users | ofwood`;
  const dispatch=useDispatch()
  const ofwoodErrorhandler=useOfwoodErrorhandler()
    const [usersArr,setUsersArr]=useState()
    useEffect(()=>{
        (async ()=>{
          try {
            let {data:res}=await axios.get(`/v1/users`)
            setUsersArr(res.data.doc)
            
          } catch (error) {
            console.log(error);
          }
        })()
      },[])
      
      //   
      
    //   
    const handleDeleteUser=(id)=>async ()=>{
        try {
          await axios.delete(`/v1/users/admin/${id}`)
          const filterdArr=usersArr.filter((item)=>item._id!=id)
            setUsersArr(filterdArr)
            dispatch(setMessage("The user deleted"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
          } catch (error) {
          ofwoodErrorhandler(error.response.data)
        }
    }
  return (
    <div>
    <h2>
        User List
    </h2>
    <div className="products-list-wrapper bg-secondary-ofwood">
        {usersArr?usersArr.map((user,indx)=><BoxContainer key={indx}>
            <ListCard edit={false} onDelete={handleDeleteUser(user._id)} title={user.email} src={user.userImg?.includes("http")?user.userImg:`users/${user.userImg}`} slug={user._id} id={user._id}/>
            <EditUser activeUser={user.activeUser} role={user.role} id={user._id} />
        </BoxContainer>):""}
    </div>
</div>
  )
}

export default UserList