import React,{Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import { clearCurrentProfile,getCurrentProfile } from "../../actions/profileAction";
import noimage from '../../img/noimage.png'



class Navbar extends Component {

componentDidMount() {
  this.props.getCurrentProfile()
}
  logOut = (e)=>{
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

    render() { 
      const { isAuthenicated, user} = this.props.auth;
      const { profile, loading} = this.props.profile;
      let image;

      if(profile == null || loading ){
        image=noimage
        }else{
          if(Object.keys(profile).length > 0){
            if(profile.avatar !== undefined || profile.avatar !==''){
              image = image = 'http://localhost:5000/images/' + user.id + '/'+ profile.avatar
            }else{
              image=noimage
            }
          }else{
            image=noimage
          }
        }
            
         
      
      
     
        return ( 
            // <!-- Navbar -->
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
                <Link className="navbar-brand" to="/">DocConnector</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                  <span className="navbar-toggler-icon"></span>
                </button>
          
                <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/profiles"> Doctors
                      </Link>
                    </li>
                  </ul>
          
                  {!isAuthenicated?(<ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Sign Up{' '}<i className="fa fa-sign"></i></Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login{' '}<i className="fa fa-sign-in"></i></Link>
                    </li>
                    
                  </ul>):
                  (<ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/feed">
                        Post Feed
                      </Link>
                    </li>
                  <li className="nav-item">
                    <Link to="/dashboard">
                      <img src={image} className='noimage' alt=""/> 
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="" onClick={this.logOut}>Logout 
                    
                      {' '}<i className="fa fa-sign-out"></i>
                    </a>
                  </li>
                </ul>)
                }
                </div>
              </div>
            </nav>
         );
    }
}

Navbar.propTypes = {
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  auth: state.auth,
  profile:state.profile
})
 
export default connect(mapStateToProps,{getCurrentProfile, logoutUser, clearCurrentProfile} )(Navbar);