import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Line extends Component {
  static propTypes = {
    selectedLine: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
    segment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteLine: PropTypes.func.isRequired,
  }

  state = {
    lineNote: this.props.segment.note || "",
  }

  componentDidMount() {
    const { index, segment } = this.props;
    /* global $ */
    $(`#test${index}`).draggable({ refreshPositions: false });
    let recoupLeft;
    let recoupTop;
    $(`#test${index}`).draggable({
      drag(event, ui) {
        ui.position.left += recoupLeft;
        ui.position.top += recoupTop;
      },
      /* eslint func-names: ["error", "never"] */
      start(event, ui) {
        let left = parseInt($(this).css('left'), 10);
        let top = parseInt($(this).css('top'), 10);
        $(this).css('cursor', 'pointer');
        // resize bug fix ui drag
        left = isNaN(left) ? 0 : left;
        top = isNaN(top) ? 0 : top;
        recoupLeft = left - ui.position.left;
        recoupTop = top - ui.position.top;
      },
      stop(event, ui) {
        axios.put(`/lines/${segment.id}`, { top: ui.position.top, left: ui.position.left });
      },
    });
  }

  shouldComponentUpdate(nextProps) {
    const { selected, segment } = this.props;
    if (selected === segment.id || nextProps.selected === segment.id) {
      return true;
    }
    return false;
  }

  onLineClick = (e) => {
    const { selectedLine } = this.props;
    e.stopPropagation();
    const { segment } = this.props;
    selectedLine(segment.id);
  }

  onInputChange = (e) => {
    this.setState({ lineNote: e.target.value });
  }

  onInputSubmit = (e) => {
    const { lineNote } = this.state;
    const { segment } = this.props;
    e.preventDefault();
    axios.put(`/lines/${segment.id}`, { note: lineNote });
    this.clearSelectedLine(e);
  }

  onDeleteClick = (e) => {
    const { segment, deleteLine } = this.props;
    deleteLine(segment.id);
    this.clearSelectedLine(e);
  }

  clearSelectedLine = (e) => {
    const { selectedLine } = this.props;
    e.stopPropagation();
    selectedLine(-1);
  }

  selected = () => (this.props.selected === this.props.segment.id);

  render() {
    const { segment, index } = this.props;
    const { lineNote } = this.state;
    return (
      <div
        onClick={this.onLineClick}
        id={`test${index}`}
        style={{
          width: `${segment.width}px`,
          height: '3px',
          position: 'absolute',
          top: segment.top,
          left: segment.left,
          transform: `rotateZ(${segment.angle}deg)`,
          transformOrigin: '0% 50%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {
          /* eslint-disable react/jsx-wrap-multilines */
          this.selected() ?
            <form onSubmit={this.onInputSubmit}>
              <input
                value={lineNote}
                onChange={this.onInputChange}
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '20%',
                  width: '60%',
                  paddingRight: '20px',
                }}
                type="text"
              />
              <i
                onClick={this.clearSelectedLine}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '21%',
                }}
                className="fa fa-times"
              />
              <i
                onClick={this.onDeleteClick}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: 'calc(21% + 10px)',
                }}
                className="fa fa-trash"
              />
            </form> :
            <div style={{
              position: 'absolute',
              top: '-18px',
              textAlign: 'center',
              width: '100%',
            }}
            >
              {lineNote}
            </div>
        }
        <div
          style={{
            width: '100%',
            height: '5px',
            borderTop: `3px ${segment.category === 'arrow' ? 'solid' : segment.category} ${segment.color}`,
          }}
        />
        {
          segment.category === 'arrow'
            ? <i
              className={`fa fa-chevron-${segment.direction}`}
              aria-hidden="true"
              style={{
                position: 'absolute',
                [segment.direction]: '-3px',
                top: '-5.5px',
                fontSize: '12px',
                color: segment.color,
              }}
            /> : null
        }
      </div>
    );
  }
}
