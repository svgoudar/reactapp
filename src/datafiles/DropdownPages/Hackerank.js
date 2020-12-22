import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import "./comp.css";
import { hackdata } from './UserFunctions';
import axios from 'axios';
//import DatePicker from 'react-native-datepicker'
//import { Link } from 'react-router-dom';
import Tab from '../Tables/Tab';
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

class Hackerank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pnopt: [],
      mopt:["Contest","Practice"],
      copt: [],
      sopt: [],
      pop:null,
      mod:null,
      skill:null,
      cert:null,
      empName: null,
      dateH: null,
      hScore: null,
      pro:null,
      formErrors: {
        empName: "",
        hScore: "",
      }
    };
  }
  componentDidMount(){
   
    axios.get('http://poc100.herokuapp.com/list/ddinfo',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then( 
      (response) => { 
          var o= response.data.projectList; 
          this.setState({pnopt:o});
     
         
      }, 
      
      (error) => { 
          console.log(error); 
      } 
  );
  
    axios.get('http://poc100.herokuapp.com/list/ddinfo').then( 
      (response) => {
          var q= response.data.certList; 
          this.setState({copt:q});
          
      }, 
      
      (error) => { 
          console.log(error); 
      } 
  );
  
  axios.get('http://poc100.herokuapp.com/list/ddinfo').then( 
    (response) => { 
        var p= response.data.skillList; 
        this.setState({sopt:p});
   
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
        Employee Name: ${this.state.empName}
         
        Hackerank Email: ${this.state.hScore}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
 



  // handleReset = () => {
  //   document.querySelectorAll('input');
  //   this.setState({
  //     pop:'',
  //     mod:'',
  //     skill:'',
  //     cert:'',
  //     empName: '',
  //     dateH: '',
  //     hScore:'',
  //     pro:'',
  //   });
  // };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    

    switch (name) {
     
      case "empName":
        formErrors.empName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "hScore":
        formErrors.hScore = 
        value.length < 2 ? "minimum 2 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
    
  };


  render() {
    const { formErrors } = this.state;

  //   const resets=() => {
  //     let btnClear= document.querySelector('reset');
  //     let inputs= document.querySelector('input');
  //     if(btnClear){
  //       btnClear.addEventListener('click', ()=>{
  //         inputs.forEach(input=> input.value= '');
  //       })
  //     }

  // };

      
  const cancelCourse = () => { 
  document.getElementById("test").reset();
  }

    // const SupportPage=() => {
    //     this.props.history.push('/Navbar')
    // };
    
    const submitButton= () => {
      const okUser = {
        pop: this.state.pop,
        mod: this.state.mod,
        cert: this.state.cert,
        empName: this.state.empName,
        hScore: this.state.hScore,
        dateH: this.state.dateH,
        skill: this.state.skill,
      }
      hackdata(okUser).then(res => {
        if(res.data ==="True")
        alert("You Have Successfully Submitted the Form")
       if(res.data === "False"){
        alert("Please Check all the Details")
        }
      })

    };

    return (
      <>
      <div className="wrappers">
      <Nav/>
        <div className="forms">
          <h1>Hackerank Registration</h1>
          <form id="test" onSubmit={this.handleSubmit} noValidate>
            
            <div className="empName">
           <label htmlFor="empName">Hackerank User ID</label>
              <input
              className={formErrors.empName.length > 0 ? "error" : null}
                placeholder="Hackerank User ID"
                type="text"
                name="empName"
                noValidate
                onChange={this.handleChange}
              />
             {/* {formErrors.empName.length > 0 && (
                <span className="errorMessage">{formErrors.empName}</span>
              )} */}
            </div>
            <div className="hScore">
              <label htmlFor="hScore">Hackerank Score</label>
              <input
              className={formErrors.hScore.length > 0 ? "error" : null}
                placeholder="Score"
                type="text"
                name="hScore"
                noValidate
                onChange={this.handleChange}
              />
             {/* {formErrors.hScore.length > 0 && (
                <span className="errorMessage">{formErrors.hScore}</span>
              )} */}
            </div>

            <div className="dateH">
              <label htmlFor="dateH" style={{marginTop:"0.4rem"}}>Completion Date</label>
              <input
                placeholder="Completion Date"
                type="date"
                name="dateH"
                noValidate
                onChange={this.handleChange}
                
              /> 
              <span></span>
            </div>
           <div className='dropdown'>
          
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Project Name</label>
             <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
            <Select className="select"
               
                 name= 'pop'
                 id="test"
                 onChange={this.handleChange}>
         
          { 
          this.state.pnopt.map((o) => {
           
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
            {/* <FormControl variant='standard' style= {{width:'275px', backgroundColor: 'transparent', marginRight: '1.4%',marginTop:"1rem"}}> */}
            {/* <InputLabel style={{display: 'inline-block',marginBottom:'2rem', fontSize:'21px'}} htmlFor="filled-age-native-simple">Project Name</InputLabel> */}
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Skills</label>
             <FormControl variant='outlined' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
            <Select className="select"
                 id='test'
                 name= 'skill'
                 
                 onChange={this.handleChange}>
         
          { 
          this.state.sopt.map((p) => {
           
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

            <div className='dropdown'>
            {/* <FormControl variant='standard' style= {{width:'275px', backgroundColor: 'transparent', marginRight: '1.4%',marginTop:"1rem"}}> */}
            {/* <InputLabel style={{display: 'inline-block',marginBottom:'2rem', fontSize:'21px'}} htmlFor="filled-age-native-simple">Project Name</InputLabel> */}
            <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>Certifications</label>
             <FormControl variant='outlined' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
            <Select className="select"

                 name= 'cert'
                 id='test'
                 onChange={this.handleChange}>
         
          { 
          this.state.copt.map((q) => {
           
            return(
              <option className="option" value ={q} >
                {
                  q
                }
                </option>
            );
            
          } )
         }
        
            </Select>
        </FormControl>
            </div>
            <div className='dropdown'>
          <label  style={{marginTop:'auto',marginBottom:'0.6rem'}}>Mode</label>
             <FormControl variant='outlined' style= {{backgroundColor: '#d8e5f3', marginRight: '1%'}}>
            <Select className="select"
                 name= 'mod'
                 id='test'
                 onChange={this.handleChange}>
         
          { 
          this.state.mopt.map((t) => {
           
            return(
              <option className="option" value ={t}>
                {
                  t
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
            {/* <div className="ref">
            <button onClick={() => window.location.reload(false)}>Refresh</button></div> */}
            {/* <div className="homeB"> 
            <button  type='submit' onClick= {()=>SupportPage()} >Home</button>
            
            </div> */}
                   <div className="ref">
               <button type='submit' onClick= {()=>cancelCourse() } >Reset</button></div>
            
          </form>
          
        </div>
        <br></br>
         <div className="table">  
        <Tab/>
        </div>
    </div>   
    </>
    );
  }
}

export default Hackerank;
