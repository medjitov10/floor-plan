import React from 'react';
import moment from 'moment-timezone';

export const flashMessage = text => {
  return $('#flash_messages')
    .css('display', 'block')
    .html(
      `<div class="alert alert-info alert-dismissable" id="flash_container"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>${text}.</div>`
    )
    .delay(2000)
    .fadeOut('slow');
};

export const date = data => {
  data = moment
    .tz(data, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format();
  const newDate = new Date(data);
  const month =
    newDate.getMonth() > 9
      ? newDate.getMonth() + 1
      : `0${newDate.getMonth() + 1}`;
  const day =
    newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`;
  const year = newDate.getFullYear();
  return `${month}-${day}-${year}`;
};

export const time = arg => {
  arg = moment
    .tz(arg, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format();
  const hour = parseInt(arg.split('T')[1].slice(0, 2));
  const minutes = arg.split('T')[1].slice(3, 5);
  const what = hour > 12 && hour < 24 ? 'PM' : 'AM';
  return `${
    hour / 12 && hour % 12 === 0 >= 1 ? 12 : hour % 12
  }:${minutes} ${what}`;
};

export const header = str => (
  <div className="page-header dash">
    <h4>{str}t</h4>
  </div>
)
