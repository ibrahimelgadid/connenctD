import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import { getPost } from "../../actions/postActions";
import Spinner from "../../common/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getPost(id)
    }
    
    render() { 
        const {post, loading } = this.props.post;
        let postContent;

        if(post===null || loading|| Object.keys(post).length ===0){
            postContent = <Spinner/>
        }else{
            
            postContent = (
                <div>
                    <PostItem showActions={false}  post={post}/>
                    <CommentForm postId={post._id}/>
                    <CommentFeed comments ={post.comments} postId={post._id}/>
                </div>
        )
        }
        return ( 
            <div className='post'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to ='/feed' className='btn btn-light mb-3'>
                                Go Back
                            </Link>
                        </div>
                    </div>
                </div>
                {postContent}
            </div>
         );
    }
}

Post.propTypes = {
    auth:PropTypes.object.isRequired,
    post:PropTypes.object.isRequired,
    getPost:PropTypes.func.isRequired
}

const mapStateToProps = state=> ({
    auth:state.auth,
    post:state.post
})
 
export default connect(mapStateToProps,
{getPost}
)(Post);