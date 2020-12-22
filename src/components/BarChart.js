import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';


class BarChart extends Component{


  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'Dropdown Name'
  }

  render(){
    
    return (
     
        <div>
        <Bar
          data={this.props.chartDatabar}
          options={{
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
              xAxes: [{
                  // Change here
                barPercentage: 0.7
              }]
          },
            title:{
              display:this.props.displayTitle,
              text:'Report : '+this.props.location,
              fontSize:30,
              position: 'left',
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition,
        
            }
            
          }}
        />
        </div>
        
      
    )
  }
}

export default BarChart;
