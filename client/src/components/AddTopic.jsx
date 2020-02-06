import React              from 'react';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class AddTopic extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {
    authoredBy: '5e2dfaf1c381febcbfc2278c', // Better ways to handle this, obviously!
    title     : '',
    content   : ''
  }

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (this.state.reportedError) {
      return (
        <div>
          <h1>Error</h1>
          <p>Sorry, there was an error creating the topic. The error was: {this.state.reportedError || 'Unknown'}</p>
          <a href='#' onClick={this.resetForRetry.bind(this)}>Try again</a>&nbsp;|&nbsp;
          <Link to='/'>Back to All Topics</Link>
        </div>
      );
    } else if (this.state.processingAdd) {
      return (
        <div>Adding topic...</div>
      );
    } else {
      return (
        <div>
          <h1>Add a Topic</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <div>
              <label>Topic Title:
                <input type='' value={this.state.title} onChange={this.handleTitleUpdate.bind(this)} />
              </label>
            </div>

            <div>
              <label>Topic Content:
                <textarea value={this.state.content} onChange={this.handleContentUpdate.bind(this)}></textarea>
              </label>
            </div>

            <div>
              <input type='submit' value='Add Topic' />
            </div>

          </form>
          <Link to='/'>Back to All Topics</Link>
        </div>
      );
    }
  }

  handleTitleUpdate(e) {
    this.setState({title: e.target.value || null});
  }

  handleContentUpdate(e) {
    this.setState({content: e.target.value || null});
  }

  handleSubmit(e) {

    // Prevent the default form submit action
    e.preventDefault();

    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.topicsAPI}`), {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authoredBy: this.state.authoredBy,
        title     : this.state.title,
        content   : this.state.content
      })}
    )
      .then (res  => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then (json => navigate(`/topic/${json._id}`))
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

  }

  resetForRetry() {
    this.setState({reportedError: null});
  }

  componentDidMount() {
    // this.getComments(this.props.topicID);
  }

}

export default AddTopic;
