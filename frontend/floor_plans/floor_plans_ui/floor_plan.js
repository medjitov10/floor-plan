import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { angle, distance } from './lines/helper';
import Icon from './icon';
import IconDetail from './icon_detail';
import AboutToBuildLine from './lines/about_to_build_line';
import FloorPlanLines from './lines/floor_plan_lines';
import { fetchLines, createLine, deleteLine } from '../../actions/floor_plans';
import FloorPlanContext from './floor_plan_context';

class FloorPlan extends Component {
  static propTypes = {
    fetchLines: PropTypes.func.isRequired,
    icons: PropTypes.array.isRequired,
    slug: PropTypes.string.isRequired,
    segmentFlag: PropTypes.bool.isRequired,
    floor_plan: PropTypes.object.isRequired,
    closeTabs: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    planItemDetail: PropTypes.object.isRequired,
  }

  state = {
    marginTop: 0,
    icons: [],
    segments: [],
    segment: [],
    selected: -1,
    aboutToBuild: null,
    maxHeight: 0,
  }

  componentDidMount() {
    const { icons, slug, fetchLines } = this.props;
    fetchLines(slug);
    this.setState({
      icons,
      slug,
      maxHeight: this.setHeight(),
    }, () => this.setState({ marginTop: this.setMarginTop() }));
    window.addEventListener('resize', this.onDivResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onDivResize);
  }

  onDivResize = () => {
    this.setState({
      maxHeight: this.setHeight(),
    }, () => this.setState({ marginTop: this.setMarginTop() }));
  }

  onDivClick(e) {
    const {
      segmentFlag, floor_plan, color, category
    } = this.props;
    let x;
    let y;
    if (segmentFlag) {
      x = e.pageX - $('#floor-plan-ul').offset().left + $('#floor-plan-ul').scrollLeft();
      y = e.pageY - $('#floor-plan-ul').offset().top + $('#floor-plan-ul').scrollTop();
      const { segment } = this.state;
      const { createLine } = this.props;
      if (segment.length === 1) {
        const newLine = segment.concat([[x, y]]);
        const firstCoord = newLine[0][0] < newLine[1][0] ? newLine[0] : newLine[1];
        const direction = newLine[0][0] < newLine[1][0] ? 'right' : 'left';
        const line = {
          width: distance(newLine),
          top: firstCoord[1] - 3,
          left: firstCoord[0],
          angle: angle(newLine),
          floor_plan_id: floor_plan.floor_plan.id,
          direction,
          color,
          category,
        };
        createLine(line).then(() => {
          this.setState(() => ({
            segment: [],
          }));
        });
      } else {
        this.setState(() => ({
          segment: segment.concat([[x, y]]),
          aboutToBuild: null,
        }));
      }
    }
  }

  onDivMouseMove(e) {
    const { segmentFlag } = this.props;
    const { segment } = this.state;
    let x;
    let y;
    if (segmentFlag && (segment.length % 2 !== 0)) {
      x = e.pageX - $('#floor-plan-ul').offset().left + $('#floor-plan-ul').scrollLeft();
      y = e.pageY - $('#floor-plan-ul').offset().top + $('#floor-plan-ul').scrollTop();
      this.setState({ aboutToBuild: [x, y] });
    }
  }

  setMarginTop = () => {
    const a = (document.getElementById('floor-plan').offsetHeight
      - document.getElementById('floor-plan-ul').offsetHeight) / 2;
    return a > 0 ? a : 0;
  }

  setHeight = () => (document.getElementById('osman-test').offsetHeight - 34)

  static getDerivedStateFromProps(nextProps, nextState) {
    const { icons, slug } = nextState;
    if (nextProps.icons.length !== icons.length || slug !== nextProps.slug) {
      return {
        ...nextState,
        icons: nextProps.icons,
        slug: nextProps.slug,
        segments: nextProps.lines,
      };
    }
    return {
      ...nextState,
      slug: nextProps.slug,
      segments: nextProps.lines,
    };
  }

  selectedLine = (id) => {
    this.setState({ selected: id }, state => (state));
  }

  callback = (obj) => {
    const { icons } = this.state;
    this.setState({
      icons: icons.map(el => (el.id === obj.id ? obj : el)),
    });
  }

  render() {
    const {
      segment,
      segments,
      aboutToBuild,
      selected,
      marginTop,
      maxHeight,
      icons
    } = this.state;

    const {
      segmentFlag,
      closeTabs,
      floor_plan,
      planItemDetail,
      color,
      category,
      floorPlan,
      deleteLine,
    } = this.props;

    return (
      <FloorPlanContext.Provider value={{ planItemDetail, floorPlan }}>
        <div
          id='floor-plan'
          onClick={(e) => {
            this.onDivClick(e);
            closeTabs();
            this.setState({
              selected: -1,
            });
          }}
          onMouseMove={(e) => { this.onDivMouseMove(e); }}
          style={{
            width: '100%',
            overflow: 'scroll',
            position: 'relative',
            height: maxHeight,
          }}
        >
          <ul
            id='floor-plan-ul'
            className='floor-plans-ui-img'
            style={{
              marginTop: marginTop || 0,
              marginBottom: marginTop || 0,
              background: `url('${floor_plan.floor_plan.plan_url}')`,
            }}
          >
            {
              icons.map((icon, index) => (
                <Icon
                  key={icon.id}
                  index={icon.id}
                  angle={icon.angle}
                  left={icon.left}
                  top={icon.top}
                  color={icon.color}
                  radius={icon.radius}
                  icon_class={icon.icon_class}
                  category={icon.category}
                  rotate={icon.rotate}
                  id={icon.id}
                  icon={icon}
                  device_type={icon.device_type}
                  coverage_color={icon.coverage_color}
                />
              ))
            }
            {
              planItemDetail.icon
                && planItemDetail.icon.id
                && <IconDetail callback={this.callback} />
            }
            {
              aboutToBuild && segment.length === 1 && segmentFlag
                ? (
                  <AboutToBuildLine
                    color={color}
                    coord={segment}
                    aboutToBuild={aboutToBuild}
                    category={category}
                  />
                )
                : null
            }
            <FloorPlanLines
              selectedLine={this.selectedLine}
              selected={selected}
              deleteLine={deleteLine}
              segments={segments}
            />
          </ul>
        </div>
      </FloorPlanContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  planItemDetail: state.planItemDetail,
  floorPlan: state.floorPlan,
  lines: state.lines,
});


export default connect(mapStateToProps, { fetchLines, createLine, deleteLine })(FloorPlan);
