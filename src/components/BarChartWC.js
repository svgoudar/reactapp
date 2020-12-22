import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';


class BarChartWC extends Component{


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
            title:{
              display:this.props.displayTitle,
              text:'Report : '+this.props.location,
              fontSize:30,
              position: 'left',
            },
            legend:{
              display:false,
              position:this.props.legendPosition,
        
            }
            
          }}
        />
        </div>
        
       
      
    )
  }
}

export default BarChartWC;
