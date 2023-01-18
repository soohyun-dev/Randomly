/**
 * @param {Number} 입력된 질문 갯수
 * @returns shuffle된 배열
 */
export const MakeNums = (number) => {
  const nums = Array.from({ length: number }, (_, i) => i + 1);
  console.log(shuffleArray(nums));
};

/**
 * @param {Array} 생성된 배열 순차적인 배열
 * @returns 입력된 배열 shuffle한 배열
 */
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
