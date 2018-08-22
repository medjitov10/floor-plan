export const distance = (arr) => {
  const x1 = arr[0][0];
  const y1 = arr[0][1];
  const x2 = arr[1][0];
  const y2 = arr[1][1];
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
};

export const angle = (arr) => {
  const order = arr[0][0] < arr[1][0] ? 0 : 1;
  const x1 = arr[order][0];
  const y1 = arr[order][1];
  const x2 = arr[(order + 1) % 2][0];
  const y2 = arr[(order + 1) % 2][1];
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
};

export const angle2 = (arr) => {
  const a = arr[0];
  const b = arr[1];
  return Math.atan2(a[1] - b[1], a[0] - b[0]) * 180 / Math.PI + 180;
};
