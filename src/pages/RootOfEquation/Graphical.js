import React, { Component } from 'react'
import { Card, Input, Button, Table, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs'
import Plot from 'react-plotly.js';

const InputStyle = { //<<=== Input Font Format

    color: "black",
    fontWeight: "bold",
    fontSize: "24px"

};

var dataInTable;
const columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
      title: "Y",
      key: "y",
      dataIndex: "y"
    }
  ];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";
class Graphical extends Component {
    
    constructor() {
        super();
        this.state = {
            fx: "",
            start: 0,
            finish: 0,
            showOutputCard: false,
            showGraph: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.graphical = this.graphical.bind(this);
    }

    graphical() {
        fx = this.state.fx;
        var data  = []
        data['x'] = []
        data['y'] = []

        console.log(typeof(this.state.start))
        for (var i=parseInt(this.state.start) ; i<=parseInt(this.state.finish) ; i++) {
            data['x'].push(i);
            data['y'].push(this.func(i));
         
        }
        

        this.createTable(data['x'], data['y']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })

        
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    createTable(x, y) {
        dataInTable = []
        for (var i=0 ; i<parseInt(this.state.finish-this.state.start) ; i++) {
            dataInTable.push({
                iteration: i+1,
                x: x[i],
                y: y[i]
            });
        }
    
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //------------------------------------------------------------ข้างล่างเป็นการ render ตารางขึ้นมา------------------------------------------------------------

    
    //---------------------------------Input Box Below--------------------------------
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>Graphical</h2>
                <Row>
                    <Col span={12}>
                        <Card
                            title={"Input Value"}
                            bordered={true}
                            style={{ background: "#D1D1D1" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>Start</h2><Input size="large" name="start" style={InputStyle}></Input>
                            <h2>Finish</h2><Input size="large" name="finish" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))
                            }
                                style={{ 
                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Submit
                                    
                                    </Button>

                        </Card>

{/*--------------------------------Graph Below-------------------------------------*/}

                    </Col>
                    <Col span={12}>
                        
                                <Plot
                                    
                                    data={[
                                        {
                                            x: range(-10, 10, 0.5).toArray(),
                                            y: xValues.map(function (x) {
                                                return compile(fx).eval({ x: x })
                                            }),
                                            type: 'scatter',
                                            marker: { color: 'green' }, 
                                        },
                                    ]}
                                    layout={{ title: 'Graphical' }}

                                    style={{ width: "100%" }}
                                />
                         
                    </Col>

                </Row>

{/*--------------------------------Output Table Below-------------------------------------*/}

                    <Card
                        title={"Output"}
                        bordered={true}
                        style={{ 
                            width: "100%", 
                            background: "#D1D1D1", 
                            color: "#D1D1D1", 
                            float: "inline-start", 
                            marginBlockStart: "2%" }}
                        id="outputCard"
                    >
                        <Table 
                            columns={columns} 
                            dataSource={dataInTable} 
                            bodyStyle={{ 
                                fontWeight: "bold", 
                                fontSize: "18px", 
                                color: "black" }}
                        ></Table>
                    </Card>
            
            </div>
        );
    }
}
export default Graphical;