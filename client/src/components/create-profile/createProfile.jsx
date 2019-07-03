import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter,Link } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile  } from "../../actions/profileAction";

import TextFieldGroup from '../../common/TextFieldGroup';
import FileFieldGroup from '../../common/FileFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';
import noimage from "../../img/05.jpg";

class CreateProfile extends Component {
    state = { 
        displaySocial:false,
        handle:'',
        avatar:'',
        pimage:'',
        status:'',
        company:'',
        website:'',
        location:'',
        skills:'',
        bio:'',
        youtube:'',
        twitter:'',
        facebook:'',
        errors:{}
     }

     onChange = (e)=> {
      switch (e.target.name) {
        case 'avatar':
           this.setState({
             avatar:e.target.files[0]
           })
          break;
      
        default:
          {this.setState({
            [e.target.name]:e.target.value
          })
       
         }
      }
       
     }

      
     onSocialDisplay = () =>{
         this.setState(sts=>({
             displaySocial:!sts.displaySocial
         }))
     }





     Submit= (e) =>{
        e.preventDefault();
 
        const {avatar,pimage,handle,status,bio,company,website,location,skills,youtube,facebook,twitter} =this.state;
        let data =new FormData();
          data.append('avatar', avatar);
          data.append('handle', handle);
          data.append('status', status);
          data.append('bio', bio);
          data.append('company', company);
          data.append('website', website);
          data.append('location', location);
          data.append('skills', skills);
          data.append('youtube', youtube);
          data.append('facebook', facebook);
          data.append('twitter', twitter);
          data.append('pimage', pimage);

        
        this.props.createProfile(data, this.props.history);
     }

      //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
      componentWillReceiveProps(nextProps) {
            this.setState({
                errors:nextProps.errors
            })
        }


    render() { 
        const { profile } =this.props.profile;
        const {errors, displaySocial} = this.state;
        let val;
        if(profile===null){
          val = 'wait'
        }else{
          
          val = profile.avatar;
         
          this.state.pimage = val

        }
       
        
        // Select options for status
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
      ];
        return ( 
            
            // <!-- Create Profile -->
            <div className="create-profile">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                      Go Back
                    </Link>
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                    <p className="lead text-center">Let's get some information to make your profile stand out</p>
                    <small className="d-block pb-3"><span className='text-danger'>*</span> = required field</small>
                    <form onSubmit={this.Submit} >

                    <FileFieldGroup
                        name='avatar'
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                    type="hidden" 
                    placeholder=''
                    name="pimage" 
                    value={val?val:noimage}
                    />
                    <TextFieldGroup
                        placeholder="* Profile Handle"
                        name="handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL. Your full name, company name, nickname"
                        />

                        <SelectListGroup
                            name='status'
                            value={this.state.status}
                            error={errors.status}
                            onChange={this.onChange}
                            options={options}
                        />
                      
                      <TextFieldGroup
                        placeholder="Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="Could be your own company or one you work for"
                        />
                      <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="Could be your own website or a company one"
                        />
                     <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="City or city & state suggested (eg. Boston, MA)"
                        />
                      <TextFieldGroup
                        placeholder="* Skills"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info="Please use comma separated values (eg.
                            HTML,CSS,JavaScript,PHP"
                        />
                     
                      <TextAreaFieldGroup
                        value={this.state.bio}
                        name='bio'
                        placeholder='little info about you'
                        onChange={this.onChange}
                        error={errors.bio}
                      />
          
                      <div className="mb-3">
                        <button type="button"onClick={this.onSocialDisplay} className="btn btn-light">Add Social Network Links</button>
                        <span className="text-muted" >Optional</span>
                      </div>
          
                      {displaySocial?(<div>
                        <InputGroup
                        placeholder='Facebook Acount URL'
                        name='facebook'
                        value={this.state.facebook}
                        onChange={this.onChange}
                        icon='fa fa-facebook'
                        />
          
                        <InputGroup
                        placeholder='Youtube Channel URL'
                        name='youtube'
                        value={this.state.youtube}
                        onChange={this.onChange}
                        icon='fa fa-youtube'
                        />

                        <InputGroup
                        placeholder='Twitter Acount URL'
                        name='twitter'
                        value={this.state.twitter}
                        onChange={this.onChange}
                        icon='fa fa-twitter'
                        />

                      </div>):null}
          
                      <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
         );
    }
}

CreateProfile.propTypes = {
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    createProfile:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth,
    profile:state.profile,
    errors:state.errors
})
 
export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));