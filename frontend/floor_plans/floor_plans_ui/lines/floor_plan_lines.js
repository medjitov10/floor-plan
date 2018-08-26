import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Line from './line';

export default class FloorPlanLines extends PureComponent {
  static propTypes = {
    segments: PropTypes.array,
    selected: PropTypes.number.isRequired,
    selectedLine: PropTypes.func.isRequired,
    deleteLine: PropTypes.func.isRequired,
  }

  static defaultProps = {
    segments: [],
  }

  render() {
    const {
      segments,
      selectedLine,
      selected,
      deleteLine,
    } = this.props;
    return (
      <Fragment>
        {
          segments.map((el, index) => (
            <Line
              key={el.id}
              selected={selected}
              segment={el}
              selectedLine={selectedLine}
              index={index}
              deleteLine={deleteLine}
            />
          ))
        }
      </Fragment>
    );
  }
}
