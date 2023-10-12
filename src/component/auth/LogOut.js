
import React ,{Component}from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../redux/AuthActionCreators'


const mapDispatchToProps =()=>{
    return{
        logOut: ()=>dispatch(logOut())
    }
}

class LogOut extends Component{
    componentDidMount(){
        this.props.logOut()
    }
    render(){
        return(
            <Redirect to="/" />
        )
    }
}

export default connect(null,mapDispatchToProps)(LogOut)