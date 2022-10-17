function filterRange(arr, a, b) {
  let newArr = arr.filter(el => {
    return (el >= a && el <= b) ? true : false;
  })
  return newArr;
}
