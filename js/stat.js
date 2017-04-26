'use strict';

window.renderStatistics = function (ctx, names, times) {
  var positionX = 100;
  var positionY = 10;
  var blockOffset = 10;
  var blockWidth = 420;
  var blockHeight = 270;


  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(positionX + blockOffset, positionY + blockOffset, blockWidth, blockHeight);
  ctx.fillRect(positionX + blockOffset, positionY + blockOffset, blockWidth, blockHeight);

  ctx.fillStyle = 'white';
  ctx.strokeRect(positionX, positionY, blockWidth, blockHeight);
  ctx.fillRect(positionX, positionY, blockWidth, blockHeight);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';

  var text = 'Ура, вы победили!';
  var textMarginLeft = 120;
  var textMarginTop = 40;

  function writeMessage() {
    ctx.fillText(text, textMarginLeft, textMarginTop);
  }
  writeMessage();
  text = 'Список результатов:';
  textMarginTop = 70;
  writeMessage();

  var max = -1;
  var percent = 1;
  var histogram = {
    height: 150,
    width: 40,
    indent: 50,
    initialX: 120,
    initialY: 250
  };
  function draw() {
    for (var i = 0; i < times.length; i++) {
      times.sort(compareNumeric);
      max = times[times.length - 1];
      percent = times[i] / max;

      if (names[i] !== 'Вы') {
        var alpha = Math.random();
        ctx.fillStyle = 'rgba(0, 0, 255,' + alpha + ')';
      } else {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }

      ctx.fillRect(getBarX(), getBarY(), histogram.width, percent * histogram.height);
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'black';
      ctx.fillText(Math.floor(times[i]), getBarX(), getBarY() - histogram.indent / 3);  // Про время;
      ctx.fillText(names[i], getBarX(), histogram.initialY + histogram.indent / 10);  // Про имена;
    }

    function compareNumeric(a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    }
    function getBarX() {
      return histogram.initialX + (histogram.indent + histogram.width) * i;
    }
    function getBarY() {
      return histogram.initialY - percent * histogram.height;
    }
  }
  draw(histogram);
};
