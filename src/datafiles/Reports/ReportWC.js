import React, { Component } from 'react'
import Nav from '../../../src/nav.js';
import Tabwc from '../../../src/datafiles/Tables/Tabwc.js';
import OutputWC from '../../../src/datafiles/Outputs/OutputWC';
import OutputWCT from '../../../src/datafiles/Outputs/OutputWCT.js'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class ReportWC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      table1:[],
      table2:[]
    }
}

componentWillMount() {

  axios.get('https://poc100.herokuapp.com/report/find_name',{
    headers:{
      'id': sessionStorage.getItem('use'),
      'role': sessionStorage.getItem('user'),
      }
  }).then((res) => 
  { 
 //   console.log(sessionStorage.getItem('use'),sessionStorage.getItem('user'));
 this.setState({table1:res.data.name,table2:res.data.role});
 console.log(this.state.table2,this.state.table1);
 })
}
    render() {
      return (
          <>
          <div className= "new">
   <Nav/>
   <div className="header" style={{display:'flex'}}><h2 style={{textAlign:'right',fontSize:'35px',fontFamily:'sans-serif',marginBottom:'5px',marginTop:'5px', marginLeft:'220px'}}>Winner Circle</h2>
   <h2 style={{textAlign:'right',fontSize:'17px',display:'block',fontFamily:'sans-serif', marginRight:'10px',marginTop:'5px'}}>User: {this.state.table1}</h2>
   </div>
   <div className="header" style={{display:'flex'}}> <h2 style={{textAlign:'right',fontSize:'17px',display:'block',fontFamily:'sans-serif', marginRight:'10px'}}>Role: {this.state.table2}</h2></div>
   <Grid container spacing={0}>
   <Grid item xs={6} style={{padding:'1%'}}>
     <div className="ba">
   <OutputWC/></div>
   </Grid>
   <Grid item xs={6} style={{padding:'1%'}}>
   <div><OutputWCT/></div>
   </Grid>
    </Grid>
   <div className="tables"><Tabwc/></div>
   </div>

   </>
      )
    }
  }
  
  export default ReportWC;