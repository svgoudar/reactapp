import React, { Component } from 'react'
import Nav from '../../../src/nav.js';
import TabTg from '../../datafiles/Tables/TabTg.js';
import OutputTgc from '../../../src/datafiles/Outputs/OutputTgc';
import OutputTgcT from '../../../src/datafiles/Outputs/OutputTgcT.js'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class ReportTgc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      table1:[],
      table2:[]
    }
}

componentWillMount() {

  axios.get('http://poc100.herokuapp.com/report/find_name',{
    headers:{
      'id': sessionStorage.getItem('use'),
      'role': sessionStorage.getItem('user'),
      }
  }).then((res) => 
  { 

 this.setState({table1:res.data.name,table2:res.data.role});
 })
}
    render() {
      return (
          <>
          <div className= "new">
   <Nav/>
   <div className="header" style={{display:'flex'}}><h2 style={{textAlign:'right',fontSize:'35px',fontFamily:'sans-serif',marginTop:'5px',marginBottom:'5px', marginLeft:'320px'}}>TopGear Challenge</h2>
   <h2 style={{textAlign:'right',fontSize:'17px',display:'block',fontFamily:'sans-serif', marginRight:'10px',marginTop:'10px'}}>User: {this.state.table1}</h2>
   </div>
   <div className="header" style={{display:'flex'}}> <h2 style={{textAlign:'right',fontSize:'17px',display:'block',fontFamily:'sans-serif', marginRight:'10px'}}>Role: {this.state.table2}</h2></div>
   <Grid container spacing={0}>
   <Grid item xs={6} style={{padding:'1%'}}>
     <div className="ba">
   <OutputTgc/> </div>
   </Grid>
   <Grid item xs={6} style={{padding:'1%'}}>
   <div><OutputTgcT/></div>
   </Grid>
    </Grid>
   <div className="tables"><TabTg/></div>
   
   </div>

   </>
      )
    }
  }
  
  export default ReportTgc;