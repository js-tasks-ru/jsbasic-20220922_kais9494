function showSalary(users, age) {
  let str = '';
  for (user of users) {
    if (user.age <= age) {
      str += user.name + ', ' + user.balance + '\n';
    }
  }
  if (str.length) str = str.slice(0, str.length - 1)
  return str;
}