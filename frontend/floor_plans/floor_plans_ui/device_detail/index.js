import React, {Component} from 'react';

import DeviceList from './device_list';
import Device from './device';

class DeviceIndex extends Component {
  constructor() {
    super();
    this.state = {
      all: true
    };
  }
  render() {
    return (
      <div className='device-detail-index'>
        <div className='device-detail-tab'>
          <div onClick={ () => this.setState({all: true})}>
            <span style={{color: this.state.all ? '#29B6F6' : '#5c5c5c'}}>ALL DEVICES</span>
          </div>
          <div onClick={ () => this.setState({all: false})}>
            <span style={{color: !this.state.all ? '#29B6F6' : '#5c5c5c'}}>DEVICE DETAIL</span>
          </div>
        </div>
        <div className='device-detail-window'>
          {
            this.state.all ?
            <DeviceList devices={this.props.devices}/> : <Device device={this.props.device}/>
          }
        </div>

      </div>
    );
  }
}

export default DeviceIndex;
