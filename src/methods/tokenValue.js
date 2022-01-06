const tokenValue = document.cookie
  .replace(/(?:(?:^|.*;\s*)SpaceCoffeeToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

export default tokenValue;
