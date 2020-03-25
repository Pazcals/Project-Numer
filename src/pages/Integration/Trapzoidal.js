import React, { Component } from 'react'
import { Card, Input, Button , Layout} from 'antd';
import 'antd/dist/antd.css';
import {compile} from 'mathjs'
import axios from 'axios'

var Algebrite = require('algebrite')

const {Content} = Layout;

const InputStyle = { //<<=== Input Font Format

    color: "black",
    fontWeight: "bold",
    fontSize: "24px"

};

var I, exact, error;

class Trapzoidal extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: true,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    trapzoidal(a, b) {
        I = ((b-a) / 2) * (this.func(a) + this.func(b))
        exact = this.exactIntegrate(a, b).toFixed(6)
        error = (Math.abs((I-exact) / I) * 100).toFixed(6)
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i=1 ; i<n ; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }

    DataBase = async()=>{
        var response = await axios.get('http://localhost:3001/api/users/showIntegrat').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            lower:response['data'][0]['lower'],
            upper:response['data'][0]['upper'],
        })
        this.trapzoidal(parseInt(this.state.lower), parseInt(this.state.upper));
    }
    render() {
        return(
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>Trapzoidal</h2>
                <Content 
                    onChange={this.handleChange}
                    style={{ 
                    width : "620px",
                    background: "#D2B48C",
                }}
                >

                        <Card
                            title={"Input Value"}
                            bordered={true}
                            style={{ background: "#D1D1D1" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>Lower bound (A)</h2><Input size = "large" name="a" style={InputStyle}></Input>
                            <h2>Upper bound (B)</h2><Input size = "large" name="b" style={InputStyle}></Input><br/><br/>
                            <Button id="submit_button" onClick={

                                ()=>this.trapzoidal(parseInt(this.state.a), parseInt(this.state.b))

                            }
                                style={{ 

                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Submit

                            </Button>

                            <Button id="submit_button" onClick={

                                ()=>this.DataBase()

                            }
                                style={{ 

                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Database

                            </Button>

                        </Card>

                    {this.state.showOutputCard && 

                        <Card>
                            <p style={{fontSize: "24px", color : "black"  }}>
                                Approximate = {I}<br/>
                                Exact = {exact}<br/>
                                Error = {error}%
                            </p>
                        </Card>
                    } 
                </Content>
            </div>
        );
    }
}
export default Trapzoidal