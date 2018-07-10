import './style.css';

const { tilesImgs } = require('../debug/debuglib-web');

const div_brackets = document.querySelector('#brackets');
const div_tiles = document.querySelector('#tiles');
div_brackets.hidden = false;
tilesImgs.forEach((tile) => {
  let imgArr;
  if (Array.isArray(tile)) {
    imgArr = tile;
  } else {
    imgArr = [tile];
  }
  imgArr.forEach((img) => {
    const imgElement = document.createElement('img');
    imgElement.src = `res/${img}`;
    div_tiles.appendChild(imgElement);
  });
});
