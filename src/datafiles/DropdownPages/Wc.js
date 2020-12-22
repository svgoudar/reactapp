import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import "./comp.css";
import { wcdata } from './UserFunctions';
import axios from 'axios';
import Tabwc from '../Tables/Tabwc';
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
class Wc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: [],
      pop:null,
      des: null,
      wcPoints: null,
      rFrom: null,
      dateP: null,
      formErrors: {
        wcPoints:"",
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
        --SUBMITTING--
      Recieved From: ${this.state.rFrom}
         
        Descriptiion: ${this.state.des}

        WC Points: ${this.state.wcPoints}
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
     
        case "chalID":
          formErrors.chalID =
            value.length < 2 ? "Enter atleast 2 Characters" : "";
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
    
   const cancelCourse = () => { 
    document.getElementById("test").reset();
    }
   
    const submitButton= () => {
      const okUser = {
      pop: this.state.pop,
      dateP: this.state.dateP,
       des: this.state.des,
       wcPoints: this.state.wcPoints,
       rFrom: this.state.rFrom,
       
      }
      wcdata(okUser).then(res => {
        if(res.data ==="True")
        alert("You Have Successfully Submitted the Form")
       if(res.data === "False"){
        alert("Please Check all the Details")
      }
      })
    //  this.props.history.push('/Navbar')


    };

    return (
      <>
      <div className="wrappers">
        <Nav/>
        <div className="forms">
          <h1>Winner Circle Registration</h1>
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
            <div className="rFrom">
              <label htmlFor="rFrom">Recieved From</label>
              <input
               
                placeholder="Recieved From"
                type="text"
                name="rFrom"
                onChange={this.handleChange}
              />

            </div>
            <div className="wcPoints">
              <label htmlFor="wcPoints"> Winner Circle Points</label>
              <input
                 className={formErrors.wcPoints.length > 2 ? "error" : null}
                placeholder="Points"
                type="text"
                name="wcPoints"
              
                onChange={this.handleChange}
              />
                                  {formErrors.wcPoints.length > 3 && (
                <span className="errorMessage">{formErrors.wcPoints}</span>
              )}
       
                </div>

            <div className="des">
              <label htmlFor="des">Description</label>
              <input
               
                placeholder="Description"
                type="text"
                name="des"
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

               <button type='submit' onClick= {()=>cancelCourse() } >Reset</button></div>
          </form>
        </div>
        <br></br>

         <div className="table">
        <Tabwc/>
        </div>
    </div>
    </>
    );
  }
}

export default Wc;
