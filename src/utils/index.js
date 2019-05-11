export const initStage = (row, col, data) => {
  return Array(row).fill(null).map(() => Array(col).fill(data));
}

export const sortStage = (ROW, COL, stage) => {
  range(ROW * COL, 1).shuffle().forEach((v, i) => {
    const row = Math.floor(i / ROW);
    const col = i % COL
    stage[row][col] = { number: v, checked: false }
  })
  return stage
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt)
}

Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
}

export const checkNumber = (number, stage) => {
  stage.forEach(row => {
    row.forEach(block => {
      if (block.number === number) block.checked = true;
    })
  })
  return stage
}

export const getBlockStatus = (currentPlayer, location, tableRect, block) => {
  const { stage } = currentPlayer;
  const { pageX, pageY } = location;
  const { top, left } = tableRect;
  const { size, row, col } = block;

  if (pageX < left || pageX > (left + size * row) ||
    pageY < top || pageY > (top + size * col)
  ) return null;
  return stage[parseInt((pageY - top) / size)][parseInt((pageX - left) / size)]
}

export const countBingo = stage => {
  let bingoCount = 0;
  // 행검사
  stage.forEach(row => {
    const checkeds = row.filter(block => block.checked === true);
    if (checkeds.length === 5) bingoCount++
  })
  // 열검사
  stage.forEach((row, i) => {
    let colCount = 0;
    row.forEach((_, j) => {
      if (stage[j][i].checked) colCount++;
    })
    if (colCount === 5) bingoCount++;
  })
  // 왼쪽 대각선 검사
  const leftDiagonal = stage.filter((_, i) => stage[i][i].checked === true)
  if (leftDiagonal.length === 5) bingoCount++;

  // 오른쪽 대각선 검사
  const rightDiagonal = stage.filter((row, i) => {
    return stage[row.length - (i + 1)][i].checked === true
  })
  if (rightDiagonal.length === 5) bingoCount++;
  return bingoCount
}