import React, { Component, Fragment } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchFloorPlans } from '../../actions/floor_plans';
import FloorPlan from './floor_plan';
import FloorPlanFooter from './footer/floor_plan_footer';
import FloorPlanDescription from './floor_plan_description';
import FavoriteIcons from './floor_plan_favorite_icons';
import LinkToPlans from './link_to_plans';

class FloorPlanUiIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: this.mainHeight(),
      categorys: [],
      toggle: true,
      display: 'none',
      segmentFlag: false,
      category: 'dotted',
      color: 'black',
      onLineClick: false,
      onColorClick: false,
    };

    /* global window */

    window.addEventListener('resize', _.debounce(() => {
      this.setState({ height: this.mainHeight() });
    }, 1000));
    this.mainHeight();
  }

  componentDidMount() {

    this.props.fetchFloorPlans(this.props.match.params.slug);
    setTimeout(() => this.setState({ display: 'block' }), 3500);
    window.addEventListener('resize', this.onDivResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onDivResize)
  }

  onDivResize = () => {
    this.setState({ height: this.mainHeight() });
  }

  onLineClickToggle = () => this.setState(state => ({ onLineClick: !state.onLineClick }));

  onColorClickToggle = () => this.setState(state => ({ onColorClick: !state.onColorClick }));

  onSegmentButtonClick = (type) => {
    this.setState(state => ({
      segmentFlag: !state.segmentFlag,
      category: type,
    }));
  }

  onColorChange = (color) => {
    this.setState({ color });
  }

  toggleCallback = () => {
    this.setState(state => ({ toggle: !state.toggle }));
  }

  closeTabs = () => (
    this.state.onLineClick === false && this.state.onColorClick === false ?
      null :
      this.setState(() => ({
        onLineClick: false,
        onColorClick: false,
      }))
  )

  mainHeight = () => (
    /* global document */
    window.innerHeight - (parseInt(document.getElementById('floor-plan-react').style.padding.split('px').join('')) * 2) - 50
  )

/* global screen */

  render() {
    const {
      display,
      height,
      toggle,
      segmentFlag,
      onLineClick,
      onColorClick,
      categorys,
      color,
      category,
    } = this.state;
    const {
      history,
      floor_plan,
      floorPlanCustomers,
      match
    } = this.props;
    return (
      <Fragment>
        {
          display === 'block' ?
          <Fragment>
            <div style={{
              display: 'flex',
              background: 'white',
              marginBottom: '2px',
              height: '50px',
            }}
            >
              <FavoriteIcons />
              <LinkToPlans
                history={history}
                floor_plan={floor_plan.floor_plan}
                floor_plans={floorPlanCustomers.floor_plans}
              />
            </div>
            <div
              className='floor-plans-ui-main'
              id='osman-test'
              style={{ height }}
              onClick={() => (
                this.setState({ categorys: [] })
              )}
            >
              <FloorPlanDescription floor_plan={floor_plan} toggle={toggle} />
              <FloorPlanFooter
                onLineClickToggle={this.onLineClickToggle}
                segmentFlag={segmentFlag}
                onLineClick={onLineClick}
                onColorClick={onColorClick}
                onColorClickToggle={this.onColorClickToggle}
                onSegmentButtonClick={this.onSegmentButtonClick}
                onColorChange={this.onColorChange}
                toggle={toggle}
                toggleCallback={this.toggleCallback}
                history={history}
                category={categorys}
                slug={match.params.slug}
                pdf_url={floor_plan.floor_plan && floor_plan.floor_plan.pdf_url}
              />
              {
                floor_plan.icons
                  ? <FloorPlan
                    closeTabs={this.closeTabs}
                    color={color}
                    icons={floor_plan.icons}
                    floor_plan={floor_plan}
                    segmentFlag={segmentFlag}
                    category={category}
                    slug={match.params.slug}
                  />
                  : null
              }
            </div>
          </Fragment> :
          <div style={{ display: 'block', background: 'white', height: this.mainHeight() + 50 }}>
            <img
              alt="logo"
              src="/images/Loading_icon.gif"
              style={{
                width: '30%',
                marginLeft: '35%',
                marginTop: `${screen.height / 2 - 250}px`,
              }}
            />
          </div>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  floor_plan: state.floorPlan,
  floorPlanCustomers: state.floorPlanCustomers,
});

export default withRouter(connect(mapStateToProps, { fetchFloorPlans })(FloorPlanUiIndex));
