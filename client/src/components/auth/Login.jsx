import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser } from '../../actions/authAction';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';


class Login extends Component {
  state = { 
    email:'',
    password:'',
    errors:{},
 }

 Change = (e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
 }

 submit = (e) =>{
     e.preventDefault();
     const {email, password} = this.state;
     const loginedUser={
        email:email,
        password:password
     }

     this.props.loginUser(loginedUser);

  }


  componentDidMount() {
    if(this.props.auth.isAuthenicated){
      this.props.history.push('/dashboard')
    }
  }


     //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
     componentWillReceiveProps(nextProps) {
      if(nextProps.errors){
          this.setState({
              errors:nextProps.errors
          })
      }

      if(nextProps.auth.isAuthenicated){
        this.props.history.push('/dashboard')
    }
  }


    render() { 
      const {email, password, errors} = this.state;
        return ( 
            // <!-- Login -->
            <div className="login">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DocConnector account</p>
                    <form onSubmit={this.submit}>
                    
                      <TextFieldGroup
                        value={email}
                        error={errors.email}
                        placeholder="Email" 
                        name="email" 
                        onChange={this.Change} />

                      <TextFieldGroup
                        value={password}
                        error={errors.password}
                        type="password"
                        placeholder="Password" 
                        name="password" 
                        onChange={this.Change} />

                      <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                  </div>
                </div>
              </div>
            </div>          
         );
    }
}
 
Login.propTypes =({
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
})

const mapStateToProps = state=>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps ,{loginUser})(Login);