import React, {Component} from 'react';

class Device extends Component {
  test() {

  }
  render() {
    const imgStyle = {
      background: `url(${this.props.device.image})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };

    const noDeviceStyle = {
      width: '100%',
      height: '90%',
      position: 'absolute',
      top: '10%',
      bottom: 0,
      left: 0,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(99,99,99,.5)'
    };


    return (
      this.props.device.image ?
        <div className='device-detail-detail'>
          <img src={this.props.device.image} className='img-thumbnail'/>
          <br/><br/>
          <table className='table table-bordered table-striped'>
            <tbody>
                {
                  Object.keys(this.props.device).map( (el) => {
                    if (el == 'image') return null;
                    return (
                      <tr>
                        <td style={{width:'140px'}}>
                          <b>
                            {
                              el.split('_').map((el1) => {
                                return (
                                  el1[0].toUpperCase() + el1.slice(1) + ' '
                                )
                              })
                            }
                          </b>
                        </td>
                        <td>{this.props.device[el]}</td>
                      </tr>
                    );
                  })
                }
            </tbody>

          </table>
        </div> :
        <div style={noDeviceStyle}>
          <span style={{margin: '0 auto', color: 'white', fontSize: '16px', fontWeight: 'bold'}}>
            This icon have no connected device
          </span>
        </div>
      );
  }
}

export default Device;
