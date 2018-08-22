import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import { createIcon, fetchFloorPlanCustomers } from '../../actions/floor_plans';

class FavoriteIcons extends Component {
  static propTypes = {
    fetchFloorPlanCustomers: PropTypes.func.isRequired,
    createIcon: PropTypes.func.isRequired,
  }

  state = {
    icons: [],
  }

  componentDidMount() {
    const { fetchFloorPlanCustomers } = this.props;
    fetchFloorPlanCustomers();
    axios.get('/favorite_icons').then((responce) => {
      this.setState({
        icons: responce.data,
      });
    });
  }

  background = (category) => {
    switch (category) {
      case 'Access':
        return 'rgba(0, 113, 219)';
      case 'CCTV':
        return 'rgba(255, 0, 0)';
      case 'Intrusion':
        return 'rgba(202, 202, 200)';
      case 'Media':
        return 'rgba(255, 238, 130)';
      case 'Network':
        return 'rgba(0, 149, 186)';
      default:
        return 'white';
    }
  }

  addIcon(icon, type, category) {
    /* global window */
    const { createIcon } = this.props;
    const obj = { category, icon, type };
    const slug = window.location.href.split('/')[window.location.href.split('/').length - 1];
    createIcon(obj, slug);
  }

  render() {
    const { icons } = this.state;
    const url = 'https://s3.us-east-2.amazonaws.com/dvss-security/icons';
    return (
      <div className='favorite-icons'>
        {
          icons.map(icon => (
            <div
              key={icon.id}
              onClick={() => this.addIcon(icon.icon_class, icon.device_type, icon.category)}
            >
              <div
                style={{
                  border: '1px solid rgba(0,0,0,.0)',
                  background: this.background(icon.category),
                  borderRadius: icon.category === 'Custom' ? '0' : '100%',
                }}
              >
                {
                  icon.category === 'Custom'
                    ? <div style={{
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      background: `url(${url}/${icon.icon_class.split('.').map((el, index) => (
                        index === 0 ? el.toUpperCase() : el.toLowerCase()
                      )).join('.')})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      borderRadius: '0',
                      margin: '0 auto',
                      marginTop: '2px',
                      backgroundRepeat: 'no-repeat',
                      paddingTop: '4px',
                    }}
                    />
                    : <Fragment>
                      {
                        icon.icon_class === '' || icon.icon_class === null
                          ? <label
                            style={{
                              textAlign: 'center',
                              fontWeight: 'bold',
                              marginTop: '3px',
                              color: 'white',
                            }}
                          >
                            {icon.device_type.split(' ').map(el => (el[0].toUpperCase()))}
                          </label>
                          : <i
                            className={`fa ${icon.icon_class}`}
                            style={{
                              textAlign: 'center',
                              fontSize: '11px',
                              color: 'white',
                              width: '100%',
                              marginTop: '7px',
                            }}
                          />
                      }
                    </Fragment>
                }
              </div>
              <label style={{ fontSize: '8px', textAlign: 'center', width: '100%' }}>
                {icon.device_type}
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

export default connect(null, { createIcon, fetchFloorPlanCustomers })(FavoriteIcons);
