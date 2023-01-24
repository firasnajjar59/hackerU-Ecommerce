import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetMessage, setMessage } from "store/toast";
import { useErrorHandler } from 'react-error-boundary';
import { removeUser } from "store/loggedUser";
import { setLogOut } from "store/loggedIn";


const useOfwoodErrorhandler=()=>{
const history=useHistory()
const dispatch=useDispatch()
const hanlerError = useErrorHandler()

    return (error)=>{
      console.log(error);
      if(error.err&&error.err.statusCode==500){
        dispatch(setMessage("Something went wrong"))
        setTimeout(()=>{
          dispatch(resetMessage())
        },8000)
      }else{
        let message=error.message;
      if(error.message.startsWith("Invalid token specified")) message="Invalid token specified"
        switch(message) {
          // 
            case "Invalid token please login again":
                dispatch(setMessage(error.message))
                setTimeout(()=>{
                  dispatch(resetMessage())
                },5000)
                setTimeout(()=>{
                  localStorage.removeItem('token');
                  dispatch(removeUser())
                  dispatch(setLogOut())
                  history.push("/signin")
                },5000)
                break;
                // 
                case "Your are not logged in. Please log in to get access":
                  
                  dispatch(removeUser())
                  dispatch(setLogOut())
                  break;
                  // 
                case "Invalid token specified":
                  dispatch(setMessage("We noticed that there is a problem with your login, please login again"))
                  setTimeout(()=>{
                    dispatch(resetMessage())
                  },8000)
                  dispatch(removeUser())
                  dispatch(setLogOut())
                  localStorage.removeItem('token');
                  break;
                  // 
                  case "Incorrect password":
                    dispatch(setMessage(error.message))
                    setTimeout(()=>{
                      dispatch(resetMessage())
                    },8000)
                    break;
                  // 
                  case "Not Image":
                    dispatch(setMessage("You can upload images with a jpeg, jpg, png extension"))
                    setTimeout(()=>{
                      dispatch(resetMessage())
                    },8000)
                    break;
                  case "empty review":
                    dispatch(setMessage("You can't post an empty review"))
                    setTimeout(()=>{
                      dispatch(resetMessage())
                    },5000)
                    break;
                    //
                  // case "empty review":
                  //   dispatch(setMessage("You can't post an empty review"))
                  //   setTimeout(()=>{
                  //     dispatch(resetMessage())
                  //   },5000)
                  //   break;
                default:
                  dispatch(setMessage(message))
                  setTimeout(()=>{
                    dispatch(resetMessage())
                  },8000)
      }
      
                 
            }
          }

    }


export default useOfwoodErrorhandler