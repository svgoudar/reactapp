import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import "./comp.css";
import { trenddata } from './UserFunctions';
import axios from 'axios';
import TabT from '../Tables/TabT';
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

class Trendnext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: [],
      pop:null,
      options: [],
      topics:null,
      trendScore: null,
      dateT: null,
      formErrors: {
    trendScore: "",
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
        var p= response.data.certList; 
        this.setState({options:p});
        
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
     
      case "trendScore":
        formErrors.trendScore =
          value.length < 1 ? "minimum 1 characaters required" : "";
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
        topics: this.state.topics,
         pop:this.state.pop,
        dateT: this.state.dateT,
        trendScore: this.state.trendScore,
      }
      trenddata(okUser).then(res => {
        if(res.data ==="True")
       alert("You Have Successfully Submitted the Form")
        this.props.history.push('/TrendNext')
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
          <h1>TrendNext Registration</h1>
          <form id="test" onSubmit={this.handleSubmit} noValidate>
            <div className="trendScore">
              <label htmlFor="trendScore">TrendNext Points</label>
              <input
                className={formErrors.trendScore.length > 2 ? "error" : null}
                placeholder="Score"
                type="text"
                name="trendScore"
                noValidate
                onChange={this.handleChange}
              />
                                         {formErrors.trendScore.length > 3 && (
                <span className="errorMessage">{formErrors.trendScore}</span>
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
          
          <label style={{marginTop:'auto',marginBottom:'0.6rem'}}>TrendNext Topics</label>
           <FormControl variant='outlined' outlineBorder='2px' style= {{ backgroundColor: '#d8e5f3', marginRight: '1%'}}>
          <Select className="select"
              
               name= 'topics'
               
               onChange={this.handleChange}>
       
        { 
        this.state.options.map((p) => {
         
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

            



            <div className="create">
            <button type='submit' onClick= {()=>submitButton() } >Submit</button></div>
            <div className="ref">
            <button onClick={() => cancelCourse()}>Reset</button></div>
          </form>
        </div>
                <br></br>
         <div className="table">
        <TabT/>
        </div>
    </div>
    </>
    );
  }
}

export default Trendnext;
