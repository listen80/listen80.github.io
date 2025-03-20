export function each(arr, fn) {
  var i = 0;
  while (arr[i]) {
    fn(arr[i], i);
    i++;
  }
}
