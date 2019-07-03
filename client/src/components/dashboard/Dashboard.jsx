import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile,deleteAccount } from '../../actions/profileAction';
import Spinner from '../../common/Spinner';
import { Link } from "react-router-dom";
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';



class Dashboard extends Component {


    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick = (e)=>{
        this.props.deleteAccount()
    }

    render() { 
        const {loading, profile } = this.props.profile;
        const {user } = this.props.auth;
    
        let dashContent;
        if(profile === null || loading){
            dashContent = <Spinner/>
        }else{
            if(Object.keys(profile).length > 0){
                dashContent= (
                    <div>
                        <p className="lead text-muted">Welcome{' '}
                          <Link to={`/profile/${profile.handle}`}>
                                {user.name}
                           </Link>
                           
                         </p>
                         <Link to='/edit-image' className='btn btn-default'>
                            Edit your image <i className="fa fa-image text-info"></i>
                        </Link>
                         <ProfileActions/>

                         <Experience experience={profile.experience}/>
                         <Education education={profile.education}/>
                         
                         {/* exp and edu */}
                         <div style={{ marginBottom:'60px'}}>
                            <button onClick={this.onDeleteClick}
                             className="btn btn-danger">Delete My Account</button>

                         </div>
                    </div>
                )
            }else{
                dashContent = <div>
                <p className="lead text-muted">Welcome {user.name}</p>
                <Link to='/edit-image' className='btn btn-light'>
                    Edit your image <i className="fa fa-image text-info"></i>
                </Link>
                <p> no profile</p>
                <Link to='/create-profile' className='btn btn-info'>
                    Create Profile
                </Link>
                
                </div>
            }
            
        }
        return ( 
            <div>
                {dashContent}
            </div>
         );
    }
}
 
Dashboard.propTypes =({
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
})

const mapStateToProps = state=>({
    profile:state.profile,
    loading:state.loading,
    auth:state.auth
})

export default connect(mapStateToProps ,{getCurrentProfile,deleteAccount})(Dashboard);