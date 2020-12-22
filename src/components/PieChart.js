import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class PieChart extends Component{
  constructor(props){
    super(props);
    this.state = {

      chartDatapie:props.chartDatapie
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">

<div className="pies">
        <Pie
          data={this.state.chartDatapie}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Report : '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
      </div>
    )
  }
}

export default PieChart;
