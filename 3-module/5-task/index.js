function getMinMax(str) {
  nums = str.split(' ')
    .map(el => parseFloat(el))
    .filter(el => el)
    .sort((a, b) => a - b);
  return {
    min: nums[0],
    max: nums[nums.length - 1]
  }
}
