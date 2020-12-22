import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import "./comp.css";
import { topgdata } from './UserFunctions';
import axios from 'axios';
import TabTg from '../Tables/TabTg';
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
class Topgear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: [],
      options: [],
      cert:null,
      pop:null,
      topID: null,
      topTitle: null,
      dateH: null,
      cash: null,
      points: null,
      formErrors: {
        topID: "",
        
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
        Challenge ID: ${this.state.topID}
         
        Challenge Title: ${this.state.topTitle}
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
     
        case "topID":
          formErrors.topID =
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
   const cancelCourse = () => { 
    document.getElementById("test").reset();
    }
    
    const submitButton= () => {
        const okUser = {
        pop: this.state.pop,
        dateH: this.state.dateH,
         topID: this.state.topID,
         topTitle: this.state.topTitle,
        cert: this.state.cert,
        cash: this.state.cash,
        points: this.state.points,
         
        }
        topgdata(okUser).then(res => {
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
          <h1>Topgear Challenge Registration</h1>
          <form id="test" onSubmit={this.handleSubmit}>

            <div className="topID">
              <label htmlFor="topID">Topgear ID</label>
              <input
                className={formErrors.topID.length > 3 ? "error" : null}
                placeholder="Challenge ID"
                type="text"
                name="topID"
                onChange={this.handleChange}
                
              />
                           {formErrors.topID.length > 3 && (
                <span className="errorMessage">{formErrors.topID}</span>
              )}
       
            </div>
            <div className="topTitle">
              <label htmlFor="topTitle">Challenge Title</label>
              <input
               
                placeholder="Title"
                type="text"
                name="topTitle"
                onChange={this.handleChange}
              />
   
            </div>

            <div className="points">
              <label htmlFor="points">Challenge Points</label>
              <input
              
                placeholder="Challenge Points"
                type="text"
                name="points"
                onChange={this.handleChange}
                
              />
                           {/* {formErrors.chalID.length > 3 && (
                <span className="errorMessage">{formErrors.chalID}</span>
              )} */}
       
            </div>

            
            <div className="cash">
              <label htmlFor="cash">Cash Reward</label>
              <input
      
                placeholder="Reward Amount"
                type="text"
                name="cash"
                onChange={this.handleChange}
                
              />
                           {/* {formErrors.chalID.length > 3 && (
                <span className="errorMessage">{formErrors.chalID}</span>
              )} */}
       
            </div>

            <div className='dropdowndiff'>
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Project Name</label>
             <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '5%'}}>
            <Select className="select"
                
                 name= 'pop'
                 id="test"
                 onChange={this.handleChange}>
         
          { 
          this.state.option.map((o) => {
           
            return(
              <option value ={o} >
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
            <div className='dropdowndiff'>
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Certifications</label>
             <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
            <Select className="select"
                
                 name="cert"
                 id="test"
                 onChange={this.handleChange}>
         
          { 
          this.state.options.map((c) => {
           
            return(
              <option value ={c} >
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

            <div className="dateH">
              <label htmlFor="dateH" style={{marginLeft:'.5rem'}}>Completion Date</label>
              <input
              style={{marginBottom:'0.1rem',marginLeft:'.45rem', width:'102%'}}
                placeholder="Start Date"
                type="date"
                name="dateH"
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
        <TabTg/>
        </div>
    </div>
    </>
    );
  }
}

export default Topgear;
