function namify(users) {
  let arr = [];
  users.forEach(user => {
    arr.push(user.name);
  })
  return arr;
}
