import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import 'chart.piecelabel.js';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData2:this.props.chartData
        }
        
    }

    chart(){
        console.log("Chart test", this.state.chartData2)
    }

    render() {
        return(
            <div className="chart">
            {this.chart()}
                <Pie
                    data={this.state.chartData2}
                    
                    width= {200}
                    height={150}
                    options={{
                        legend: {
                            display: false
                        }
                    }}
                />
            </div>
        )
    }
    
}

export default Chart;