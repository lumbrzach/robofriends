import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

function App() {
  const [ robots, setRobots ] = useState([]);
  const [ searchField, updateSearchField ] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(users => setRobots(users))
  }, [])

  const onSearchChange = (event) => {
    updateSearchField(event.target.value);
  }
  
  const filteredRobots = robots.filter( robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })

  console.log(robots, searchField)
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
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots}/>
          </ErrorBoundary>
        </Scroll>
      </div>
    )
}

export default App;
