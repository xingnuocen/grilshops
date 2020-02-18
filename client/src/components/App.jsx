import React    from 'react';
import {Router} from "@reach/router";
import Cakes   from './Cakes';
import Cake    from './Cake';
import AddCake from './AddCake';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Cakes   path='/' />
        <Cake    path='/cake/:cakeID' />
        <AddCake path='/add-cake/' />
      </Router>
    );
  }

}

export default App;
