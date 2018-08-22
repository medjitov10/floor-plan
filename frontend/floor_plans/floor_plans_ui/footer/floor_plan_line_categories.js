import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import FloorPlanLineCategoriesItem from './floor_plan_line_categories_item'

export default class FloorPlanLineCategories extends PureComponent {
  static propTypes = {
    onLineClickToggle: PropTypes.func.isRequired,
    onSegmentButtonClick: PropTypes.func.isRequired,
    onLineClick: PropTypes.bool.isRequired,
  }

  render() {
    const lines = ['dotted', 'solid', 'dashed', 'double', 'arrow'];
    const { onLineClick, onLineClickToggle, onSegmentButtonClick } = this.props;
    return (
      <div style={{ color: 'white' }}>
        {
          onLineClick
          && lines.map(line => (
            <FloorPlanLineCategoriesItem
              onLineClickToggle={onLineClickToggle}
              key={line}
              onSegmentButtonClick={onSegmentButtonClick}
              line={line}
            />
          ))
        }
      </div>
    );
  }
}
