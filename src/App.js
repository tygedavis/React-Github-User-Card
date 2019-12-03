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
      console.log('First State update: ', this.state.users)
    });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('CDU Invoked')
    if(this.state.users.length === 1){
      axios.get('https://api.github.com/users/tygedavis/followers')
      .then(res => {
        console.log('Followers results: ', res.data)
        res.data.forEach(element => {
          //console.log(element)
          
          this.setState({ users: [...this.state.users, element]})
          console.log('Folowers State update: ',this.state.users)
        })
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>GitHub User Card</h1>

        <div className='userCard'>
          {this.state.users.map(user => 
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
              <p>{user.followers}</p>
              <p>{user.following}</p>
              <h3>{user.login}</h3>
            </div>
          )}  
        </div>
      </div>
    );
  };
};

export default App;
