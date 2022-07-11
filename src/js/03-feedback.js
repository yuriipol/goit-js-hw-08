import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const textareaMessage = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', onFormSubmint);
form.addEventListener('input', throttle(onFormInput, 500));

populateTextInput(); //вызов фукции, которая подставляет значения из localStorage

function onFormSubmint(event) {
  event.preventDefault();
  //деструктуризация и вывод в консоль обьекта введенных данных
  const {
    elements: { email, message },
  } = event.currentTarget;
  const dataObj = { email: email.value, message: message.value };

  console.log(dataObj);
  //очистка input and textarea
  event.currentTarget.reset();
  //очистка localStorage
  localStorage.removeItem('feedback-form-state');
}

function onFormInput() {
  //делаем дистриктуризацию
  const {
    elements: { email, message },
  } = form;
  //сздаем обьект и присваиваем ему введенные значения input and textarea
  const dataObj = { email: email.value, message: message.value };
  //записываем обьект в localStorage, но при это с помощью JSON.stringify преобразуем его в строку
  localStorage.setItem('feedback-form-state', JSON.stringify(dataObj));
}
//фукции, которая подставляет значения из localStorage в input and textarea
function populateTextInput() {
  //создаем переменную, в которую записываем значение из localStorage
  const savedText = localStorage.getItem('feedback-form-state');
  //преобразуем значение в обьект
  parseText = JSON.parse(savedText);
  //если в localStorage есть savedText, то присваиваем input and textarea значения из обьекта parseText
  if (savedText) {
    inputEmail.value = parseText.email;
    textareaMessage.value = parseText.message;
  }
}
