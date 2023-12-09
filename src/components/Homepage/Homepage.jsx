import React,{useEffect} from 'react'
import Axios from 'axios'
import{useNavigate} from 'react-router-dom'
import './homepage.css'

function Homepage() {
  const navigate = useNavigate();

  const Authorized=async()=>{
    try{

    
    const res =await Axios.get("http://localhost:5001/auth",{
      withCredentials:true
    });
    console.log(res);
    if(res.data.success==="notpresent"){
      console.log("hiii");
      navigate("/signin")
    }

  }catch(e){
    console.log(e);
   

  }

  }

  useEffect(() => {
    // Authorized();
   
  },)
  
  return (
    <div className="homecontainer">Welcome to Accredian Assignment</div>
  )
}

export default Homepage