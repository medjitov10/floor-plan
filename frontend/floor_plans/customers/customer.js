import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Customer extends Component {

  render() {
    return (
      <tr className='customer-floor-plan'
        onClick={ () => this.props.onTrClick(this.props.customer)}>
        <td>{this.props.index}</td>
        <td>{this.props.customer.name}</td>
        <td>{this.props.customer.address}</td>
        <td style={{overflow: 'hidden'}}>
          <ReactCSSTransitionGroup
            transitionName="qty"
            component='span'
            style={{display: 'inline-block', overflow: 'hidden', position: 'relative'}}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <span style={{display: 'inline-block'}}
              key={this.props.customer.id}>{this.props.customer.qty}</span>
          </ReactCSSTransitionGroup>
        </td>
      </tr>
    );
  }
}
