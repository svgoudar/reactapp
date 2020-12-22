import React, { Component } from 'react'
import axios from 'axios'
// import Grid from '@material-ui/core/Grid';
import './output.css';

class OutputTT extends Component {

    constructor(props) {
        super(props)
        this.state = {
          tableData:[],
          table1:[],
         
        }
    }

    componentWillMount() {
        axios.get('https://poc100.herokuapp.com/report/tntable_thresholdpoints',{
          headers:{
            'id': sessionStorage.getItem('use'),
            'role': sessionStorage.getItem('user'),
            }
        }).then((res) => 
         { 
       
        this.setState({tableData:res.data.threshold_points});
        })
        axios.get('https://poc100.herokuapp.com/report/tntable_points',{
          headers:{
            'id': sessionStorage.getItem('use'),
            'role': sessionStorage.getItem('user'),
            }
        }).then((res) => 
        { 
     
       this.setState({table1:res.data.trendnxt_points});
       })
        
      }
    render() 
    {
      return (
        
          <div className="tabular">
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
            </div>
            </div>
           
      
     
  
        

      )
    }
  }
  
  export default OutputTT;