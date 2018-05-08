import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }
    
    render() {
        return(
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    // width= {400}
                    // height={50}
                    options={{
                        title: {
                            display: true,
                            text: 'Categories',
                            fontSize: 20
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                barPercentage: 0.7
                            }]
                        }
                    }}
                />
            </div>
        )
    }
    
}

export default Chart;