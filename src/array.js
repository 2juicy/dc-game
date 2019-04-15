export function range(start, end) {
  return Array.apply(0, Array(end + 1 - start)).map(function(val, index) {
    return index + start;
  });
}

export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}
