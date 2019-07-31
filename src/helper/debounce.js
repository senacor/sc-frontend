export const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA')
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
