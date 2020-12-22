import React, { Component } from 'react'
import axios from 'axios'
// import Grid from '@material-ui/core/Grid';
import './output.css';

class OutputWCT extends Component {

    constructor(props) {
        super(props)
        this.state = {
          tableData:[],
          table1:[],
          table2:[],
        }
    }

    componentWillMount() {
        axios.get('https://poc100.herokuapp.com/report/wctable_totalpoints',{
          headers:{
            'id': sessionStorage.getItem('use'),
            'role': sessionStorage.getItem('user'),
            }
        }).then((res) => 
         { 
       
        this.setState({tableData:res.data.total_points});
        })
        axios.get('https://poc100.herokuapp.com/report/wctable_totaltimes',{
          headers:{
            'id': sessionStorage.getItem('use'),
            'role': sessionStorage.getItem('user'),
            }
        }).then((res) => 
        { 
     
       this.setState({table1:res.data.total_times});
       })
       axios.get('https://poc100.herokuapp.com/report/wctable_highest_point',{
        headers:{
          'id': sessionStorage.getItem('use'),
          'role': sessionStorage.getItem('user'),
          }
      }).then((res) => 
       { 
     
      this.setState({table2:res.data.highest_point});
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
            <br></br>
            </div>
            <div >
        <h2>
          {this.state.table2}
           
            </h2>
            </div>
            </div>
           
      
     
  
        

      )
    }
  }
  
  export default OutputWCT;