const inputId = document.querySelector('.input');
const butInput = document.querySelector('.butInp');
const divMain = document.querySelector('.main');
const divInput = document.querySelector('.divInput');
const divPost = document.querySelector('.divPost');

let adress1 = 'https://jsonplaceholder.typicode.com/posts/';
butInput.addEventListener('click', () => {
  if (inputId.value < 1 || inputId.value > 100) {
    alert('Введіть число від 1 до 100');
    inputId.value = '';
    return;
  }
  adress = adress1;
  adress = adress1 + inputId.value;
  post(adress);
  inputId.value = '';
});

async function post(adress) {
  try {
    const response = await fetch(adress);
    const json = await response.json();

    divPost.innerHTML = '';
    divPost.innerHTML = `<b>Пост:</b> ${json.title} `;

    const but = document.createElement('button');
    but.classList.add('butCom');
    but.innerText = 'Показати коментарі';
    divPost.appendChild(but);
    but.addEventListener('click', fetchData);
  } catch (error) {
    fetchError(error);
  }
}

async function fetchData() {
  try {
    let link = adress + '/comments';
    const response = await fetch(link);
    const json = await response.json();

    const divBlock = document.createElement('div');
    divPost.append(divBlock);
    divBlock.innerHTML = '';

    json.forEach((element, nom) => {
      const divComments = document.createElement('div');
      divComments.classList.add('divComments');
      divComments.innerHTML = `<b>${nom + 1} коментар: </b>  ${element.body}`;
      divBlock.appendChild(divComments);
    });
    const but = document.querySelector('.butCom');
    but.innerText = 'Сховати коментарі';
    but.classList.add('color');
    but.removeEventListener('click', fetchData);
    but.addEventListener('click', () => {
      divBlock.innerHTML = '';
      but.classList.remove('color');
      but.innerText = 'Показати коментарі';
      but.addEventListener('click', fetchData);
    });
  } catch (error) {
    fetchError(error);
  }
}

function fetchError(error) {
  const divErr = document.createElement('div');
  divErr.innerHTML = error.toString();
  divPost.append(divErr);
}
