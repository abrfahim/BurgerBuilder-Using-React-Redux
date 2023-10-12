
import React, { Component } from 'react'
import Header from './header/Header'
import BurgerBuilder from './burgerBuilder/BurgerBuilder'
import { Route, Switch, Redirect } from 'react-router-dom'
import Orders from './order/Orders'
import CheackOut from './order/checkOut/CheackOut'

import Auth from './auth/Auth'
import { connect } from 'react-redux'
import { authCheck } from '../redux/AuthActionCreators'
import LogOut from './auth/LogOut'

const mapStateToProps =(state)=>{
    return{
      token: state.token
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      authCheck: ()=>dispatch(authCheck())
    }
}

class Main extends Component{
  componentDidMount(){
    this.props.authCheck();
  }
  render(){
    let routes = null;
    if(this.props.token === null){
      routes = (
        <Switch>
          <Route path='/login' element={Auth}/>
          <Redirect to="/login"/>
        </Switch>
      )
    }else{
      routes = (
        <Switch>
            <Route path='/orders' element={Orders}/>
            <Route path='/checkout' element={CheackOut}/>
            <Route path='/logout' element={LogOut}/>
            <Route path='/' exact element={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <div>
          <Header/>
          <div className="container">
            {routes}
          </div>
  
      </div>
    )
  }
  }
 

export default connect(mapStateToProps, mapDispatchToProps)(Main)