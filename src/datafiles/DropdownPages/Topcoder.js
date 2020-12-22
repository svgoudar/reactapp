import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import "./comp.css";
import { topcdata } from './UserFunctions';
import axios from 'axios';
import TabTc from '../Tables/TabTc';
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
class Topcoder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: [],
      options: [],
      pop:null,
      cert: null,
      chalTitle: null,
      dateT: null,
      chalID: null,
      formErrors: {
        chalID: "",
        
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

  axios.get('https://poc100.herokuapp.com/list/ddinfo').then( 
    (response) => { 
        var c= response.data.certList; 
        this.setState({options:c});
        
        console.log(c);
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
        Challenge ID: ${this.state.chalID}
         
        Challenge Title: ${this.state.chalTitle}
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
            value.length < 3 ? "Enter 3 or more Digit Challenge ID" : "";
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
    // const SupportPage=() => {
    //     this.props.history.push('/Navbar')
    // };
    const cancelCourse = () => { 
      document.getElementById("test").reset();
      }
    
    const submitButton= () => {
        const okUser = {
        pop: this.state.pop,
        dateT: this.state.dateT,
         chalID: this.state.chalID,
         cert: this.state.cert,
         
        }
        topcdata(okUser).then(res => {
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
          <h1>Topgear Learning Registration</h1>
          <form id="test" onSubmit={this.handleSubmit}>
          <div className="chalID">
              <label htmlFor="chalID">Topgear ID</label>
              <input
                className={formErrors.chalID.length > 3 ? "error" : null}
                placeholder="Challenge ID"
                type="text"
                name="chalID"
                onChange={this.handleChange}
                
              />
                           {formErrors.chalID.length > 3 && (
                <span className="errorMessage">{formErrors.chalID}</span>
              )}
       
            </div>

            <div className="dateT">
              <label htmlFor="dateT" style={{marginTop:"0.4rem"}}>Completion Date</label>
              <input
                placeholder="Start Date"
                type="date"
                name="dateT"
                noValidate
                onChange={this.handleChange}
                
              />
              
            </div>
          <div className='dropdown'>
          
          <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Project Name</label>
           <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
          <Select className="select"
              
               name= 'pop'
               
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

          <div className='dropdown'>
          
          <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Certifications</label>
           <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
          <Select className="select"
              
               name= 'cert'
               
               onChange={this.handleChange}>
       
        { 
        this.state.options.map((c) => {
         
          return(
            <option className="option" value ={c} >
              {
                c
              }
              </option>
          );
          
        } )
       }
      
          </Select>
      </FormControl>
          </div>

            <div className="create">
            <button type='submit' onClick= {()=>submitButton() } >Submit</button></div>
            <div className="ref">
            <button onClick={() => cancelCourse()}>Reset</button></div>
            {/* <div className="homeB"> 
            <button  type='submit' onClick= {()=>SupportPage()} >Home</button>
            
            </div> */}
          </form>
        </div>
                <br></br>
         <div className="table">
        <TabTc/>
        </div>
    </div>
    </>
    );
  }
}

export default Topcoder;
