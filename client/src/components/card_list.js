import React, { Component } from 'react'
import Card from './card'

export default class CardList extends Component {
  render () {
    const container1 = {
      id: 100
    };
    const container2 = {
      id: 101
    };
    const container3 = {
      id: 102
    };
    return (
      <div className="row">
        <Card container={container1}/>
        <Card container={container2}/>
        <Card container={container3}/>
      </div>
    )
  }
}