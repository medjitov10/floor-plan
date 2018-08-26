import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customer from './customer';
import CustomerPlans from './customer_plans';
import AddFloorPlan from './add_floor_plan';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {fetchFloorPlanCustomers, deleteFloorPlan, clearFloorPlan} from './../../actions/floor_plans';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customer_plans: [],
      customer: '',
      items: [],
      h4Name: 'Floor Plans',
      transitionDirection: 'directionLeft',
      first: true,
      filter: '',
      qtySort: false,
      addressSort: false,
      nameSort: false,
      onSearchClick: false,
    };
  }

  componentWillMount() {
    this.props.fetchFloorPlanCustomers();
  }

  onUpdateClick(e, update) {
    update = this.props.customers.floor_plans.filter( el => (el.name === update.name))[0];
    e.stopPropagation();
    this.setState({update});
  }

  clearUpdate(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({update: null});
  }

  onTrClick = (customer) => {
    const floorPlans = this.props.customers.floor_plans
      .filter(el => (el.location_id === customer.location_id));
    this.setState({
      customer_plans: floorPlans,
      customer: customer,
      items: [],
      h4Name: `Floor Plans / ${customer.address}`,
      transitionDirection: 'directionLeft',
      first: false
    }, () => {
      setTimeout(() => {
        this.setState({items: this.renderTransition()});}
        , 500);
    });
  }

  back() {
    this.setState({
      h4Name: 'Floor Plans',
      transitionDirection: 'directionRight',
      first: true,
      items: [],
    }, () => {
      setTimeout(() => {
        this.setState({items: this.renderTransition()});}
        , 500);
    });
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value}, () => {
      this.setState({items: this.renderTransition()});
    });
  }

  sort(attr) {
    this.props.customers.result.sort( (a, b) => {
      var attrA = typeof a[attr] === 'string' ? a[attr].toUpperCase() : a[attr];
      var attrB = typeof b[attr] === 'string' ? b[attr].toUpperCase() : b[attr];
      if (attrA < attrB) {
        return -1;
      }
      if (attrA > attrB) {
        return 1;
      }
      return 0;
    });
    this.setState({items: this.renderTransition()});
  }

  backsort(attr) {
    this.props.customers.result.sort( (a, b) => {
      var attrA = typeof a[attr] === 'string' ? a[attr].toUpperCase() : a[attr];
      var attrB = typeof b[attr] === 'string' ? b[attr].toUpperCase() : b[attr];
      if (attrA > attrB) {
        return -1;
      }
      if (attrA < attrB) {
        return 1;
      }
      return 0;
    });
    this.setState({items: this.renderTransition()});
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
    }), () => {
      this.setState({ items: this.renderTransition() });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: this.renderTransition(nextProps.customers) });
  }

  renderTransition(customers = this.props.customers) {
    const { customer_plans, customer, onSearchClick } = this.state;
    const floorPlans = customers.floor_plans
      .filter(el => (el.location_id === customer.location_id));
    var i = 0;
    const items =
      customers.result ?
        customers.result.filter(fil => {
          return fil.name.toUpperCase().includes(this.state.filter.toUpperCase()) ||
          fil.address.toUpperCase().includes(this.state.filter.toUpperCase()) ||
          String(fil.qty).includes(this.state.filter);
        }).filter(e => (e.qty > 0)).map((customer) => {
            i++;
            return (
              <Customer
                customer={customer}
                key={customer.id}
                index={i}
                onTrClick={this.onTrClick}
              />);
      }) : null;
      return (
        !this.state.first ?
        <CustomerPlans
          clearFloorPlan={this.props.clearFloorPlan}
          customer_plans={floorPlans}
          subject={customer}
          back={this.back.bind(this)}
          onUpdateClick={this.onUpdateClick.bind(this)}
          deleteFloorPlan={this.props.deleteFloorPlan}
        /> :
        <div>
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
            <tr role='row'>
              <th>
                #
              </th>
              <th onClick={ () => { this.onSortClick('name');}}>
                Customer
                <i style={{float: 'right', marginTop: '2px'}} className="fa fa-sort" aria-hidden="true"></i>
              </th>
              <th onClick={ () => { this.onSortClick('address');}}>
                Address
                <i style={{float: 'right', marginTop: '2px'}} className="fa fa-sort" aria-hidden="true"></i>
              </th>
              <th onClick={ () => { this.onSortClick('qty');}}>
                Qty
                <i style={{float: 'right', marginTop: '2px'}} className="fa fa-sort" aria-hidden="true"></i>
              </th>
            </tr>
          </thead>
            <ReactCSSTransitionGroup
              component='tbody'
              transitionName="customers"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {items}
            </ReactCSSTransitionGroup>
        </table>
      </div>
    );
  }

  render() {
    const items = this.state.items;

    return (
      <div className='customer-list-main'>
        <div className="page-header page-header dash">
          <h4>{this.state.h4Name}</h4>
        </div>

        <AddFloorPlan
          update={this.state.update}
          clearUpdate={this.clearUpdate.bind(this)}/>
        <ReactCSSTransitionGroup
          component="div"
          className='table-responsive no-border'
          transitionName={this.state.transitionDirection}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.floorPlanCustomers,
  };
};

export default connect(mapStateToProps, {fetchFloorPlanCustomers,
  clearFloorPlan, deleteFloorPlan})(Customers);
