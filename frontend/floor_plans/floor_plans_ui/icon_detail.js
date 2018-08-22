import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { categoryHelper, typeHelper } from './footer/helper';
import { close, updateIcon, deleteIcon } from '../../actions/floor_plans';
import { flashMessage } from '../../util/util';

import DeviceIndex from './device_detail/index';

class IconDetail extends Component {
  static propTypes = {
    planItemDetail: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    updateIcon: PropTypes.func.isRequired,
    deleteIcon: PropTypes.func.isRequired,
    floorPlan: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      left: 0,
      top: 0,
      icon_class: 0,
      category: '',
      device_type: '',
      device_flag: false,
      PosLeft: 0,
      PostTop: 0,
      updated: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      $('.plan-item-detail-main').draggable();
    }, 1);
    const { planItemDetail } = this.props;
    const { icon } = planItemDetail;
    const { id } = this.state;
    if (icon && id !== icon.id) {
      this.setDetail(icon, true);
      this.setState({ PosLeft: icon.left, PostTop: icon.top, coverage_color: icon.coverage_color });
    }
  }

  componentWillUnmount() {
    this.close();
  }

  onChangeMethod(e, key) {
    const { callback } = this.props;
    if (key === 'device_type') {
      const { icon } = typeHelper().filter(el => (el.type === e.target.value))[0];
      this.setState({
        icon_class: icon,
      });
    }
    this.setState({
      [key]: e.target.value,
    }, () => {
      callback(this.state);
    });
  }

  setDetail(icon, flag) {
    const { angle, radius } = this.state;
    this.setState({
      left: icon.left,
      top: icon.top,
      category: icon.category,
      device_type: icon.device_type,
      angle: flag ? icon.angle : angle,
      radius: flag ? icon.radius : radius,
      id: icon.id,
      icon_class: icon.icon_class,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.planItemDetail.icon.drag) {
      this.setDetail(nextProps.planItemDetail.icon, false);
    }
  }

  close() {
    const { planItemDetail, callback, close } = this.props;
    const { updated } = this.state;
    if (!updated) callback(planItemDetail.icon);
    close();
  }

  updateIcon() {
    const { updateIcon, callback, close } = this.props;
    updateIcon(this.state).then((data) => {
      callback(data.payload.data.icon);
      this.setState({ updated: true }, () => close());
    });
  }

  render() {
    const {
      PosLeft,
      PostTop,
      category,
      device_type,
      top,
      left,
      angle,
      radius,
      device_flag,
    } = this.state;

    const { planItemDetail, floorPlan, deleteIcon } = this.props;

    const { icon } = planItemDetail;
    const divStyle = icon ? {
      zIndex: '1',
      width: '200px',
      height: '265px',
      padding: '10px 0',
      borderRadius: '0px',
      border: '.6px solid #ddd',
      background: 'rgba(41, 54, 61, 0.8)',
      position: 'absolute',
      left: PosLeft + 25,
      top: PostTop + 25,
    } : null;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {
          icon
            ? <div style={divStyle} className='plan-item-detail-main'>
              <i
                onClick={() => this.close()}
                className="fa fa-times close-detail-floor-plan"
              />
              <label>
                Category:
              </label>
              <span data-admin-icon="&#xe03d;" />
              <select
                className='floor_plan_icon_select'
                value={category}
                onChange={e => this.onChangeMethod(e, 'category')}
              >
                {
                  categoryHelper().map(el => (
                    <option key={el[0]} value={el[0]}>
                      {
                        el[0]
                      }
                    </option>
                  ))
                }
              </select>
              <label>
                Type:
              </label>
              <select
                className='floor_plan_icon_select'
                onChange={e => this.onChangeMethod(e, 'device_type')}
                value={device_type}>
                {
                  typeHelper().map(el => (
                    el.category === category
                      ? <option key={el.type} value={el.type}>
                        {el.type}
                      </option>
                      : null
                  ))
                }
              </select>

              <label>
                Position:
              </label>
              <div className='top-left'>
                <input
                  value={parseInt(top, 10)}
                  type="number"
                  onChange={e => this.onChangeMethod(e, 'top')}
                />
                <span>
                  :Top
                </span>
                <span>
                  Left:
                </span>
                <input
                  value={parseInt(left, 10)}
                  type="number"
                  onChange={e => this.onChangeMethod(e, 'left')}
                />
              </div>

              <label>
                Coverage:
              </label>
              <div className='icon-angle'>
                <div>
                  <label>
                    Angle:
                  </label>
                  <label>
                    &nbsp;
                    {angle}
                  </label>
                </div>
                <input
                  value={angle || 0}
                  type="range"
                  min='0'
                  max="360"
                  onChange={e => this.onChangeMethod(e, 'angle')}
                />

              </div>
              <div className='icon-angle'>
                <div>
                  <label>Radius:</label>
                  <label>&nbsp;{radius}</label>
                </div>
                <input
                  id="radius-range"
                  value={radius || 0}
                  type="range"
                  min='0'
                  max="360"
                  onChange={e => this.onChangeMethod(e, 'radius')}
                />
              </div>
              <div className='submit-and-device'>
                <div>
                  {
                    device_flag
                      ? <DeviceIndex
                        devices={floorPlan.devices}
                        device={planItemDetail.device}
                      /> : null
                  }
                </div>
                <div
                  className="btn-group"
                  style={{
                    paddingTop: '10px', display: 'flex', width: '100%', marginLeft: '3px'
                  }}
                >
                  <button
                    type='button'
                    className="btn btn-default"
                    onClick={() => this.updateIcon()}
                    style={{
                      width: '33%',
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                      color: 'rgba(3, 3, 3, 0.8)'
                    }}
                  >
                    <i className="fa fa-check fa-md" />
                  </button>
                  <button
                    type='button'
                    className="btn btn-default"
                    onClick={() => this.setState({ device_flag:  !device_flag })}
                    style={{
                      width: '33%', color: 'rgba(3, 3, 3, 0.8)'
                    }}
                  >
                    <i className="fa fa-mobile fa-md" />
                  </button>
                  <button
                    type='button'
                    className="btn btn-default"
                    onClick={() => {
                      if (confirm('Are you sure?')) {
                        deleteIcon(icon.id);
                        flashMessage('Icon was successfully deleted');
                      }
                    }}
                    style={{
                      width: '33%',
                      borderTopRightRadius: '4px',
                      borderBottomRightRadius: '4px',
                      color: 'rgba(3, 3, 3, 0.8)',
                    }}
                  >
                    <i className="fa fa-trash-o fa-md" />
                  </button>
                </div>
              </div>
            </div>
            : null
        }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  planItemDetail: state.planItemDetail,
  floorPlan: state.floorPlan,
});

export default connect(mapStateToProps, { close, updateIcon, deleteIcon })(IconDetail);
