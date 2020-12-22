import React, { Component } from 'react';
import BarChart from '../../components/BarChart';
// import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import './output.css'

class OutputTgc extends Component {
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
    axios.get('https://poc100.herokuapp.com/report/tgctable_graphdata',{
      headers:{
        'id': sessionStorage.getItem('use'),
        'role': sessionStorage.getItem('user'),
        }
    })
    .then((res) => {

      var x=res.data.months;
      var y=res.data.points;
      var z=res.data.cash;
      
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
          label:'Points',
          data: this.state.tableData,
          barPercentage: 1,
          
          backgroundColor:
            'rgba(255, 159, 64, 0.6)'
        },
        {
          label:'Cash Prize',
          data: this.state.tableY,
          barPercentage: 1,
          
          backgroundColor:
            'rgba(51, 162, 23, 0.6)'
        },
      ]
    };
    console.log(chartDatabar)
    return (
      <div className="wrap">

          <div className="ba">
             <BarChart chartDatabar={chartDatabar} location="TopGear Challenge" legendPosition="bottom"/>
             </div>
    
      </div>
    
    );
  }
}

export default OutputTgc;