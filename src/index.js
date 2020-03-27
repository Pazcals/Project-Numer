import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon} from 'antd';

import SubMenu from 'antd/lib/menu/SubMenu';
import 'antd/dist/antd.css';

/* --------------------------------- File Import ------------------------------------------- */
import Bisection from './pages/RootOfEquation/Bisection' 
import One_Point_iteration from './pages/RootOfEquation/One_Point_Iteration'
import False_Position from './pages/RootOfEquation/False_Position'
import Newton_Raphson from './pages/RootOfEquation/Newton_Raphson'
import Secant from './pages/RootOfEquation/Secant'
import Cramer from './pages/LinearAlgebra/Cramer'

import Backward_1 from './pages/Differentiation/Backward_1'
import Backward_2 from './pages/Differentiation/Backward_2'
import Central_1 from './pages/Differentiation/Central_1'
import Central_2 from './pages/Differentiation/Central_2'
import Forward_1 from './pages/Differentiation/Foward_1'
import Forward_2 from './pages/Differentiation/Foward_2'

import Simpson from './pages/Integration/Simpson'
import Composite_Simpson from './pages/Integration/Composite_Simpson'
import Trapzoidal from './pages/Integration/Trapzoidal'
import Composite_Trapzoidal from './pages/Integration/Composite_Trapzoidal'


const { Content, Sider } = Layout;

class Index extends React.Component {
  SubmenuKeys = ['u1','u2','u3','u4','u5'];
  constructor(props) {
    super(props)

    this.state = {
      openKeys: [''],
    }

  }
  
  render() {
    return (
      <Router>
        <Layout>
          <Sider width = {250} 
            style= {{ 
              background : "#BDBDBD" , 
              overflow : 'auto',
              height: '130vh'
             }} >

            <div className="logo" />
            
            <Menu theme="light" mode="inline" style={{ background: "#BDBDBD" }}>

              <SubMenu key="u1"
                title={

                  <span>
                    <Icon type="calculator"/>Root of equation
                  </span>

                }>
                  <Menu.Item key="bisection_bttn">Bisection  <Link to="/bisection" />  </Menu.Item> 
                  <Menu.Item key="false_position_bttn">False Position  <Link to="/false_position" />  </Menu.Item>
                  <Menu.Item key="onepoint_iteration_bttn">One Point Iteration  <Link to="/one_point_iteration" />  </Menu.Item>
                  <Menu.Item key="newton_raph_bttn">Newton Raphson  <Link to="/newton_raphson" />  </Menu.Item>
                  <Menu.Item key="secant_bttn">Secant Method <Link to="/secant" /> </Menu.Item>

              </SubMenu>
            </Menu>


            <Menu theme="light" mode="inline" style={{ background: "#BDBDBD" }}>
              <SubMenu key="u2" title={

                <span>
                  <Icon type="appstore" />Linear Algebra
                </span>

              }>
                  <Menu.Item key="graphical_btn">Cramer's Rule <Link to="/cramer" /> </Menu.Item>
                  <Menu.Item key="bisection_btn">Gauss's Elimination</Menu.Item>
                  <Menu.Item key="false_btn">Gauss Jordan Method</Menu.Item>
                  <Menu.Item key="onepoint_btn">Matrix Inversion</Menu.Item>
                  <Menu.Item key="newton_btn">LU Decomposition</Menu.Item>
                  <Menu.Item key="secant_btn">Cholesky Decomposition</Menu.Item>
                  <Menu.Item key="secant_btn">Jacobi Iteration Method</Menu.Item>
                  <Menu.Item key="secant_btn">Gauss Seidel Iteration Method</Menu.Item>
                  <Menu.Item key="secant_btn">Conjugate Gradient Method</Menu.Item>

              </SubMenu>
            </Menu>

            <Menu theme="light" mode="inline" style={{ background: "#BDBDBD" }}>
              
              <SubMenu key="u3" title={

                <span>
                  <Icon type="stock" />Interpolation
                </span>

              }>
                  <Menu.Item key="graphical_btn">Newton Divided-Difference</Menu.Item>
                  <Menu.Item key="bisection_btn">Lagrange</Menu.Item>
                  <Menu.Item key="false_btn">Spline</Menu.Item>

              </SubMenu>
            </Menu>

            <Menu theme="light" mode="inline" style={{ background: "#BDBDBD" }}>
              
              <SubMenu key="u4" title={

                <span>
                  <Icon type="stock" />Integration
                </span>

              }>
                  <Menu.Item key="simpson_btt">Simpson  <Link to="/simpson" /> </Menu.Item>
                  <Menu.Item key="com_simpson_btt">Composite Simpson <Link to="/com_simpson" />  </Menu.Item>
                  <Menu.Item key="trapzoidal_btt">Trapzoidal <Link to="/trapzoidal" /></Menu.Item>
                  <Menu.Item key="com_trapzoidal_btt">Composite Trapzoidal <Link to="/com_trapzoidal" /> </Menu.Item>

              </SubMenu>
            </Menu>


            <Menu theme="light" mode="inline" style={{ background: "#BDBDBD" }}>
              
              <SubMenu key="u5" title={

                <span>
                  <Icon type="stock" />Differentiation
                </span>

              }>
                  <Menu.Item key="bw_btt">Backward Divided-Differences O(h) <Link to="/bwd_1" /> </Menu.Item>
                  <Menu.Item key="bw2_btt">Backward Divided-Differences O(h<sup>2</sup>) <Link to="/bwd_2" /> </Menu.Item>

                  <Menu.Item key="ct_btt">Central Divided-Differences O(h<sup>2</sup>) <Link to="/ctl_1" /> </Menu.Item>
                  <Menu.Item key="ct2_btt">Central Divided-Differences O(h<sup>4</sup>) <Link to="/ctl_2" /> </Menu.Item>

                  <Menu.Item key="fw_btt">Forward Divided-Differences O(h) <Link to="/fwd_1" /> </Menu.Item>
                  <Menu.Item key="fw2_btt">Forward Divided-Differences O(h<sup>2</sup>) <Link to="/fwd_2" /> </Menu.Item>

              </SubMenu>
            </Menu>

          </Sider>


          
            <Content style={{  margin: '24px 16px 0', height: '100%'  }}>

              <Route path="/bisection" component = {Bisection} />
              <Route path="/one_point_iteration" component = {One_Point_iteration} />
              <Route path="/false_position" component = {False_Position} />
              <Route path="/newton_raphson" component = {Newton_Raphson} />
              <Route path="/secant" component = {Secant} />
              <Route path="/cramer" component = {Cramer} />

              <Route path="/bwd_1" component = {Backward_1} />
              <Route path="/bwd_2" component = {Backward_2} />
              <Route path="/ctl_1" component = {Central_1} />
              <Route path="/ctl_2" component = {Central_2} />
              <Route path="/fwd_1" component = {Forward_1} />
              <Route path="/fwd_2" component = {Forward_2} />

              <Route path="/simpson" component = {Simpson} />
              <Route path="/com_simpson" component = {Composite_Simpson} />
              <Route path="/trapzoidal" component = {Trapzoidal} />
              <Route path="/com_trapzoidal" component = {Composite_Trapzoidal} />

            </Content>
          </Layout>
      </Router>

    )
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));