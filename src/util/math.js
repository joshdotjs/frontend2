export function sum (arr) {
  const reducer = (accumulator, current_val) => accumulator + current_val;
  return arr.reduce(reducer, 0);
}

// ==============================================