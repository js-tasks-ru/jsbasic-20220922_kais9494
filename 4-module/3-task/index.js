function highlight(table) {
  let theadRow = table.tHead.querySelector('tr');
  let statusIndex, genderIndex, ageIndex;
  for (let td of theadRow.cells) {
    switch (td.innerText) {
      case 'Gender':
        genderIndex = td.cellIndex;
        break;
      case 'Age':
        ageIndex = td.cellIndex;
        break;
      case 'Status':
        statusIndex = td.cellIndex;
        break;
    }
  }

  let allRows = table.rows;
  for (let i = 1; i < allRows.length; i++) {
    tr = allRows[i]
    for (let td of tr.cells) {
      switch (td.cellIndex) {
        case statusIndex:

          if (td.dataset.available === 'true') {
            tr.classList.add('available')
          } else if (td.dataset.available === 'false') {
            tr.classList.add('unavailable')
          } else if (td.dataset.available === undefined) {
            tr.hidden = true
          }
          break;
        case genderIndex:
          if (td.innerText === 'f') {
            tr.classList.add('female')
          } else if (td.innerText === 'm') {
            tr.classList.add('male')
          }
          break;
        case ageIndex:
          if (+td.innerText < 18) {
            tr.style.textDecoration = 'line-through'
          }
          break;
      }
    }
  }
}
