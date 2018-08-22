import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFloorPlans, fetchLines } from '../../actions/floor_plans';

class LinkToPlans extends Component {
  render() {
    const {
      floor_plan,
      floor_plans,
      fetchFloorPlans,
      fetchLines
    } = this.props;
    const filteredFloorPlans = floor_plan && floor_plans.filter(f => (
      f.location_id === floor_plan.location_id
    ))
    return (
      <div
        style={{
          overflow: 'scroll',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '50%',
          marginRight: '8px',
        }}
      >
        {
          floor_plan ?
            filteredFloorPlans.sort((a, b) => {
              let attrA;
              let attrB;
              attrA = parseInt(a.floor.split('').filter(el => (
                el.charCodeAt() > 47 && el.charCodeAt() < 60 ? el : null
              )).join(''), 10);
              attrB = parseInt(b.floor.split('').filter(el => (
                el.charCodeAt() > 47 && el.charCodeAt() < 60 ? el : null
              )).join(''), 10);
              if (a.floor.toUpperCase().includes('BASEMENT')) {
                attrA = -1;
              }
              if (b.floor.toUpperCase().includes('BASEMENT')) {
                attrB = -1;
              }
              if (a.floor.toUpperCase().includes('ROOF')) {
                attrA = 10000;
              }
              if (b.floor.toUpperCase().includes('ROOF')) {
                attrB = 10000;
              }
              if (attrA < attrB) {
                return -1;
              }
              if (attrA > attrB) {
                return 1;
              }
              return 0;
            }).map(el => (
              <Link
                key={el.slug}
                style={{
                  borderRadius: filteredFloorPlans.length === 1 ? '6px' : null,
                }}
                to={`/floor_plans/${el.slug}`}
                onClick={() => {
                  fetchFloorPlans(el.slug);
                  fetchLines(el.slug);
                }}
                className={
                  floor_plan.id === el.id ? 'floor-plans-links active' : 'floor-plans-links'
                }
              >
                {el.floor}
              </Link>
            )) : null
        }
      </div>
    );
  }
}

export default connect(null, { fetchFloorPlans, fetchLines })(LinkToPlans);
