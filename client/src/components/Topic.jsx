import React              from 'react';
import Comments           from './Comments';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class Topic extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.topic && this.state.topicLoaded === true) {
      return (
        <p>Error loading topics. Try again later.</p>
      );
    } else if (!this.state.topic) {
      return (
        <p>Loading topics...</p>
      );
    } else if (this.state.topic.length === 0) {
      return (
        <p>Sorry, no topics are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.topic.title}</h1>
          <p>{this.state.topic.content}</p>
          <p>Topic created by {this.state.topic.authoredBy.username} on {new Date(this.state.topic.createdAt).toLocaleDateString()}</p>
          <Comments topicID={this.state.topic._id} />
          <Link to='/'>Back to All Topics</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.topicsAPI}/${this.props.topicID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({topic       : json});
        this.setState({topicLoaded : true});
      })
      .catch(err => {
        this.setState({topicLoaded: true});
      });
  }

}

export default Topic;
