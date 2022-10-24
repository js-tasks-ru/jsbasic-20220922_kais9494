/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.data = rows;
    this.elem = document.createElement('table');
    this.tBody = document.createElement('tbody');


    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('button')) {
        let row = e.target.closest('tr')
        this.deleteRow(row)
      }
    })
    this.create()

  }
  create() {
    this.elem.innerHTML = `<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>`;
    this.elem.append(this.tBody)
    this.data.forEach(obj => {
      this.addRow(obj);
    });
  }

  addRow(rowObj) {
    let innerTr = '';
    for (let item of Object.values(rowObj)) {
      innerTr += `<td>${item}</td>`;
    }
    innerTr += `<td><button>x</button></td>`;
    let tr = document.createElement('tr');
    tr.innerHTML = innerTr;
    this.tBody.append(tr);
  }
  deleteRow(row) {
    row.remove()
  }
}
