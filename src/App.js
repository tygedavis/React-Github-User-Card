import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {

  state = {
    users: []
  };

  componentDidMount() {
    console.log('CDM Invoked')

    axios.get('https://api.github.com/users/tygedavis')
    .then(res => {
      console.log('GitHub Data: ', res)
      this.setState({ users: [...this.state.users, res.data] })
      console.log(this.state.users)
    });
  };

  render() {
    return (
      <div className="App">
        <h1>GitHub User Card</h1>

        <div className='userCard'>
          {this.state.users.map(user => 
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>Bio: {user.bio}</p>
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
            </div>
          )}  
        </div>
      </div>
    );
  };
};

export default App;
