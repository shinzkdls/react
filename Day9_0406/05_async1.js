async function sigma(limit) {
  sum = 0;
  for (i = 1; i <= limit; i++) {
    sum += i;
  }
  return sum; // asynd에 의해서 무조건 promise객체로 바끄ㅟ어ㅔ
}

async function showDisplay() {
  //console.log(sigma(100));

  // sigma(100).then((result) => {
  //   console.log(result);
  // }
  let result = await sigma(1000);
  console.log(result);
}

showDisplay();
