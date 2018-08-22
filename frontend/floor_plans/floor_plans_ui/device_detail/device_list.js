import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DeviceListItem from './device_list_item';
import FloorPlanContext from '../floor_plan_context';

class DeviceList extends PureComponent {
  render() {
    return (
      <FloorPlanContext.Consumer>
        {
          ({ planItemDetail, floorPlan }) => {
            const iconDeviceIds = floorPlan.icons.map(el => (el.location_device_id));
            return (
              <div className='device-list  table-responsive'>
                <table className="table">
                  <thead className="bg-default">
                    <tr>
                      <th />
                      <th>
                        Type
                      </th>
                      <th>
                        Model
                      </th>
                      <th>
                        Manufacturer
                      </th>
                      <th>
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.devices.map((device, index) => {
                        let posibility = {};
                        if (device.id === planItemDetail.icon.location_device_id) {
                          posibility = {
                            background: '#29B6F6',
                            color: 'white',
                            disable: false,
                            checkbox: true
                          };
                        } else if (iconDeviceIds.includes(device.id)) {
                          posibility = {
                            background: '#f9f9f9',
                            color: 'black',
                            disable: true,
                            checkbox: true
                          };
                        } else {
                          posibility = {
                            background: 'white',
                            color: 'black',
                            disable: false,
                            checkbox: false
                          };
                        }
                        return (
                          <DeviceListItem
                            posibility={posibility}
                            key={index}
                            device={device}
                            icon={planItemDetail.icon}
                          />
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            );
          }
        }
      </FloorPlanContext.Consumer>
    );
  }
}

export default DeviceList;
