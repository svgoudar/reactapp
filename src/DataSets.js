import React, { Component } from 'react';
import './base.css';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import Grid from '@material-ui/core/Grid';



class DataSets extends Component {
  constructor(){
    super();
    this.state = {
      chartDatabar:{},
      chartDatapie:{},
      chartDataline:{}
    }
  }

  componentWillMount(){
  
    this.getChartData();
  }

  getChartData(){
    // Axios calls here
    this.setState({
      chartDatabar:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets:[
          {
            label:'Goal',
            data:[
              60,
              60,
              60,
              60,
              60,
              60
            ],
            barPercentage: 1,
            
            backgroundColor:
              'rgba(255, 159, 64, 0.6)'
          },
          {
            label:'Achieved',
            data:[
              15,
              25,
              30,
              45,
              75,
              90
            ],
            barPercentage: 1,
            
            backgroundColor:
              'rgba(51, 162, 23, 0.6)'
          }
        ]
      },
      chartDatapie:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets:[
          {
            label:'After 1960',
            data:[
              15,
              25,
              25,
              35,
              75,
              90
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            
          }
        ]
      },
      chartDataline:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets:[
          {
            label:'Year Goal',
            data:[
              200,
              200,
              200,
              200,
              200,
              200
            ],
            borderColor: 'red',
            fill:'false',
          },
          {
            label:'Progress',
            data:[
              10,
              45,
              80,
              155,
              200,
              225
            ],
            borderColor: 'green',
            fill:'false',
            
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
<Grid container spacing={0}>
        <Grid item xs={6} style={{padding:'1%'}}>
        <div className="bars">    
             <BarChart chartDatabar={this.state.chartDatabar} location="TrendNext" legendPosition="bottom"/></div>
        </Grid>
        <Grid item xs={6} style={{padding:'1%'}}>
        <div className="pies">
        <PieChart chartDatapie={this.state.chartDatapie} location="Hackerank" legendPosition="bottom"/></div>
        </Grid>
        <Grid item xs={12} style={{padding:'1%'}}>
        <div className="lines">
        <LineChart chartDataline={this.state.chartDataline} location="Pragati" legendPosition="bottom"/>
        </div>
        </Grid>
        
      </Grid>
        
      </div>
    
    );
  }
}

export default DataSets;
