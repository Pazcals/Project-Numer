import React, { Component } from 'react'
import { Card, Input, Button, Table, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { range, compile} from 'mathjs'
import Plot from 'react-plotly.js';
import axios from 'axios'

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

class Secant extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            x1: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }

    secant(x0, x1) {
        fx = this.state.fx;
        var x = [], y=0, epsilon = parseFloat(0.000000);
        var n=1, i=1;
        var data  = []
        data['y'] = []
        data['error'] = []
        x.push(x0);
        x.push(x1);
        data['y'][0] = x0;
        data['error'][0] = "---";

        do{ 
            y = x[i] - (this.func(x[i])*((x[i]-x[i-1])))/(this.func(x[i])-this.func(x[i-1]));
            x.push(y);
            epsilon = this.error(y,x[i]);
            data['y'][n]   =   y.toFixed(8);
            data['error'][n] =   Math.abs(epsilon).toFixed(8);
            
            n++;  
            i++;

        }while(Math.abs(epsilon)>0.000001);
        this.createTable(data['y'], data['error']);
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

    error(xnew, xold) {
        return Math.abs((xnew-xold) / xnew);
    }

    createTable(y, error) {
        dataInTable = []
        for (var i=0 ; i<y.length ; i++) {
            dataInTable.push({
                iteration: i+1,
                y: y[i],
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
        this.secant(this.state.xl,this.state.xr);
    }


    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>Secant Method</h2>
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
                            <h2>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                            <h2>X<sub>1</sub></h2><Input size="large" name="x1" style={InputStyle}></Input><br/><br/>

                            <Button id="submit_button" onClick={
                                ()=>this.secant(parseFloat(this.state.x0), parseFloat(this.state.x1))
                            }
                                style={{ 
                                    marginBlockStart: "4%",
                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Submit
                                    
                            </Button>

                            <Button id="submit_button" onClick={
                                ()=>this.DataBase()
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
                                            marker: { color: 'cyan' }, 
                                        },
                                    ]}
                                    layout={{ title: 'Secant' }}

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

export default Secant;