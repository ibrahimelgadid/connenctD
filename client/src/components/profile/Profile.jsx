import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from "../../actions/profileAction";
import Spinner from '../../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';


class Profile extends Component {
    state = {  }
    componentDidMount() {
        const{handle} = this.props.match.params;
        if (handle) {
            this.props.getProfileByHandle(handle);
          }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profileSHow === null && this.props.profile.loading) {
          this.props.history.push('/not-found');
        }
      }
    render() { 


    const { profileShow, loading } = this.props.profile;
    let profileContent;

    if (profileShow === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
            <ProfileHeader profile={profileShow} />
            <ProfileAbout profile={profileShow} />
            <ProfileCreds
                education={profileShow.education}
                experience={profileShow.experience}
            />
          
        </div>
      );
    }
        return ( 
            <div className="profile">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {profileContent}
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 




Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile
  });
  
  export default connect(mapStateToProps,
     { getProfileByHandle }
    )(Profile);