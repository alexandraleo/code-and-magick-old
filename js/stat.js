'use strict'

window.renderStatistics = function(ctx, names, times) {
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 70);

  var max = -1;
  var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }
  var histogramHeight = 150;
  var histogramWidth = 40;
  var indent = 50;
  var initialX = 120;
  var initialY = 100;
  var step = histogramHeight / max;
  console.log(names);
  console.log(names.indexOf('Вы'));

  for (var i = 0; i < times.length; i++) {
      if (names[i] === 'Вы') {
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }
      else {
        var alpha = Math.random();
        ctx.globalAlpha = alpha.toFixed(1);
        console.log(alpha);
        ctx.fillStyle = 'rgb(0, 0, 255)';
      };
    ctx.fillRect(initialX + (indent + histogramWidth / 2) * i, initialY - times[i] * step + histogramHeight, histogramWidth, times[i] * step);
  }
};
