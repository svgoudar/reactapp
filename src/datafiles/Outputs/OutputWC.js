import React, { Component } from 'react';
import BarChartWC from '../../components/BarChartWC';
// import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import './output.css'

class OutputWC extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableX: [],
      tableData: []
    }
  }

  componentDidMount(){
  
    this.getChartData();
  }

  getChartData(){
    axios.get('https://poc100.herokuapp.com/report/wctable_graphdata',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    })
    .then((res) => {
      var x=res.data.months;
      var y=res.data.points;
     
      this.setState({
        tableX: x, tableData: y
      }, () => {
       
      })
    })
  }

  render() {
    
    const chartDatabar = {
      labels: this.state.tableX,
      datasets:[
        {
          label:'Winner Circle Points',
          data: this.state.tableData,
          barPercentage: 1,
          
          backgroundColor:
            'rgba(25, 159, 4, 0.6)'
        }
      ]
    };
   
    return (
      <div className="wrap">

          <div className="ba">
             <BarChartWC chartDatabar={chartDatabar} location="Winner Circle" legendPosition="bottom"/>
             </div>
    
      </div>
    
    );
  }
}

export default OutputWC;