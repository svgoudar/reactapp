import React, { Component } from 'react';
import BarChart from '../../components/LineChart';
// import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import './output.css'

class OutputT extends Component {
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
    axios.get('https://poc100.herokuapp.com/report/tntable_graphdata',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    })
    .then((res) => {
      var x=res.data.months;
      var y=res.data.points;
      var z=res.data.threshold;
      console.log(x,y,z);
      this.setState({
        tableX: x, tableData: y, tableY: z
      }, () => {
        console.log(this.state.tableData, this.state.tableX, this.state.tableY)
      })
    })
  }

  render() {
    console.log(this.state.tableData, this.state.tableX, this.state.tableY)
    const chartDataline = {
      labels: this.state.tableX,
      datasets:[
        {
          label:'TrendNext Points',
          data: this.state.tableData,
          borderColor: 'red',
          fill:'false',
        },
        {
          label:'Threshold Points',
          data: this.state.tableY,
          borderColor: 'green',
            fill:'false',
        },
      ]
    };
    console.log(chartDataline)
    return (
      <div className="wrap">

          <div className="ba">
             <BarChart chartDataline={chartDataline} location="TrendNext" legendPosition="bottom"/>
             </div>
    
      </div>
    
    );
  }
}

export default OutputT;