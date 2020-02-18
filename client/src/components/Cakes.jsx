import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Cakes extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.cakes && this.state.cakesLoaded === true) {
      return (
        <p>Error loading cakes. Try again later.</p>
      );
    } else if (!this.state.cakes) {
      return (
        <p>Loading cakes...</p>
      );
    } else if (this.state.cakes.length === 0) {
      return (
        <p>Sorry, no cakes are available</p>
      );
    } else {
      return (
        <div>
          <h1>All Cakes in the database</h1>
          <ul>
            {this.state.cakes.map(cake => (
              <li key={`cake_${cake._id}`}><Link to={`/cake/${cake._id}`}>{cake.title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-cake'>Add a new Cake</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.cakesAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({cakes       : json});
        this.setState({cakesLoaded : true});
      })
      .catch(err => {
        this.setState({cakesLoaded: true});
      });
  }

}

export default Cakes;

