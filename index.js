var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var caption_text_box = document.getElementById('captionTextBox');
var uploadImgSrc;

var ctx = canvas.getContext('2d');

caption_text_box.addEventListener('change', () => {
  console.log(caption_text_box.value);
  generate();
}, false);

function loadLocalImage(e) {
  var fileData = e.target.files[0];
  if (!fileData.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  }

  var reader = new FileReader();
  reader.onload = function() {
    uploadImgSrc = reader.result;
    canvasDraw();
  };
  reader.readAsDataURL(fileData);
}

file.addEventListener('change', loadLocalImage, false);
var img;
function canvasDraw(imgSrc) {
  img = new Image();
  img.src = uploadImgSrc;
  img.onload = function() {
    generate();
  }
}

function generate() {
  var w = img.width;
  var h = img.height;

  if (w / 16 * 9 < h)
    h = w / 16 * 9;
  else
    w = h / 9 * 16
    console.log(img.width);
  console.log(img.height);
  console.log(w);
  console.log(h);
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, canvas.width, canvas.width);
  ctx.drawImage(img, -(img.width - w) / 2, -(img.height - h) / 2);

  var sh = canvas.width / 2.35;
  var space_height = (canvas.height - sh) / 2;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, space_height);
  ctx.fillRect(0, space_height + sh, canvas.width, space_height);
  addText();

  var data = canvas.toDataURL();
  var outputImg = document.createElement('img');
  outputImg.src = data;
  document.getElementById('result').appendChild(outputImg);
}

function addText() {
  var font_size = canvas.height / 17;
  ctx.font = `bold ${font_size}px cinecaption226`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.strokeStyle = 'black';
  ctx.strokeWidth = 1;
  ctx.strokeText(
      caption_text_box.value, canvas.width / 2,
      canvas.height - font_size * 1.3);

  ctx.fillStyle = 'white';
  ctx.fillText(
      caption_text_box.value, canvas.width / 2,
      canvas.height - font_size * 1.3);

}
