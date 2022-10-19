function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  btn.addEventListener('click', (e) => {
    let text = document.querySelector('#text');
    text.hidden = !text.hidden;
  })
}
