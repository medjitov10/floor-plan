import React, {Component} from 'react';
import { date, time } from './../../util/util';
import {CustomerPlan} from './customer_plan';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class CustomerPlans extends Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      nameSort: false,
      created_atSort: false,
      timeSort: false,
      floorSort: false,
      onSearchClick: false,
    };
  }

  onDeleteClick(e, id) {
    e.stopPropagation();
    this.props.deleteFloorPlan(id);
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value});
  }

  onSortClick(attr) {
    const key = attr + 'Sort';
    this.setState({[key]: !this.state[key]}, () => {
      return this.state[key] ? this.sort(attr) : this.backsort(attr);
    });
  }

  onSearchClick = () => {
    this.setState(state => ({
      onSearchClick: !state.onSearchClick,
      filter: '',
    }));
  }

  sort(attr) {
    this.props.customer_plans.sort( (a, b) => {
      var attrA,attrB;

      if (attr === 'date') {
        attrA = date(a.created_at);
        attrB = date(b.created_at);
      } else if ( attr === 'time') {
        attrA = time(a.created_at);
        attrB = time(b.created_at);
      } else if (attr === 'floor' || attr === 'name') {
        attrA = parseInt(a.floor.split('').filter( el => {
          return el.charCodeAt() > 47 && el.charCodeAt() < 60 ? el : null;
        }).join(''));
        attrB = parseInt(b.floor.split('').filter( el => {
          return el.charCodeAt() > 47 && el.charCodeAt() < 60 ? el : null;
        }).join(''));
        if ( a.floor.toUpperCase().includes('BASEMENT')) {
          attrA = -1;
        }
        if (b.floor.toUpperCase().includes('BASEMENT')) {
          attrB = -1;
        }
        if ( a.floor.toUpperCase().includes('ROOF') ) {
          attrA = 10000;
        }
        if ( b.floor.toUpperCase().includes('ROOF') ) {
          attrB = 10000;
        }

      } else {
        attrA = typeof a[attr] === 'string' ? a[attr].toUpperCase() : a[attr] || '';
        attrB = typeof b[attr] === 'string' ? b[attr].toUpperCase() : b[attr] || '';
      }
      if (attrA < attrB) {
        return -1;
      }
      if (attrA > attrB) {
        return 1;
      }
      return 0;
    });
    this.forceUpdate();
  }

  backsort(attr) {
    this.props.customer_plans.sort( (a, b) => {
      var attrA,attrB;

      if (attr === 'date') {
        attrA = date(a.created_at);
        attrB = date(b.created_at);
      } else if ( attr === 'time') {
        attrA = time(a.created_at);
        attrB = time(b.created_at);
      } else if (attr === 'floor' || attr === 'name') {
        attrA = parseInt(a.floor.split('').filter( el => {
          return el.charCodeAt() > 47 && el.charCodeAt() < 60 ? el : null;
        }).join(''));
        attrB = parseInt(b.floor.split('').filter( el => {
          return el.charCodeAt() > 47 && el.charCodeAt() < 60 ? el : null;
        }).join(''));
        if ( a.floor.toUpperCase().includes('BASEMENT') ) {
          attrA = -1;
        }
        if ( b.floor.toUpperCase().includes('BASEMENT') ) {
          attrB = -1;
        }
        if ( a.floor.toUpperCase().includes('ROOF') ) {
          attrA = 10000;
        }
        if ( b.floor.toUpperCase().includes('ROOF') ) {
          attrB = 10000;
        }
      } else {
        attrA = typeof a[attr] === 'string' ? a[attr].toUpperCase() : a[attr] || '';
        attrB = typeof b[attr] === 'string' ? b[attr].toUpperCase() : b[attr] || '';
      }
      if (attrA > attrB) {
        return -1;
      }
      if (attrA < attrB) {
        return 1;
      }
      return 0;
    });
    this.forceUpdate();
  }

  render() {
    const { onSearchClick } = this.state;
    return (
      <div>
        <button onClick={ () => this.props.back()} className='btn btn-info' style={{background: '#29B6F6'}}>
          <i className="fa fa-angle-double-left"></i>
        </button>
        <h4>{this.props.subject.name}</h4>
        <div className='table-responsive'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              float: 'right',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '3px',
            }}
          >
          <div
            style={{
              width: onSearchClick ? '200px' : '0px',
              transition: 'width 1s',
            }}
          >
            <input
              style={{
                padding: onSearchClick ? '5px' : '5px 0px 5px 0px',
              }}
              type="text"
              className='filter-floor-plan'
              onChange={e => (this.onFilterChange(e))}
            />
          </div>
          <div
            onClick={this.onSearchClick}
            style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <i
              className='fa fa-search'
              style={{
                marginLeft: '9px',
                transform: onSearchClick ? 'rotateZ(360deg)' : 'rotateZ(0deg)',
                transition: 'transform 1s',
              }}
            />
          </div>
        </div>
          <table className='table table-striped table-bordered'>
            <thead className='bg-default'>
              <tr className='floor-plan-tr'>
                <td>#</td>
                <td onClick={ () => { this.onSortClick('name');}}>
                  Name
                  <i  className="fa fa-sort" aria-hidden="true"></i>
                </td>
                <td onClick={ () => { this.onSortClick('date');}}>
                  Date
                  <i  className="fa fa-sort" aria-hidden="true"></i>
                </td>
                <td onClick={ () => { this.onSortClick('time');}}>
                  Time
                  <i  className="fa fa-sort" aria-hidden="true"></i>
                </td>
                <td onClick={ () => { this.onSortClick('floor');}}>
                  Floor
                  <i  className="fa fa-sort" aria-hidden="true"></i>
                </td>
                <td>Actions</td>
              </tr>
            </thead>
            <ReactCSSTransitionGroup
              component='tbody'
              transitionName="customers"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {
                this.props.customer_plans.filter( (fil) => {
                  return fil.name.toUpperCase().includes(this.state.filter.toUpperCase()) ||
                  date(fil.updated_at).toUpperCase().includes(this.state.filter.toUpperCase()) ||
                  time(fil.updated_at).toUpperCase().includes(this.state.filter.toUpperCase()) ||
                  (fil.floor && fil.floor.toUpperCase().includes(this.state.filter.toUpperCase()));
                }).map( (el,index) => {
                  return (
                    <CustomerPlan
                      clearFloorPlan={this.props.clearFloorPlan}
                      onDeleteClick={this.onDeleteClick.bind(this)}
                      customer_plan={el}
                      key={el.id}
                      index={index}
                      onUpdateClick={this.props.onUpdateClick}
                    />
                  );
                })
              }
            </ReactCSSTransitionGroup>
          </table>
        </div>
      </div>

    );
  }
}
