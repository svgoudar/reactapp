import React, { Component } from "react";
import "./App.css";
import { sign } from './UserFunctions';
import history from './history';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      pnopt:[],
      role: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  componentDidMount(){
   
    axios.get('https://poc100.herokuapp.com/auth/get_roles').then( 
      (response) => { 
          var p= response.data;
          this.setState({pnopt:p});
         
      }, 
      
      (error) => { 
          console.log(error); 
      } 
  );
}
  handleSubmit = e => {
    e.preventDefault();


    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    

    switch (name) {
     
      case "email":
        formErrors.email=
          value.length < 0 ? "minimum 3 characaters required" : "";
        break;
      case "password":
        formErrors.password = 
        value.length < 0 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
    
  };


  render() {
 
    const { formErrors } = this.state;

    const alreadyAccount= () => {
      history.push("/Register");
    };

    const SupportPage=() => {
      history.push("/SupportPage")
    };

    const submitButton= () => {
      const user = {
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      }
      sign(user).then(res => {
        if(res.data==="True")
        //console.log(sessionStorage.getItem('user'));
        this.props.history.push('/Navbar')
        if(res.data==="False")
        alert("Incorrect Credentials")
        // this.props.history.push('/SignIn')
      })
      
    };
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Member Login</h1>

         <form id="test" onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Employee Email</label>
              <i className="fa fa-user icon fa-fw"></i> 
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                id="eid"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
        
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <i className="fa fa-key icon fa-fw"> 
              </i>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                id="pass"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
        
            </div>

            <div className='roles'>
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Select Role</label>
             <FormControl variant='outlined' style= {{ backgroundColor: '#d8e5f3'}}>
            <Select className="select"
                 name="role"
                 onChange={this.handleChange}>
         
          { 
          this.state.pnopt.map((p) => {
            return(
              <option className="option" value ={p} >
                {
                  p
                }
                </option>
            );
            
          } )
         }
        
            </Select>
        </FormControl>
            </div>
            <div className="createAccount">
            <button type='submit' onClick= {()=>submitButton()} >Submit</button>
             </div>
             
        </form>
        <Link className="Link" to="Register" style={{ textDecoration: 'none' }} onClick= {()=>alreadyAccount()}>Create Account</Link>
        <Link className="Link" to="SupportPage" style={{ textDecoration: 'none' }} onClick={()=>SupportPage()}>Need Assistance/Forgot Password</Link>
      </div>

      </div>
    );
  }

}
export default SignIn;
