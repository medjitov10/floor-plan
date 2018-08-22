import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import {
  updatePosition,
  updateRotate,
  fetchPlanItemDetail,
  updatePositionDetail,
  close,
} from '../../actions/floor_plans';

class PlanItem extends Component {
  componentDidMount() {
    const { index, updatePosition, updatePositionDetail, id, planItemDetail, updateRotate } = this.props;
    $(`.box${index}`).draggable({
      cancel: `#myCanvas${index}`,
      containment: 'parent',
      stop: (event, ui) => {
        updatePosition(ui.position.top, ui.position.left, id);
      },
      drag: (event, ui) => {
        updatePositionDetail(ui.position.top, ui.position.left, id);
      }
    });

    $(`.box${index}`).rotatable({
      wheelRotate: false,
      stop: (noNeeded, rotateUI) => {
        updateRotate(rotateUI.angle.stop / Math.PI * 180, id);
      },
    });
    $(`.box${index} div.ui-rotatable-handle`)
      .addClass(`ui-rotatable-handle-sw${index}`);

    $(`.ui-rotatable-handle-sw${index}`)
      .css({
        'background': 'url("https://s3.us-east-2.amazonaws.com/osman-gramm/images/580b57fcd9996e24bc43c43a.png")',
        'opacity': '0',
        'background-repeat': 'no-repeat',
        'background-size': '100% 100%',
        'height': '20px',
        'width': '20px',
        'position': 'absolute',
        'transition': '1s',
        'bottom': '0px',
        'left': '-27px'
      });
    $(`.ui-rotatable-handle-sw${index}`).mouseenter(() => {
      $(`.ui-rotatable-handle-sw${index}`).css('opacity', '1');
    }).mouseleave(() => {
      $(`.ui-rotatable-handle-sw${index}`).css('opacity', '0');
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      angle, category, color, coverage_color,
      device_type, icon_class, left, top, radius
    } = this.props;
    return [
      angle, category, color, coverage_color,
      device_type, icon_class, left, top, radius
    ].join() === [
      nextProps.angle, nextProps.category, nextProps.color,
      nextProps.coverage_color, nextProps.device_type,
      nextProps.icon_class, nextProps.left, nextProps.top, nextProps.radius,
    ].join() ? false : true
  }

  onDetailClick(id) {
    const { close, fetchPlanItemDetail, planItemDetail } = this.props;
    if (!planItemDetail.icon || planItemDetail.icon.id !== id) {
      close();
      fetchPlanItemDetail(id);
    }
  }

  setCanvas = (props) => {
    /* global document */
    const c = document.getElementById(`myCanvas${props.index}`);
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();

    const centerX = props.radius;
    const centerY = props.radius;
    const { radius } = props;
    const angle = props.angle / 180;
    ctx.fillStyle = props.coverage_color;
    ctx.strokeStyle = 'rgba(230,241,227, .0)';
    ctx.arc(centerX, centerY, radius, 0, angle * Math.PI);
    ctx.lineTo(centerX, centerY);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.fill();
    ctx.stroke();
  }

  render() {
    const { radius, planItemDetail, id, icon, index, color } = this.props;
    if (planItemDetail.icon && id === planItemDetail.icon.id) {
      let a = icon;
      a.index = index;
      setTimeout(() => {
        this.setCanvas(a);
      }, 1);
    }
    setTimeout(() => {
      this.setCanvas(this.props);
    }, 1);
    const canvasStyle = {
      position: 'absolute',
      left: `-${radius-9}px`, top: `-${radius-9}px`,
      pointerEvents: 'none'
    };
    const objStyle = {
      margin: '0 auto',
      width: '15px',
      height: '15px',
      position: 'relative',
      top: 0, left: 0,
      background: `${color}`,
      borderRadius: '100%',
      display: 'flex',
      alignItems: 'center'
    };

    const iStyle = {
      textAlign: 'center',
      fontSize: '8px',
      color: 'white',
      width: '100%',
      transform: `rotateZ(${this.props.angle/2}deg)`
    };

    return (
      <li
        onClick={() => this.onDetailClick(id)}
        id='draggable'
        className={`draggable box${index}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          left: `${this.props.left}px`,
          top: `${this.props.top}px`,
          transform: `rotateZ(${this.props.rotate}deg)`,
          cursor: 'pointer'
        }}
      >
        <canvas id={`myCanvas${index}`} width={`${this.props.radius*2}px`} height={`${this.props.radius*2}px`}
        style={canvasStyle} />
        {
          <div style={objStyle}>
            {
              this.props.icon_class === '' ?
              <label style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                margin: '0 auto',
                fontSize: '8px'
              }}>
              {
                this.props.device_type.split(' ').map( el => (el[0].toUpperCase()))
              }
              </label> :
              <i className={`fa ${this.props.icon_class}`} style={iStyle}></i>
            }
          </div>
          }
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    planItemDetail: state.planItemDetail,
  };
};

export default connect(mapStateToProps, {
  updatePosition,
  updateRotate,
  fetchPlanItemDetail,
  updatePositionDetail,
  close
})(PlanItem);
