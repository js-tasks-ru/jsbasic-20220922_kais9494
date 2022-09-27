function factorial(n) {
  let factorial = 1;
  while (n != 0) {
    factorial = factorial * n--;
  }
  return factorial;
}
