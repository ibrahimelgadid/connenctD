import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
    
    onDeleteComment = (postId, commentId) =>{
        this.props.deleteComment(postId, commentId)
    }

    render() { 
        const {comment, postId, auth} =this.props;
        console.log('comment.text')
        return ( 
            <div className='card card-body mb-3'>
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">profile</a>
                        <br/>
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">
                            {comment.text}
                        </p>
                        {comment.user === auth.user.id?(
                            <button type="button" 
                            
                            onClick={()=>this.onDeleteComment(postId,comment._id)}
                            className="btn btn-danger mr-1">
                            <i className="fa fa-times" />
                        </button> 
                        ):null}
                    </div>
                </div>
            </div>
         );
    }
}

CommentItem.propTypes = {
    comment:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
    auth:PropTypes.object.isRequired,
    deleteComment:PropTypes.func.isRequired
}

const mapStateToProps = state=>({
    auth:state.auth
})
 
export default connect(mapStateToProps,{deleteComment})(CommentItem);