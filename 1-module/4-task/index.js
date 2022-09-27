function checkSpam(str) {
  str = str.toLowerCase();
  let spams = ['xxx', '1xbet'];
  for (let spam of spams) {
    if (str.includes(spam)) {
      return true;
    }
  }
  return false;
}
