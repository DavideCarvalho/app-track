import React, {Component} from 'react';
import Navbar from './components/navbar'
import ContainerInput from './components/containerInput'
import CardList from './components/card_list'
import './css/containerInput.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="container">
          <ContainerInput/>
          <CardList/>
        </div>
      </div>
    );
  }
}

export default App;
