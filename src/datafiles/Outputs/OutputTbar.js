import React, { Component } from 'react';
import BarChart from '../../components/BarChart';
// import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import './output.css'

class OutputTbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableX: [],
      tableData: [],
      tableY: [],
    }
  }

  componentDidMount(){
  
    this.getChartData();
  }

  getChartData(){
    axios.get('https://poc100.herokuapp.com/report/tntable_percentgraph',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    })
    .then((res) => {

      var x=res.data.labels;
      var y=res.data.completion;
      var z=res.data.incompletion;
      
      console.log(x,y);
      
      this.setState({
        tableX: x, tableData: y, tableY: z,
      }, () => {
        console.log(this.state.tableData, this.state.tableX)
      })
    })
  }

  render() {
    console.log(this.state.tableData, this.state.tableX)
    const chartDatabar = {
      labels: this.state.tableX,
      datasets:[
        {
          label:'% Completed',
          data: this.state.tableData,
          barPercentage: 1,
          
          backgroundColor:
            'rgba(255, 15, 64, 0.6)'
        },
        {
          label:'% Incompleted',
          data: this.state.tableY,
          barPercentage: 1,
          
          backgroundColor:
            'rgba(51, 1, 23, 0.6)'
        },
      ]
    };
    console.log(chartDatabar)
    return (
      <div className="wrap">

          <div className="ba">
             <BarChart chartDatabar={chartDatabar} location="TrendNext" legendPosition="bottom"/>
             </div>
    
      </div>
    
    );
  }
}

export default OutputTbar;