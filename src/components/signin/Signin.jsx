
import React,{useState,useEffect} from 'react'
import{useNavigate} from 'react-router-dom'
import Axios from 'axios';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";




const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    // backgroundImage: `url(${img})`,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Signin = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
Axios.defaults.withCredentials=true;
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  setFormErrors(validate({email ,password}));
  setIsSubmit(true);
};
const Authorized=async()=>{
  try{

  
  const res =await Axios.get("http://localhost:5001/auth",{
    withCredentials:true
  });
  console.log(res);
  if(res.data.success==="notpresent"){
    console.log("signinpage");
    
  }else{
    navigate("/")
  }

}catch(e){
  navigate("/")
  console.log(e);
 

}

}

useEffect(() => {
  // Authorized();
 //This should be on but you dont see actual pages thats why i commented this
}, )

  const submitLogin=async()=>{

      const values={email,password}
  
      try {
        const res=await Axios.post("http://localhost:5001/login",values);

        if(res.status===200){
        window.alert("LogIn Successfull!!")  
        navigate("/")
        }
        

      } catch (error) {
       window.alert(error.response.data.message)
        console.log("error is axios",error);
      }

  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      submitLogin();

     
    }
  }, [formErrors]);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
   
   

    return errors;
  };






  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={email} onChange={(e)=>setEmail(e.target.value)}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
             <p id="errormsg">{formErrors.email}</p>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
             <p id="errormsg">{formErrors.password}</p>
         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item >
                <Link  href="/signup" >
                 {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signin;