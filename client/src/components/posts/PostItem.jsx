import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import noimage from "../../img/noimage.png";
import { deletePost,addLike,addDisLike } from "../../actions/postActions";

class PostItem extends Component {

  onDeletePost = (id) =>{
    this.props.deletePost(id)
  }

  onAddLike = (id) =>{
    this.props.addLike(id)
  }

  onAddDisLike = (id) =>{
    this.props.addDisLike(id)
  }

  findUserLike = (likes) =>{
    const {auth} =this.props;
    if(likes.filter(like=>like.user === auth.user.id).length>0){
      return true
    }else{
      return false
    }
  }

  findUserDisLike = (dislikes) =>{
    const {auth} =this.props;
    if(dislikes.filter(dislike=>dislike.user === auth.user.id).length>0){
      return true
    }else{
      return false
    }
  }


  render() {
    const { post} = this.props;
    const { user} = this.props.auth;
    let image;
    if(post.avatar ===''||post.avatar ===undefined ){
      

        image=noimage
       
      }else{
        image = 'http://localhost:5000/images/' + post.user + '/'+ post.avatar
      }

  const {showActions} = this.props;
    return (
          <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <Link to="/profile">
                    <img style={{height:50, width:50}} className="rounded-circle  d-md-block" src={image}
                      alt="" />
                  </Link>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>

        {showActions?<div className="actions">
                  <button type="button"
                    className="btn btn-light mr-1"
                    onClick={()=>this.onAddLike(post._id)}>
                  
                    <i className={classnames(" fa fa-thumbs-up",{
                      'text-info':this.findUserLike(post.likes)
                    })}></i>
                    <span  className="badge badge-light">{post.likes.length}</span>
                  </button>


                  <button  type="button" 
                    className="btn btn-light mr-1"
                    onClick={()=>this.onAddDisLike(post._id)}>
                    <i className={classnames(" fa fa-thumbs-down",{
                      'text-info':this.findUserDisLike(post.dislikes)
                    })}></i>
                    <span  className="badge badge-light">{post.dislikes.length}</span>
                  </button>


                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === user.id?(
                    <button type="button" 
                    
                    onClick={()=>this.onDeletePost(post._id)}
                    className="btn btn-danger mr-1">
                    <i className="fa fa-times" />
                  </button> 
                  ):null}
                   </div>:null}

                   
                </div>
              </div>
            </div>
    );
  }
}



PostItem.propTypes = {
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deletePost:PropTypes.func.isRequired,
    addLike:PropTypes.func.isRequired,
    addDisLike:PropTypes.func.isRequired
};

PostItem.defaultProps={
  showActions:true
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile:state.profile
});

export default connect(mapStateToProps, 
  {addDisLike,deletePost,addLike
})(
  PostItem
);