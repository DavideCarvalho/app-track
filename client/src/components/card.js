import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { fetchContainer, deleteContainer, updateContainer } from '../actions/containers';
import { connect } from 'react-redux';
import $ from 'jquery';
import _ from 'lodash';
import '../css/card.css'

class Card extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
    this.props.fetchContainer(this.props.containerId, this.props.index)
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  toggleCardBody() {
    const card = findDOMNode(this.refs.cardBody);
    $(card).slideToggle();
  }

  showLoadingContainer(){
    return (
      <div>
        <div className="sk-folding-cube" data-toggle="tooltip" data-placement="top" title="Carregando, por favor aguarde">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    )
  }

  showErrorFetchingContainer(){
    return (
      <div>
        <h3>Não foi possível rastrear o container</h3>
      </div>
    )
  }

  showLastContainerMovement(containerMovements){
    let lastContainerMovement = {};
    _.map(containerMovements, container => {
      if (container.time === 'present') {lastContainerMovement = {...container}}
    })
    return (
      <div>
        <strong>Data: </strong><span>{lastContainerMovement.date}</span><br/>
        <strong>Descrição: </strong><span>{lastContainerMovement.description}</span><br/>
        <strong>Localização: </strong><span>{lastContainerMovement.location}</span><br/>
        <strong>Navio: </strong><span>{lastContainerMovement.vessel}</span><br/>
        <strong>Voyage: </strong><span>{lastContainerMovement.voyage}</span><br/>
      </div>
    )
  }

  async updateContainer(containerId, index) {
    try {
      this.props.updateContainer(containerId, index)
      $('[data-toggle="tooltip"]').tooltip()
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="col-4">
        <div className="card">
          <h4 className="card-header" onClick={() => this.toggleCardBody()}>{this.props.containerId}</h4>
          <div className="card-body" ref="cardBody">
            <div className="row">
              <div className="col">
                <button  className="btn btn-outline-success full-width to-pointer" disabled=
                  {
                    this.props.container.containers[this.props.index].containerMovements 
                    ? this.props.container.containers[this.props.index].containerMovements.length !== 0 
                      ? false
                      : true
                    : true
                  } 
                  onClick={() => this.updateContainer(this.props.containerId, this.props.index)}>Atualizar</button>
              </div>
              <div className="col">
                <button className="btn btn-outline-danger full-width to-pointer" disabled=
                  {
                    this.props.container.containers[this.props.index].containerMovements 
                    ? this.props.container.containers[this.props.index].containerMovements.length !== 0 
                      ? false
                      : true
                    : true
                  } 
                onClick={() => this.props.deleteContainer(this.props.index)}>Deletar</button></div>
              </div>
            {
              this.props.container.containers[this.props.index].containerMovements !== null ?
              this.props.container.containers[this.props.index].containerMovements.length === 0
              ? this.showLoadingContainer()
              : this.showLastContainerMovement(this.props.container.containers[this.props.index].containerMovements)
              : this.showErrorFetchingContainer()
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    container: state.container
  }
}

export default connect(mapStateToProps, { fetchContainer, deleteContainer, updateContainer })(Card)