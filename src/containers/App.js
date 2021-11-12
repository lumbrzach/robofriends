import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchField: ''
    }
  }

  componentDidMount() {
    this.getUsers() 
  }

  getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(users => this.setState({ robots: users }))
  }

  onSearchChange = (event) => {
    this.setState({
      searchField: event.target.value
    })
  }

  render() {
    const { robots, searchField }= this.state;
    const filteredRobots = robots.filter( robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return !robots.length ?
      (
        <div className='tc'>
          <h1 className='f1'>Welcome to Robofriends</h1>
          <h1>Robots Not Loaded Yet</h1>
        </div>
      )
      :
      (
        <div className='tc'>
          <h1 className='f1'>Welcome to Robofriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
      )
  }
}

export default App;
