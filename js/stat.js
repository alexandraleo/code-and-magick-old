'use strict';

window.renderStatistics = function (ctx, names, times) {
  var positionX = 100;
  var positionY = 10;
  var blockOffset = 10;
  var blockWidth = 420;
  var blockHeight = 270;
  var textMarginLeft = 120;

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(positionX + blockOffset, positionY + blockOffset, blockWidth, blockHeight);
  ctx.fillRect(positionX + blockOffset, positionY + blockOffset, blockWidth, blockHeight);

  ctx.fillStyle = 'white';
  ctx.strokeRect(positionX, positionY, blockWidth, blockHeight);
  ctx.fillRect(positionX, positionY, blockWidth, blockHeight);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', textMarginLeft, 40);
  ctx.fillText('Список результатов:', textMarginLeft, 70);

  var max = -1;
  var percent = 1;

  for (var i = 0; i < times.length; i++) {
    times.sort(compareNumeric);
    max = times[times.length - 1];
    percent = times[i] / max;

    var histogram = {
      height: 150,
      width: 40,
      indent: 50,
      initialX: 120,
      initialY: 250
    };
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
    return 1;
  }
  function getBarX() {
    return histogram.initialX + (histogram.indent + histogram.width) * i;
  }
  function getBarY() {
    return histogram.initialY - percent * histogram.height;
  }
};
