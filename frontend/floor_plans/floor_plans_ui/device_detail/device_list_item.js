import React, {Component} from 'react';
import {updateDeviceId} from './../../../actions/floor_plans';
import {connect} from 'react-redux';
import {flashMessage} from './../../../util/util';
class DeviceListItem extends Component {

  onCheckboxClick(e) {
    alertify.confirm('Confirmation', 'Are you sure?', () => {
      this.props.updateDeviceId({
        ...this.props.icon,
        location_device_id: this.props.device.id == this.props.icon.location_device_id ?
        null : this.props.device.id
      });
      flashMessage('Device was successfully changed');
    }, () => {});
  }

  render() {
    const {device} = this.props;
    const {background, color, checkbox, disable} = this.props.posibility;
    return (
      <tr className='device-list-tr' style={{background: background, color: color}}>
        <td>
          <input type="checkbox"
            value={device.id}
            checked={this.props.posibility.checkbox}
            onChange={ (e) => this.onCheckboxClick(e) }
            disabled={disable}/>
        </td>
        <td>{device.device_type}</td>
        <td>{device.model}</td>
        <td>{device.manufacturer}</td>
        <td>{device.general_location}</td>
      </tr>
    );
  }
}

export default connect(null, {updateDeviceId})(DeviceListItem);
