import React, {Component} from 'react';
import { date } from './../../util/util';
export default class FloorPlanDescription extends Component {

  onload() {
    const {floor_plan} = this.props.floor_plan;
    const {location} = this.props.floor_plan;
    const title = floor_plan && floor_plan.name || '';
    const loc = location ? location.address1 ? location.address1 : ''
    + " " + location.address2 ? location.address2 : '' : '';
    const name = floor_plan && floor_plan.name;
    const created_at = floor_plan && date(floor_plan.created_at);
    const updated = floor_plan && date(floor_plan.updated_at);
    const created_by = floor_plan.created_by;
    return (
      <div style={{right: this.props.toggle ? '-92px' : 0, transition: 'right .5s'}} className='floor-plans-ui-right'>
        <div className='floor-plan-description-img' style={{ background: 'white' }}>
            <img src="/images/logo1.jpeg"
              alt=""
              width="100%"
              height='50%'
              style={{transform: 'rotateZ(270deg)', position: 'absolute', left: 0 }}/>
        </div>
        <div className='floor-plan-decription-table' style={{ background: 'white' }}>
          <div className='floor-plan-description-name'>
            <div style={{transform: 'rotateZ(270deg)', fontWeight: 'bold'}}>
              <span style={{ position: 'absolute', left: `-${title.length*3}px`, width: '1000px'}}>
                {title}
              </span>
            </div>
          </div>

          <div className='floor-plan-description-body'>
            <div className='floor-plan-description-info'>
              <div className='floor-plan-description-customer-date'>
                <div style={{transform: 'rotateZ(270deg)', fontWeight: 'bold'}}>
                  <span style={{ position: 'absolute', left: '-100px', width: '200px'}}>
                    Created at: {created_at}
                  </span>
                </div>
              </div>

              <div className='floor-plan-description-customer-date'>
                <div style={{transform: 'rotateZ(270deg)', fontWeight: 'bold'}}>
                  <span style={{ position: 'absolute', left: '-100px', width: '200px'}}>
                    Created by: {created_by}
                  </span>
                </div>
              </div>
              <div className='floor-plan-description-customer-date'>
                <div style={{transform: 'rotateZ(270deg)', fontWeight: 'bold'}}>
                  <span style={{ position: 'absolute', left: '-100px', width: '200px'}}>
                    Updated_at: {updated}
                  </span>
                </div>
              </div>
              <div className='floor-plan-description-customer-date'>
                <div style={{transform: 'rotateZ(270deg)', fontWeight: 'bold'}}>
                  <span style={{ position: 'absolute', left: '-100px', width: '200px'}}>
                    Approved:
                  </span>
                </div>
              </div>
            </div>
            <div className='floor-plan-description-customer'>


              <div className='floor-plan-description-customer-name'>
                <div style={{transform: 'rotateZ(270deg)', fontWeight: 'bold'}}>
                  <span style={{ position: 'absolute', left: '-60px', width: '150px'}}>
                    {
                      name
                    }
                  </span>
                </div>
              </div>

              <div className='floor-plan-description-customer-address'>
                <div style={{transform: 'rotateZ(270deg)', fontWeight: 'bold'}}>
                  <span style={{
                    position: 'absolute',
                    left: '-60px',
                    width: '148px',
                    wordBreak: 'break-word',
                    lineHeight: '16px'
                  }}>
                  Address: {
                      loc
                    }
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      this.props.floor_plan && this.props.floor_plan.floor_plan ? this.onload() : <div></div>
    );
  }
}
