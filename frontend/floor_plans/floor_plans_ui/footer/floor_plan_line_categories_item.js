import React, { PureComponent } from 'react';

export default class FloorPlanLineCategoriesItem extends PureComponent {

  state = {
    divStyle: {
      height: '25px',
      width: '100%',
      alignItems: 'center',
      display: 'flex',
      position: 'relative',
    },
  }

  onMouseOver() {
    this.setState({
      divStyle: {
        color: 'black',
        background: 'white',
        display: 'flex',
        height: '25px',
        width: '100%',
        alignItems: 'center',
        position: 'relative',
      },
    });
  }

  onMouseLeave() {
    this.setState({
      divStyle: {
        color: 'white',
        display: 'flex',
        height: '25px',
        width: '100%',
        alignItems: 'center',
        position: 'relative',
      },
    });
  }

  render() {
    const { line, onSegmentButtonClick, onLineClickToggle } = this.props;
    const { divStyle } = this.state;
    return (
      <div
        onMouseOver={() => this.onMouseOver()}
        onMouseLeave={() => this.onMouseLeave()}
        style={divStyle}
        onClick={() => {
          onSegmentButtonClick(line);
          onLineClickToggle();
        }}
      >
        <div style={{
          width: '90%',
          marginLeft: '5%',
          borderTop: `4px ${line === 'arrow' ? 'solid' : line}`,
        }}
        />
        {
          line === 'arrow'
            ? <i
              className="fa fa-chevron-right"
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: '4px',
                top: '22%',
                fontSize: '17px',
                color: 'divStyle.color',
              }}
            /> : null
        }
      </div>
    );
  }
}
