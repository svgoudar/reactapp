import React, { Component } from 'react'
import axios from 'axios'
// import Grid from '@material-ui/core/Grid';
import './output.css';

class OutputTgcT extends Component {

    constructor(props) {
        super(props)
        this.state = {
          tableData:[],
          table1:[],
          table2:[],
          table3:[],
          table4:[],
        }
    }

    componentWillMount() {
      axios.get('https://poc100.herokuapp.com/report/tgctable_highestcashprize',{
        headers:{
          'id': sessionStorage.getItem('use'),
          'role': sessionStorage.getItem('user'),
          }
      }).then((res) => 
       { 
     
      this.setState({tableData:res.data.highest_cashprize});
      })
      axios.get('https://poc100.herokuapp.com/report/tgctable_totalcashprize',{
        headers:{
          'id': sessionStorage.getItem('use'),
          'role': sessionStorage.getItem('user'),
          }
      }).then((res) => 
      { 
   
     this.setState({table1:res.data.total_cashprize});
     })
     axios.get('https://poc100.herokuapp.com/report/tgctable_totaltimes',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then((res) => 
     { 
   
    this.setState({table2:res.data.total_times});
    })
    axios.get('https://poc100.herokuapp.com/report/tgctable_highestpoint',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then((res) => 
     { 
   
    this.setState({table3:res.data.highest_point});
    })
    axios.get('https://poc100.herokuapp.com/report/tgctable_totalpoints',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    }).then((res) => 
    { 
  
   this.setState({table4:res.data.total_points});
   })
    
    }
    render() 
    {
      return (
        
          <div className="tabularTGC">
            <div>
        <h2>
           {this.state.tableData}
           
            </h2>
            <br></br>
            </div>
            <div >
        <h2>
           {this.state.table1}
           
            </h2>
            <br></br>
            </div>
            <div >
        <h2>
          {this.state.table2}
           
            </h2>
            <br></br>
            </div>
            <div >
        <h2>
          {this.state.table3}
           
            </h2>
            <br></br>
            </div>
            <div >
        <h2>
          {this.state.table4}
           
            </h2>
            </div>
            </div>
           

      )
    }
  }
  
  export default OutputTgcT;