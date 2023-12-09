
import React,{useState,useEffect} from 'react'
import{useNavigate} from 'react-router-dom'
import Axios from 'axios';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./signup.css";



const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const navigate = useNavigate();
    const [user, setuser] = useState({
        username:"",email:"",password:"",confirmpassword:""
      });
      const [formErrors, setFormErrors] = useState({});
      const [isSubmit, setIsSubmit] = useState(false);
 
    const handleInputs=(e)=>{
    var  names=e.target.name;
    var  value=e.target.value;
      setuser({...user,[names]:value})
      
    }


    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(user));
      setIsSubmit(true);
    };

    const submitForm=async()=>{
       
     
        try {
          const res=await Axios.post("http://localhost:5001/register",user)
       
          if(res.status===201){
            console.log("hereeeeeeee");
            window.alert("Sucessfully registerd!!")
            navigate("/signin")
          }

        } catch (error) {
          console.log("error is axios",error);
        }
   

    }

    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        // console.log(formValues);
        submitForm();
  
       
      }
    }, [formErrors]);



    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username) {
        errors.username = "Username is required!";
      }
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
      if (!values.confirmpassword) {
        errors.confirmpassword = "Confirmpassword is required";
      } else if (values.confirmpassword.length < 4) {
        errors.confirmpassword = "Confirmpassword must be more than 4 characters";
      } else if (values.confirmpassword.length > 10) {
        errors.confirmpassword = "Confirmpassword cannot exceed more than 10 characters";
      }

      if(values.password !== values.confirmpassword){
        errors.issame="Password and Confirmpassword should be same"
      }

      return errors;
    };



  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} id="container">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
         </Avatar>  
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}   >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="Username" 
                value={user.username} onChange={handleInputs}
                label="Username"
                autoFocus
              />
                 <p id="errormsg">{formErrors.username}</p>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address" value={user.email} onChange={handleInputs}
                name="email"
                autoComplete="email"
                
              />
                 <p id="errormsg">{formErrors.email}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password" value={user.password} onChange={handleInputs}
                id="password"
                autoComplete="current-password"
              />
                 <p id="errormsg">{formErrors.password}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirmpassword"
                type="password"
                id="Confirmpassword"
                value={user.confirmpassword} onChange={handleInputs}
                autoComplete="current-password"
              />
                <p id="errormsg">{formErrors.confirmpassword}</p>
                <p id="errormsg">{formErrors.issame}</p>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
  
    </Container>
  );
}







