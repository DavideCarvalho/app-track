import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import { fetchContainer } from '../actions/containers'
import { connect } from 'react-redux'
import $ from 'jquery';

class Card extends Component {

  componentDidMount () {
    this.props.fetchContainer(this.props.container.id, this.props.index)
  }

  toggleCardBody() {
    const card = findDOMNode(this.refs.cardBody);
    $(card).slideToggle();
  }

  render() {
    return (
      <div className="col-4">
        <div className="card">
          <h4 className="card-header" onClick={() => this.toggleCardBody()}>{this.props.container.id}</h4>
          <div className="card-body" ref="cardBody">
            <h4 className="card-title">Special title treatment</h4>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { fetchContainer })(Card)