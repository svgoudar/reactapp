import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import "./comp.css";
import { pragdata } from './UserFunctions';
import axios from 'axios';
import TabP from '../Tables/TabP';
import Nav from '../../../src/nav.js';

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

class Pragati extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: [],
      pop:null,
      des: null,
      pragatiID: null,
      pragatiTitle: null,
      dateP: null,
      formErrors: {
        pragatiID:"",
      }
    };
  }
  componentDidMount(){
   
    axios.get('https://poc100.herokuapp.com/list/ddinfo',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then( 
      (response) => { 
          var o= response.data.projectList; 
          this.setState({option:o});
          
          console.log(o);
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
        --SUBMITTING--`);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
     
      case "pragatiID":
        formErrors.pragatiID =
        value.length < 3 ? "Enter 3 or more Digit Pragati ID" : "";
        break;

      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
    
  };


  render() {
    //console.log(this.state.dateFrom);
   // const result=["CocaCola", "Pepsi", "Fanta", "Parle", "All"];
    
   const { formErrors } = this.state;
   const cancelCourse = () => { 
    document.getElementById("test").reset();
    }
    
    const submitButton= () => {
      const okUser = {
      pop: this.state.pop,
      dateP: this.state.dateP,
       des: this.state.des,
       pragatiID: this.state.pragatiID,
       pragatiTitle: this.state.pragatiTitle,
       
      }
      pragdata(okUser).then(res => {
      if(res.data ==="True")
      alert("You Have Successfully Submitted the Form")
     if(res.data === "False"){
      alert("Please Check all the Details")
        }
      })
     // this.props.history.push('/Navbar')


    };

    return (
      <>
      <div className="wrappers">
      <Nav/>
        <div className="forms">
          <h1>Pragati Registration</h1>
          <form id="test" onSubmit={this.handleSubmit}>

          <div className='dropdown'>
          
          <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Project Name</label>
           <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%',marginLeft:"1.6%"}}>
          <Select className="select"
              
               name= 'pop'
               id="test"
               onChange={this.handleChange}>
       
        { 
        this.state.option.map((o) => {
         
          return(
            <option className="option" value ={o} >
              {
                o
              }
              </option>
          );
          
        } )
       }
      
          </Select>
      </FormControl>
          </div>
       
          <div className="pragatiTitle">
              <label htmlFor="pragatiTitle">Pragati Title</label>
              <input
               
                placeholder="Title"
                type="text"
                name="pragatiTitle"
                onChange={this.handleChange}
              />
   
            </div>
            <div className="pragatiID">
              <label htmlFor="pragatiID">Pragati ID</label>
              <input
                 className={formErrors.pragatiID.length > 3 ? "error" : null}
                placeholder="Pragati ID"
                type="text"
                name="pragatiID"        
                onChange={this.handleChange}
              />
                           {formErrors.pragatiID.length > 3 && (
                <span className="errorMessage">{formErrors.pragatiID}</span>
              )}
            </div>

            <div className="des">
              <label htmlFor="des">Description</label>
              <input
               
                placeholder="Enter Description"
                type="text"
                name="des"
                width="100%"
                height="40%"
                onChange={this.handleChange}
              />
              
            </div>


            <div className="dateP">
              <label htmlFor="dateP" style={{marginTop:"0.4rem"}}>Submission Date</label>
              <input
                placeholder="Start Date"
                type="date"
                name="dateP"
                noValidate
                onChange={this.handleChange}
                
              />
              
            </div>


            <div className="create">
            <button type='submit' onClick= {()=>submitButton() } >Submit</button></div>
            <div className="ref">
            <button onClick={() => cancelCourse()}>Reset</button></div>

          </form>
        </div>
        <br></br>
         <div className="table">
        <TabP/>
        </div>
    </div>
    </>
    );
  }
}

export default Pragati;
