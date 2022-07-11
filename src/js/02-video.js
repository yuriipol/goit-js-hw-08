import Player from '@vimeo/player'; // импорт библиотек
import throttle from 'lodash.throttle'; // импорт библиотек

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
//отслеживаем событие timeupdate и вешаем на фукуию throttle
player.on(
  'timeupdate',
  throttle(function (data) {
    console.log('played the video!');
    //зписываем в localStorage из обьекта значение секунд data.seconds
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }),
  500
);
//берем название ролика
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
//вызываем созданную нами функцию
chekedSaveTime();

function chekedSaveTime() {
  //создаем перменную time и записываем в нее значение из localStorage
  const time = localStorage.getItem('videoplayer-current-time');
  if (time !== null) {
    //если не равно null, то на player вешаем его встроенную фукцию setCurrentTime с переменной
    //time, которую преобразуем в число с помощью Number
    player.setCurrentTime(Number(time));
  }
}
