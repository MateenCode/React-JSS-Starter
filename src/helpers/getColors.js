export const getColors = (data, name) => {

  let colors = {};

  data && data.forEach(item => {
    colors = {
      [item.name]: item.value,
      ...colors,
    }
  });

  return colors[name];
}
