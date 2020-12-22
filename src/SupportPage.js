import React, { Component } from "react";
import "./App.css";
import { check } from './UserFunctions';
import history from './history';
import { Link } from 'react-router-dom';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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

class SupportPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",

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
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 digits required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };


  render() {
    //console.log(this.state.option);
   // const result=["CocaCola", "Pepsi", "Fanta", "Parle", "All"];
    const { formErrors } = this.state;
    
    const SupportPage=() => {
      history.push("/SignIn")
    };


    const Account= () => {
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      }
      check(newUser).then(res => {
   console.log("Submitted")
      })
      
    

    };

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Password Recovery</h1>
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
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
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
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
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
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="createAccount">
            <button onClick= {()=>Account()} >Submit</button>
            
            <Link className="Link" to="SignIn" style={{ textDecoration: 'none' }}onClick={()=>SupportPage()}>Log In</Link>
              
            </div>
          </form>
        </div>
    </div>
    );
  }
}

export default SupportPage;