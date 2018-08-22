import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { angle2, distance } from './helper';

export default class AboutToBuildLine extends Component {
  static propTypes = {
    coord: PropTypes.array.isRequired,
    aboutToBuild: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.angle2 = angle2;
  }

  render() {
    const {
      coord, aboutToBuild, category, color,
    } = this.props;
    const top = coord[0][1];
    const left = coord[0][0];
    return (
      <div
        id='about-to-build-line'
        style={{
          width: `${distance([coord[0], aboutToBuild])}px`,
          height: '3px',
          position: 'absolute',
          top: top - 3,
          left,
          transform: `rotateZ(${angle2([coord[0], aboutToBuild])}deg)`,
          transformOrigin: '0% 50%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '5px',
            borderTop: `3px ${category === 'arrow' ? 'solid' : category} ${color}`,
          }}
        />
        {
          category === 'arrow'
            ? <i
              className="fa fa-chevron-right"
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: '-3px',
                top: '-5.5px',
                fontSize: '12px',
                color,
              }}
            /> : null
        }
      </div>
    );
  }
}
