import React, {Component} from 'react';
import {addContainer, containerInputChange} from '../actions/containers'
import {connect} from 'react-redux'

class ContainerInput extends Component {

  async containerInputChange(value) {
    try{
      let retorno = await this.props.containerInputChange(value)
      console.log(retorno)
    }
    catch (e) {
      console.log('não deu certo')
    }
  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-11">
          <input
            type="text"
            className="form-control"
            id="inlineFormInputName2"
            placeholder="Número de container"
            value={this.props.container.containerInput}
            onInput={(e) => this.containerInputChange(e.target.value)}/>
        </div>
        <div className="col-1">
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={() => this.props.addContainer(this.props.container.containerInput)}>+</button>
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

export default connect(mapStateToProps, { addContainer, containerInputChange })(ContainerInput)