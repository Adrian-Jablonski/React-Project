import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import 'chart.piecelabel.js';

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
                <Pie
                    data={this.state.chartData}
                    width= {200}
                    height={150}
                    options={{
                        title: {
                            display: true,
                            text: 'Categories',
                            fontSize: 20
                        },
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 6
                            }
                        }
                    }}
                />
            </div>
        )
    }
    
}

export default Chart;