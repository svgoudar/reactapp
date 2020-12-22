import React, { Component } from "react";
import "./App.css";
import { reg } from './UserFunctions';
import history from './history';
import { Link } from 'react-router-dom';

// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: [],
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      incorrectPass:false,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    };
  }

 
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
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
    let formErrors = this.state.formErrors;
    

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 0 ? "minimum 3 digits required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 0 ? "minimum 3 characaters required" : "";
        break;
      // case "email":
      //   formErrors.email = emailRegex.test(value)
      //     ? ""
      //     : "invalid email address";
      //   break;
      case "password":
        formErrors.password =
          value.length < 0 ? "minimum 3 characaters required" : "";
        break;
        case "confirmPassword":
          formErrors.confirmPassword =
          value.length < 0 ? "minimum 3 characaters required" : "";
          break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };


  render() {

    const { formErrors } = this.state;
    
    const SupportPage=() => {
      history.push("/SignIn")
    };

    const Account= () => {
//  console.log(document.getElementById("pass"),document.getElementById("cpass"))
             
              if(document.getElementById("pass").value === document.getElementById("cpass").value)
              {
                this.setState({
                  incorrectPass:false
                })
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      }

      
      reg(newUser).then(res => {
        if(res.data === "True")
        this.props.history.push('/SignIn')
        if(res.data === "False") 
        alert("You already have an account/Incorrect Credentials")
        
      })

    }
  
    else
    {
      this.setState({
        incorrectPass:true
      })
    }
  }
 

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Employee Registration</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">Employee ID</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="Employee ID"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )} */}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Employee Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Full Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )} */}
            </div>
            <div className="email">
              <label htmlFor="email">Employee Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="@wipro.com"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )} */}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
              id="pass"
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )} */}
            </div>
            <div className="confirmPassword">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
              id="cpass"
                className={formErrors.confirmPassword.length > 0 ? "error" : null}
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.confirmPassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmPassword}</span>
              )} */}
            </div>
                {
                  (this.state.incorrectPass === false) ?
            <div className="createAccount">
            <button onClick= {()=>Account()} >Create Account</button>
             <Link className="Link" to="SignIn" style={{ textDecoration: 'none' }} onClick={()=>SupportPage()}>Already Have An Account?</Link>
              
            </div>
            :
            <div className="createAccount">
            <h3><label>Password Doesn't Match Please Enter Again</label></h3>
            <div className="createAccount">
            <button onClick= {()=>Account()} >Create Account</button>
             <Link className="Link" to="SignIn" style={{ textDecoration: 'none' }} onClick={()=>SupportPage()}>Already Have An Account?</Link>
              
            </div>
            </div>
}
          </form>
        </div>
    </div>
    );
  }
}

export default Register;
