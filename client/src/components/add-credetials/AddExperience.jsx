import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaGroupField from '../../common/TextAreaFieldGroup';
import { addExperience } from "../../actions/profileAction";

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            company:'',
            title:'',
            from:'',
            to:'',
            location:'',
            current:false,
            description:'',
            errors:{},
            disabled:false
         }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    onSubmit = (e) =>{
        e.preventDefault();
        const {company, location, description, title, from, to} = this.state;
        const experienceData = {
            title,
            company,
            location,
            description,
            from,
            to
        }
        this.props.addExperience(experienceData,this.props.history)
    }

    onCheck = (e)=>{
        this.setState({
            disabled:!this.state.disabled,
            current:!this.state.current
        })
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({
               errors: nextProps.errors
            })
        }
    }

    render() { 
        const { errors,company, current, description, disabled, location,from, title, to} = this.state;

        return ( 
            <div className = 'add-experience'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className='btn btn-light'>
                                Go Back
                            </Link>

                            <h1 className="display-4 text-center">Add Experience</h1>

                            <p className="lead text-center">
                                Add any job or position that you have had in the past or current.
                            </p>

                            <small className="d-block pb-3">
                                <span className="text-danger">* </span>
                                required files
                            </small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Company name"
                                    name='company'
                                    value={company}
                                    error={errors.company}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="* Job Title"
                                    name='title'
                                    value={title}
                                    error={errors.title}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="Location"
                                    name='location'
                                    value={location}
                                    error={errors.location}
                                    onChange={this.onChange}
                                />
                                <h5>From Date</h5>
                                <TextFieldGroup
                                    placeholder="from"
                                    name='from'
                                    type='date'
                                    value={from}
                                    error={errors.from}
                                    onChange={this.onChange}
                                />

                                <h5>To Date</h5>
                                <TextFieldGroup
                                    placeholder="to"
                                    name='to'
                                    type='date'
                                    value={to}
                                    error={errors.to}
                                    onChange={this.onChange}
                                    disabled={disabled  ? 'disabled' : ''}
                                />

                                <div className="form-check mb-4">
                                    <input 
                                        name='current' 
                                        type="checkbox" 
                                        className="form-check-input"
                                        value={current}
                                        checked={current}
                                        onChange={this.onCheck}
                                        id='current'
                                    />

                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                    <TextAreaGroupField
                                        placeholder='Job description'
                                        name='description'
                                        value={description}
                                        onChange={this.onChange}
                                        error={errors.description}
                                        info='Tell us about the position'
                                    />
                                    <input 
                                        type="submit" 
                                        value="Submit" 
                                        className='btn btn-info btn-block mt-4'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

AddExperience.propTypes = {
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    addExperience:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    profile:state.profile,
    errors:state.errors,
})
 
export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience));