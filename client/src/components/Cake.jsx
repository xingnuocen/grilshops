import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class Cake extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.cake && this.state.cakeLoaded === true) {
      return (
        <p>Error loading cakes. Try again later.</p>
      );
    } else if (!this.state.cake) {
      return (
        <p>Loading cakes...</p>
      );
    } else if (this.state.cake.length === 0) {
      return (
        <p>Sorry, no cakes are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.cake.title}</h1>
          <Link to='/'>Back to All cakes</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.cakesAPI}/${this.props.cakeID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({cake       : json});
        this.setState({cakeLoaded : true});
      })
      .catch(err => {
        this.setState({cakeLoaded: true});
      });
  }

}

export default Cake;
