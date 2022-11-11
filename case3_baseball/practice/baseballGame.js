function baseballGame(nums, i) {
  let ball = 0
  let strike = 0
  let out = 0

  nums.forEach((num, i) => {
    if (answer.includes(num)) {
      if (num === answer[i]) {
        strike++
      } else {
        ball++
      }
    } else {
      out++
    }
  })

  return [strike, ball, out]
}
