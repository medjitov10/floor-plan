import React, {Component} from 'react';

export default class FloorPlanFooterCategory extends Component {

  constructor() {
    super();
    this.state = {
      divStyle: {
        color: 'white',
      },
      spanStyle: {
        display: 'none'
      }
    };
  }

  onMouseOver() {
    this.setState({
      divStyle: {
        color: 'black',
        background: 'white'
      },
      spanStyle: {
        display: 'inline',
        float: 'right',
        marginRight: '5px',
        marginTop: '2px'
      }
    });
  }

  onMouseLeave() {
    this.setState({
      divStyle: {
        color: 'white'
      },
      spanStyle: {
        display: 'none'
      }
    });
  }

  render() {
    return (
      <div
        onClick={ () => this.props.categoryType(this.props.name) }
        onMouseOver={ () => this.onMouseOver() }
        onMouseLeave={ () => this.onMouseLeave() }
        style={this.state.divStyle}
        >
        <span >
          <i style={{margin: '5px'}} className={`fa fa-lg ${this.props.icon}`}></i>
        </span>
        <span >{this.props.name.toUpperCase()}</span>
        <span style={this.state.spanStyle}>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </span>
      </div>
    );
  }
}
