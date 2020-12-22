import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component{


  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
 
        <div>
        <Line
          data={this.props.chartDataline}
          options={{
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
            },
            title:{
              display:this.props.displayTitle,
              text:'Report : '+this.props.location,
              fontSize:30,
              position: 'left',
              
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            },
     
          }}
        />
</div>

    )
  }
}

export default LineChart;
