import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class Comments extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (this.state.isDeleting === true) {
      return (
        <div>
          <h2>Comments</h2>
          <p>Deleting comment...</p>
        </div>
      );
    } else if (!this.state.comments && this.state.commentsLoaded === true) {
      return (
        <div>
          <h2>Comments</h2>
          <p>Error loading comments for this topic. Try again later.</p>
        </div>
      );
    } else if (!this.state.comments) {
      return (
        <div>
          <h2>Comments</h2>
          <p>Loading comments...</p>
        </div>
      );
    } else if (this.state.comments.length === 0) {
      return (
        <div>
          <h2>Comments</h2>
          <p>No comments yet</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Comments</h2>
          <ul>
            {this.state.comments.map(comment => (
              <li key={`comment-${comment._id}`}>
                <p>{comment.content}</p>
                <p>Comment by {comment.authoredBy.username} at {new Date(comment.createdAt).toLocaleDateString()}</p>
                <p><small><a href='#' onClick={() => this.deleteComment(comment._id)}>delete this comment</a></small></p>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }

  getComments(topicID) {
    fetch(urlToCurrentDomain(`${Config.commentsAPI}?forTopic=${topicID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({comments       : json});
        this.setState({commentsLoaded : true});
      })
      .catch(err => {
        this.setState({commentsLoaded: true});
      });
  }

  deleteComment(id) {

    this.setState({isDeleting: true})

    fetch(urlToCurrentDomain(`${Config.commentsAPI}/${id}`), {method: 'DELETE'})
      .then   (() => this.getComments(this.props.topicID))
      .catch  (err => alert(`Failed to delete. Error message was ${err.message || 'None'}. PS. don't use alerts -- this is a lazy example`))
      .finally(() => {
        this.setState({isDeleting: false})
      });
  }

  componentDidMount() {
    this.getComments(this.props.topicID);
  }

}

export default Comments;
