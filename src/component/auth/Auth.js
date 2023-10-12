import React,{Component} from 'react'
import { Formik } from 'formik'
import { auth } from '../../redux/AuthActionCreators'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'


const mapDispatchToProps =dispatch=>{
    return{
        auth: (email,password,mode)=>dispatch(auth(email,password,mode))
    }
}

const mapStateToProps=state=>{
    return{
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}


class Auth extends Component{
    state ={
        mode: "Sign Up",

    }
    switchModeHandler=()=>{
        this.setState({
            mode:this.state.mode === "Sign Up" ? "Log In": "Sign Up"
        })
    }
    render(){
        let err = null
        if(this.props.authFailedMsg!==null){
            err = <Alert color='red'>{this.props.authFailedMsg}</Alert>
        }
        let form = (
            <Formik 
                initialValues={
                    {
                        email: "",
                    password: "",
                    passwordConfirm: ""
                }}
                onSubmit={
                    (values)=>{
                        this.props.auth(values.email, values.password, this.state.mode)
                    }
                }

                validate={(values)=>{
                    const errors = {};
                    if(!values.email){
                        errors.email = 'Required'
                    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                        errors.email= "Invalid Email"
                    }

                    if(!values.password){
                        errors.password="Required"
                    }else if(values.password.length<4){
                        errors.password = "At least 4 digiss or characters"
                    }
                    if(this.state.mode === "Sign Up"){
                        if(!values.passwordConfirm){
                            errors.passwordConfirm = 'Required'
                        }else if(values.passwordConfirm!==values.password){
                            errors.passwordConfirm="Password didn't match"
                        }
                    }
                    
                    return errors;
                }}
                
                >
                {({values, handleChange, handleSubmit, errors})=>{
                    <div style={{border:'1px grey solid', padding:"15px", borderRadius:'5px'}} >
                        <button style={{width:"100%", backgroundColor:"D70F64", color:"white"}} className='btn btn-lg' onClick={this.switchModeHandler}>Switch to {this.state.mode="Sign Up"? "Log In": "Sign Up"}</button> <br /> <br />
                        <form onSubmit={handleSubmit}>
                            <input name='email' placeholder='enter your mail' className='form-control' value={values.email} onChange={handleChange} /> <span style={{color:"red"}}>{errors.email} </span> <br />
                            <input name='password' placeholder='enter your pass' className='form-control' value={values.password} onChange={handleChange} /> 
                            <span style={{color:'red'}}>{errors.password}</span>
                            <br />
                            {this.state.mode === "Sign Up" ?
                            <div>
                                <input name='passwordConfirm' placeholder='verify pass' className='form-control'value={values.passwordConfirm} onChange={handleChange}/>
                            <span style={{color:'red'}}>{errors.passwordConfirm}</span>
                            <br />
                            </div> : null}
                            
                            <button type='submit' className='btn btn-success'>{this.state.mode === "Sign Up"? "Sign Up": "Log In"}</button>

                        </form>
                    </div>
                }}
            </Formik>
        )
        return(
            <div>
                {err}
                {form}
           </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);