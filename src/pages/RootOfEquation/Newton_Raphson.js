import React, { Component } from 'react'
import { Card, Input, Button, Table, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { range, compile , derivative } from 'mathjs'
import Plot from 'react-plotly.js';
import axios from 'axios'

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
      title: "Error",
      key: "error",
      dataIndex: "error"
    }
  ];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";
class Newton_Raphson extends Component {
    
    constructor() {


        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.newton_raphson = this.newton_raphson.bind(this);
    }

    newton_raphson(xold) { //<<==== this funtion start at here !!

        fx = this.state.fx;
        var xnew = 0;
        var epsilon= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['x'] = []
        data['error'] = []


        do{ 

            xnew = xold - (this.func(xold)/this.funcDiff(xold));
            epsilon = this.error(xnew, xold)

            data['x'][n] =  xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            
            n++;  
            xold = xnew;

        }while(Math.abs(epsilon)>0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
        
    }


    func(X) { //<==== Function x
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }


    funcDiff(X) { //<=== Diff Function
        var expr = derivative(this.state.fx, 'x');
        let scope = {x:parseFloat(X)};
        return expr.eval(scope); 
    }


    error(xnew, xold) {
        return Math.abs((xnew-xold) / xnew);
    }


    createTable(x, error) { //<=== Create Table
        dataInTable = []
        for (var i=0 ; i<x.length ; i++) {
            dataInTable.push({
                iteration: i+1,
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
        var response = await axios.get('http://localhost:3001/api/users/showOnePoint').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            x:response['data'][0]['x']
        })
        this.newton_raphson(this.state.x);
    }
    //------------------------------------------------------------ข้างล่างเป็นการ render ตารางขึ้นมา------------------------------------------------------------

    
    //---------------------------------Input Box Below--------------------------------
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>Newton Raphson Method</h2>
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
                            <h2>X</h2><Input size="large" name="x0" style={InputStyle}></Input>
                            <Button id="submit_button" onClick={
                                () => this.newton_raphson(parseFloat(this.state.x0))
                            }
                                style={{ 
                                    marginBlockStart: "4%",
                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Submit
                                    
                            </Button>

                            <Button id="submit_button" onClick={
                                () => this.DataBase()
                            }
                                style={{ 
                                    marginBlockStart: "4%",
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
                                            marker: { color: 'green' }, 
                                        },
                                    ]}
                                    layout={{ title: 'Newton Rahpson' }}

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
export default Newton_Raphson;