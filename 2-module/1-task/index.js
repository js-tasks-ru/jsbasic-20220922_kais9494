function sumSalary(salaries) {
  let sum = 0;
  for (let salary in salaries) {
    if (Number.isFinite(salaries[salary])) {
      sum += salaries[salary];
    }
  }
  return sum;
}