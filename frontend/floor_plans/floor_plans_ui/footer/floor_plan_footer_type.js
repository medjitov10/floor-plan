import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {createIcon} from './../../../actions/floor_plans';

class FloorPlanFooterType extends Component {
  constructor() {
    super();
    this.state = {
      divStyle: { color: 'white', display: 'flex' }
    };
  }
  onMouseOver() {
    this.setState({
      divStyle: {
        color: 'black',
        background: 'white',
         display: 'flex'
      }
    });
  }

  onMouseLeave() {
    this.setState({
      divStyle: {
        color: 'white',
        display: 'flex'
      }
    });
  }

  onIconClick(obj, slug) {
    this.props.createIcon(obj, slug);
  }

  render() {

    return (
      <div
        onMouseOver={ () => this.onMouseOver() }
        onMouseLeave={ () => this.onMouseLeave() }
        style={this.state.divStyle}
        onClick={ () => this.onIconClick(this.props.element, this.props.slug)}
        >
        <div style={{padding: '5px', width: '12%', cursor: 'pointer' }}>
          {
            this.props.element.category === 'Custom' ?
            <div style={{
              width: '20px',
              height: '20px',
              display: 'flex',
              background: `url(https://s3.us-east-2.amazonaws.com/dvss-security/icons/${this.props.element.icon.split('.').map((el, index) => {
                    return index === 0 ? el.toUpperCase() : el.toLowerCase()
                  }).join('.')})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              margin: '0 auto',
              marginTop: '2px',
              backgroundRepeat: 'no-repeat',
              paddingTop: '4px',
            }}>
            </div> :
            <Fragment>
              {this.props.element.icon === '' || this.props.element.icon === null ?
              <label style={{
                textAlign: 'center',
                fontWeight: 'bold',
                height: '0px'
              }}>
                {this.props.element.type.split(' ').map( el => (el[0].toUpperCase()))}
              </label> :
              <i className={`fa fa-lg ${this.props.element.icon}`}></i>}
            </Fragment>
          }
        </div>
        <div style={{
          paddingLeft: '5px',
          width: '85%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
          {this.props.element.type.toUpperCase()}
        </div>
      </div>
    );
  }
}



export default connect(null, { createIcon })(FloorPlanFooterType);
