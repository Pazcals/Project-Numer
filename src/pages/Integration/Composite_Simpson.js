import React, { Component } from 'react'
import { Card, Input, Button , Layout} from 'antd';
import 'antd/dist/antd.css';
import {compile} from 'mathjs'

var Algebrite = require('algebrite')

const {Content} = Layout;

const InputStyle = { //<<=== Input Font Format

    color: "black",
    fontWeight: "bold",
    fontSize: "24px"

};

var I, exact, error;

class Composite_Simpson extends Component {
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
    composite_simpson(a, b, n) {
        var h = (b-a)/n
        I = (h / 3) * (this.func(a) + this.func(b) + 4*this.summationFunction(1, n, h) + 2*this.summationFunction(2, n, 2*h))
        exact = this.exactIntegrate(a, b)
        error = Math.abs((exact-I) / exact) * 100
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    summationFunction(start, n, h) {
        var sum = 0
        if (start % 2 === 0) {
            n += 2
        }
        var xi = parseInt(this.state.a) + h
        for (var i=start ; i<n ;) {
            i+=2
            sum += this.func(xi)
            xi = parseInt(this.state.a) + i*h
            alert(i*h)
            
        }
        
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx); //var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
	
    render() {
        return(
            <div style={{ background: "#FFFF", padding: "30px" ,  marginBlockStart: "2%"}}>
                <h2 style={{ color: "black", fontWeight: "bold" ,fontSize :"30px"}}>Composite Simpson</h2>
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
                            <h2>Lower bound (A)</h2><Input size="large" name="a" style={InputStyle}></Input>
                            <h2>Upper bound (B)</h2><Input size="large" name="b" style={InputStyle}></Input><br/><br/>
                            <h2>N</h2><Input size = "large" name="n" style={InputStyle}></Input><br/><br/>
                            <Button id="submit_button" onClick={

                                ()=>this.composite_simpson(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))

                            }
                                style={{ 

                                    background: "#7DBCFB", 
                                    color: "black", 
                                    fontWeight: "bold",
                                    fontSize: "20px" }}>Submit

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
export default Composite_Simpson