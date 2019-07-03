import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setCurrentUser,logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileAction";
import setAuthToken from "./utilis/setAuthToken";
import store from './store';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from "./common/PrivateRoute";
import CreateProfile from './components/create-profile/createProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credetials/AddExperience';
import AddEducation from './components/add-credetials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if(localStorage.userToken){
  setAuthToken(localStorage.userToken);
  let decode = jwt_decode(localStorage.userToken);
  store.dispatch(setCurrentUser(decode));

  let currentTime = Date.now()/1000;
  if(decode.exp < currentTime){
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser);

    window.location.href = '/login';
  }

}



class App extends Component {
  render() {
    return (
      
      <Router>
          <div >
            <Navbar/>
            <Route exact path='/' component={Landing}/>
            <div className="container">
              <Route exact path='/profiles' component={Profiles}/>
              <Route exact path='/profile/:handle' component={Profile}/>
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard}/>
              </Switch>
              
              <Switch>
                <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path='/add-experience' component={AddExperience}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-education' component={AddEducation}/>
              </Switch>
              
              <Switch>
                <PrivateRoute exact path='/feed' component={Posts}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/post/:id' component={Post}/>
              </Switch>
             
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
            </div>
            <Footer/>
          </div>
        </Router>
    );
  }
}


export default App;