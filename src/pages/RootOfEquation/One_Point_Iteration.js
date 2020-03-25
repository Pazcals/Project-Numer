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

var dataInTable = [] //<<=== ตารางค่าต่างๆ
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
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";

class One_Point_Iteration extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            showOutputCard: false,
            showGraph: false,
        }
        
        this.handleChange = this.handleChange.bind(this); // "opi" = One Point Iteration
        this.one_point_iteration = this.one_point_iteration.bind(this);
    }

    one_point_iteration(x) { //<<============= Function Start at This Point
        fx = this.state.fx; //<========== f(x) Recieve Here 
        //var increaseFunction = false;
        var xn = 0;
        var sum = parseFloat(0.000000); //<====== parseFloat Covert String to Floating-point Number
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []
        
        do {

            xn = x;
            x = this.func(x);
            sum = this.error(x , xn);

            data['x'][n] = x.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } 

        while (Math.abs(sum) > 0.000001); //<<==== Error Check

        this.createTable(data['x'], data['error']); 

        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }

    func(X) { //<=== ตัวต่อ function
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    error(xnew, xold) { //<=== หา ERROR
        return Math.abs((xnew - xold) / xnew);
    }

    createTable(x, error) { //<=== สร้าง Table
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>One Point Iteration Method</h2>
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
                            <h2>X</h2><Input size="large" name="x" style={InputStyle}></Input>

                            {/*<h2>Finish</h2><Input size="large" name="finish" style={InputStyle}></Input><br /><br />*/}

                            <Button id="submit_button" onClick={
                                () => this.one_point_iteration(parseFloat(this.state.x))
                            }
                                style={{ 
                                    marginBlockStart: "4%",
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
                                            marker: { color: 'red' }, 
                                        },
                                    ]}
                                    layout={{ title: 'One Point Iteration' }}

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

export default One_Point_Iteration;