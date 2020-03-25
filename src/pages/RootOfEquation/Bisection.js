import React, { Component } from 'react'
import { Card, Input, Button, Table, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs'
import Plot from 'react-plotly.js';
import axios from 'axios'

const InputStyle = { //<<=== Input Font Format (use by textbox)

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
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
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
class Bisection extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false,
            moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
    }


    bisection(xl, xr) { //<<============= Function Start at This Point
        fx = this.state.fx; //<========== f(x) Recieve Here 
        var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000); //<====== parseFloat Covert String to Floating-point Number
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }

        do {

            xm = (xl + xr) / 2;
            if (this.func(xm) * this.func(xr) < 0) {
                sum = this.error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }

            }
            else {
                sum = this.error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }

            }

            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } 

        while (Math.abs(sum) > 0.000001); //<<==== Error Check

        this.createTable(data['xl'], data['xr'], data['x'], data['error']); 

        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
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

    DataBase = async()=>{
        var response = await axios.get('http://localhost:3001/api/users/showBisec').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            xl:response['data'][0]['xl'],
            xr:response['data'][0]['xr']
        })
        this.bisection(this.state.xl,this.state.xr);
    }

    //------------------------------------------------------------ข้างล่างเป็นการ render ตารางขึ้นมา------------------------------------------------------------
    

    //---------------------------------Input Box Below--------------------------------
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>Bisection Method</h2>
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
                            <h2>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle}></Input>
                            <h2>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.bisection(parseFloat(this.state.xl) , parseFloat(this.state.xr))
                            }
                                style={{ 
                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Submit

                            </Button>

                            <Button id="submit_button" onClick={
                                () => this.DataBase()
                            }
                                style={{ 
                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Database

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
                                            marker: { color: 'violet' },
                                        },
                                    ]}
                                    layout={{ title: 'Bisection' }}

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
export default Bisection;