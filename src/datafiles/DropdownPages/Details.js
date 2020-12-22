import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import "./comp.css";
import { detaildata } from './UserFunctions';
import axios from 'axios';
import TabD from '../Tables/TabD';
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

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: [],
      opt:[],
      res:null,
      pop:null,
      dateFrom: null,
      dateTill: null,
      formErrors: {
        dateFrom: "",
        dateTill: "",
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
  
  axios.get('https://poc100.herokuapp.com/list/resources',{
    headers:{
      'id': sessionStorage.getItem('use'),
      'role': sessionStorage.getItem('user'),
      }
  }).then( 
    (response) => { 
        var p= response.data.resource; 
        this.setState({opt:p});
        
        console.log(p);
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
     
      case "dateFrom":
        formErrors.dateFrom =
          value.length < 1 ? " " : "";
        break;
        case "dateTill":
          formErrors.dateTill =
            value.length < 1 ? " " : "";
          break;
 
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
    
  };



  render() {

   const { formErrors } = this.state;
   
   const cancelCourse = () => { 
    document.getElementById("test").reset();
  }
  
    // const SupportPage=() => {
    //     this.props.history.push('/Navbar')
    // };
    
    const submitButton= () => {
      const okUser = {
        res: this.state.res,
         pop: this.state.pop,
        dateFrom: this.state.dateFrom,
       dateTill: this.state.dateTill,
      }
      detaildata(okUser).then(res => {
      if(res.data ==="True")
      alert("Your Details have been Successfully Submitted")

    else if(res.data === "False"){
      alert("Please Check all the Details")
    }
      })
      //this.props.history.push('/Navbar')

    };

    return (
      <>
      
      <div className="wrappers">
      <Nav/>
        <div className="forms">
          <h1>Assign Details</h1>
          <form id="test" onSubmit={this.handleSubmit}>

          <div className='dropdownT'>
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Resource</label>
             <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
            <Select className="select"
                
                 name= 'res'
                 id="test"
                 onChange={this.handleChange}>
         
          { 
          this.state.opt.map((p) => {
           
            return(
              <option value ={p} >
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
           

          <div className='dropdownT'>
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Project Name</label>
             <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
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
           


            <div className="dateFrom">
              <label htmlFor="dateFrom">Start Date</label>
              <input
                className={formErrors.dateFrom.length > 0 ? "error" : null}
                placeholder="Start Date"
                type="date"
                name="dateFrom"
                noValidate
                onChange={this.handleChange}
                
              />
              
            </div>
            <div className="dateTill">
              <label htmlFor="dateTill">End Date</label>
              <input
                className={formErrors.dateTill.length > 0 ? "error" : null}
                placeholder="End Date"
                type="date"
                name="dateTill"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            

            <div className="create">
            <button type='submit' onClick= {()=>submitButton() } >Submit</button></div>
            {/* <div className="ref">
            <button onClick={() => window.location.reload(false)}>Refresh</button></div> */}
            {/* <div className="homeB"> 
            <button  type='submit' onClick= {()=>SupportPage()} >Home</button>
            
            </div> */}
            <div className="ref">
               <button type='submit' onClick= {()=>cancelCourse() } >Reset</button></div>
          </form>
        </div>
         <div className="table">
        <TabD/>
        </div>
    </div>
    </>
    );
  }
}

export default Details;
