import React, {Component} from 'react';

export default class ContainerInput extends Component {
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-11">
          <input
            type="text"
            className="form-control"
            id="inlineFormInputName2"
            placeholder="Número de container"/>
        </div>
        <div className="col-1">
          <button type="submit" className="btn btn-outline-primary">+</button>
        </div>
      </div>
    )
  }
}