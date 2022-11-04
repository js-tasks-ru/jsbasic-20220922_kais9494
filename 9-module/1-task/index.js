export default function promiseClick(button) {
  let promise = new Promise(function (resolve, reject) {
    button.addEventListener('click', (e) => {
      resolve(e);
    }, { once: true })
  });
  return promise.then();
}
