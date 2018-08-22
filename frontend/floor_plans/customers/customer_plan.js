import React, { Component } from 'react';
import { date, time } from './../../util/util';
import { withRouter } from 'react-router-dom';

export const CustomerPlan = withRouter(({
    history, customer_plan, index,
    onDeleteClick, onUpdateClick, clearFloorPlan
  }) => {

  const promise = new Promise((resolve)=> {
    if ( clearFloorPlan() instanceof Object) {
      resolve();
    }
  });


  return (
      <tr className='customer-floor-plan'
        onClick={() => {
          promise.then( () => {
            history.push(`/floor_plans/${customer_plan.slug}`);
          });
        }}>
        <td>{index+1}</td>
        <td>{customer_plan.name}</td>
        <td>{date(customer_plan.updated_at)}</td>
        <td>{time(customer_plan.updated_at)}</td>
        <td>{customer_plan.floor}</td>
        <td style={{textAlign: 'center'}} onClick={ (e) => e.stopPropagation() }>
          <i onClick={(e) => onUpdateClick(e, customer_plan)}
            className="fa fa-lg fa-pencil-square-o" aria-hidden="true"></i>
          <i onClick={(e) => onDeleteClick(e, customer_plan.id)}
            className="fa fa-lg fa-trash-o" aria-hidden="true"
            style={{marginLeft: '10px'}}
          ></i>
        </td>
      </tr>
  );
});
