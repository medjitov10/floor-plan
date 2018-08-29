# README
## Floor Plan Creator
Floor plan creator is a full-stack web applicatio. It makes use of Rails-PostgreSQL on the backend, and React-Redux on the client. Also, this app leverages Amazon AWS file-storage for all floor plan images and floor plan pdf.
----
## Technologies
 1. Ruby on rails
 2. React
 3. Redux
 4. JQuery-ui
 5. AWS
 6. Redis for late background job.
 7. Wicked pdf
 
## Features
#### Base
+ User can create, edit adn delete floor plan.
+ For any floor plan, user able add, edit and update icon and lines.
#### Advanced
+ User have possibility to change position of icon and line on floor plan.
+ Any icon have special panel to change any detail of the icon and apply specific device for the icon.
+ For all floor plans there is feature to save it as pdf.

##### Icon
 Icon is representation of the present device in the scheme. By clicking on icon user trigger detail panel to be render.
 In detail panel user able to change position, type, category, range and angle of view. Also, add remove connection to existing device of this locaiton.

<img src="https://s3.amazonaws.com/osman-floor-plan/printsceens/Screen+Shot+2018-08-29+at+10.01.25+AM.png" height="300" width="50%">

By using jquery-ui icon can drag and rotate.
#### icon.rb
```ruby
# Table name: icons
#
#  id                 :integer          not null, primary key
#  top                :float
#  left               :float
#  rotate             :float
#  category           :string
#  device_type        :string
#  location_device_id :integer
#  floor_plan_id      :integer
#  color              :string
#  radius             :float
#  icon_class         :string
#  coverage_color     :string
#  integer            :float
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Icon < ApplicationRecord
  belongs_to :floor_plan
  has_one :device

  after_create :update_coord

  def update_coord
    self.update(top: 0, left: 0)
  end

  def set_color
    case self.category
    when "Access"
        self.update(color: '#0071db', coverage_color: 'rgba(0, 113, 219, .3)')
      when "CCTV"
        self.update(color: '#f73149', coverage_color: 'rgba(255, 0, 0, 0.3)')
      when "Intrusion"
        self.update(color: '#cacac8', coverage_color: 'rgba(202, 202, 200, .3)')
      when "Media"
        self.update(color: '#ffdf00', coverage_color: 'rgba(255, 238, 130, 0.3)')
      when "Network"
        self.update(color: '#0093b7', coverage_color: 'rgba(0, 149, 186, .3)')
      when "Custom"
        self.update(color: nil, coverage_color: 'rgba(140, 146, 172, .3)')
      end
  end

end

```

#### icon.js
```javascript
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
```
#### icon_detail.js
```javascript
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
```
Floor plan can be save as pdf. To covert plan to pdf I used Wickedpdf. It take time and heroku server filed due to expiration of the request time. So I used Redis.resque to make this asynchronous.
#### Medhod in controller
```ruby
    def generate_pdf
    @lines = @floor_plan.lines
    @html = render_to_string(:action => :show, :locals => {
     location: @location,
     icons: @icons
   }, :layout => false)
    Resque.enqueue(FloorPlanPdfGetter, @html, @floor_plan.name, @floor_plan.id)
  end
```
#### Worker
```ruby
class FloorPlanPdfGetter

  @queue = :floor_plans_queue

  def self.perform(html, name, id)
    @floor_plan = FloorPlan.find(id)
    pdf = WickedPdf.new.pdf_from_string(html,:orientation => 'Landscape',
      :margin  =>  {
				top: 1,
        bottom: 1,
        left: 1,
        right: 1
    })

    save_path = Rails.root.join('public','floor_print.pdf')
    File.open(save_path, 'wb') do |file|
      file << pdf
    end
    date = DateTime.now
    path = 'pdfs/' + [name, date.strftime("%m-%d-%Y %H:%M")].join('-') + '.pdf'
    s3 = Aws::S3::Resource.new(region:'us-east-1')
    obj = s3.bucket('osman-floor-plan').object(path)

    File.open('public/floor_print.pdf', 'rb') do |file|
      obj.put(body: file)
    end

    @floor_plan.update(pdf_url: obj.public_url)

    File.delete('public/floor_print.pdf')
  end

end
```
