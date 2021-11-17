import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

function App(props) {
  const [ robots, setRobots ] = useState([]);
  // Replaced below with mapStateToProps and mapDispatchToProps
  //
  // const [ searchField, updateSearchField ] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(users => setRobots(users))
  }, [])

  // Replaced below with mapStateToProps and mapDispatchToProps
  //
  // const onSearchChange = (event) => {
  //   updateSearchField(event.target.value);
  // }
  
  const filteredRobots = robots.filter( robot => {
    return robot.name.toLowerCase().includes(props.searchField.toLowerCase())
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
        <SearchBox searchChange={props.onSearchChange}/>
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots}/>
          </ErrorBoundary>
        </Scroll>
      </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
