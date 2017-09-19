import React, {Component} from 'react'
import _ from 'lodash'
import Card from './card'
import { connect } from 'react-redux'

class CardList extends Component {
  renderCardList () {
    if (!this.props.container){
      return;
    }
    return _.map(this.props.container.containers, (container, index) => {
      return (
        <Card containerId={container.id} index={index} key={container.id}/>
      )
    })
  }
  render() {
    return (
      <div className="row">
        {this.renderCardList()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    container: state.container
  }
}

export default connect(mapStateToProps)(CardList)