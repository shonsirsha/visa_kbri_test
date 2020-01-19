const isEmpty = str => {
  return str === null || str.match(/^ *$/) !== null;
};

export default isEmpty;
