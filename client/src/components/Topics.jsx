import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Topics extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.topics && this.state.topicsLoaded === true) {
      return (
        <p>Error loading topics. Try again later.</p>
      );
    } else if (!this.state.topics) {
      return (
        <p>Loading topics...</p>
      );
    } else if (this.state.topics.length === 0) {
      return (
        <p>Sorry, no topics are available</p>
      );
    } else {
      return (
        <div>
          <h1>Topics</h1>
          <ul>
            {this.state.topics.map(topic => (
              <li key={`topic_${topic._id}`}><Link to={`/topic/${topic._id}`}>{topic.title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-topic'>Add a new Topic</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.topicsAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({topics       : json});
        this.setState({topicsLoaded : true});
      })
      .catch(err => {
        this.setState({topicsLoaded: true});
      });
  }

}

export default Topics;
