import React, { Component } from 'react';
import { connect } from "react-redux";
import { registerUser } from '../../actions/authAction';
import PropTypes from 'prop-types';

import { withRouter } from "react-router-dom";
import TextFieldGroup from '../../common/TextFieldGroup';

class Register extends Component {
    state = { 
        name : '',
        email:'',
        password:'',
        password2:'',
        errors:{},
     }

     Change = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
     }

     submit = (e) =>{
         e.preventDefault();
         const {name, email, password, password2} = this.state;
         const newUser={
            name:name,
            email:email,
            password:password,
            password2:password2
         }

        this.props.registerUser(newUser,this.props.history);
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
     }
    render() { 

        const { name, email, password, password2,errors} = this.state;
        return ( 
            // <!-- Register -->
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DocConnector account</p>
                            <form onSubmit = { this.submit}>
                                    <TextFieldGroup
                                        value={name}
                                        error={errors.name}
                                        placeholder="Name" 
                                        name="name" 
                                        onChange={this.Change} />
                                    
                                    <TextFieldGroup
                                        type='email'
                                        value={email}
                                        error={errors.email}
                                        placeholder="Email address" 
                                        name="email" 
                                        onChange={this.Change} />

                                    <TextFieldGroup
                                        value={password}
                                        error={errors.password}
                                        placeholder="Password" 
                                        name="password" 
                                        type="password"
                                        onChange={this.Change} />

                                    <TextFieldGroup
                                        value={password2}
                                        type="password"
                                        error={errors.password2}
                                        placeholder="Confirm Password" 
                                        name="password2" 
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


Register.propTypes =({
    registerUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
})

const mapStateToProps = state=>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps ,{registerUser})(withRouter(Register));