import React    from 'react';
import {Router} from "@reach/router";
import Topics   from './Topics';
import Topic    from './Topic';
import AddTopic from './AddTopic';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Topics   path='/' />
        <Topic    path='/topic/:topicID' />
        <AddTopic path='/add-topic/' />
      </Router>
    );
  }

}

export default App;
