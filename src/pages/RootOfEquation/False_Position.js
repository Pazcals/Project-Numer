
    import React, { Component } from 'react'
    import { Card, Input, Button, Table, Col, Row } from 'antd';
    import 'antd/dist/antd.css';
    import { range, compile } from 'mathjs'
    import Plot from 'react-plotly.js';
    
    const InputStyle = { //<<=== Input Font Format (use by textbox)

        color: "black",
        fontWeight: "bold",
        fontSize: "24px"
    
    };

    var dataInTable = []
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
    class False_Position extends Component {
        
        constructor() {
            super();
            this.state = {
                fx: "",
                xl: 0,
                xr: 0,
                showOutputCard: false,
                showGraph: false
            }
            this.handleChange = this.handleChange.bind(this);
            this.false_position = this.false_position.bind(this);
        }
    
        false_position(xl, xr) {
            fx = this.state.fx;
            var increaseFunction = false;
            var xi = 0;
            var epsilon= parseFloat(0.000000);
            var n=0;
            var data  = []
            data['xl'] = []
            data['xr'] = []
            data['x'] = []
            data['error'] = []
            if (this.func(xl) < this.func(xr)) {
                increaseFunction = true;
            }
            do{ 
                xi = (xl*this.func(xr) - xr*this.func(xl))/(this.func(xr)-this.func(xl));
                if (this.func(xi)*this.func(xr) < 0) {
                    epsilon = this.error(xi,xr);
                    if (increaseFunction) {
                        xl = xi;
                    }
                    else {
                        xr = xi;
                    }
                    
                } 
                else {
                    epsilon = this.error(xi,xl);
                    if (increaseFunction) {
                        xr = xi;  
                    }
                    else {
                        xl = xi;
                    }
                      
                }   
                data['xl'][n] =  xl;
                data['xr'][n] =  xr;
                data['x'][n] =  xi.toFixed(8);
                data['error'][n] = Math.abs(epsilon).toFixed(8);
                n++;  
    
            }while(Math.abs(epsilon)>0.000001);
    
            this.createTable(data['xl'], data['xr'], data['x'], data['error']);
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
        createTable(xl, xr, x, error) {
            dataInTable = []
            for (var i=0 ; i<xl.length ; i++) {
                dataInTable.push({
                    iteration: i+1,
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
    //---------------------------------Input Box Below--------------------------------
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>False Position Method</h2>
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

                                () => this.false_position (parseFloat(this.state.xl) , parseFloat(this.state.xr))
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
                                            marker: { color: 'blue' },
                                        },
                                    ]}
                                    layout={{ title: 'False Position' }}

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

export default False_Position;