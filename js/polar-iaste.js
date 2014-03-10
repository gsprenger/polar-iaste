// Random chart generation
var randomChart = [], amount;
amount = +(Math.random()*10).toFixed()+1;
angles = (function() {
  var tab = [],
      sum = 0, 
      total = 360;
  for (var i=0; i<amount; i++) {
    tab[i] = +(Math.random()*100).toFixed();
  }
  for (var i=0; i<amount; i++) {
    sum += tab[i];
  }
  for (var i=0; i<amount; i++) {
    tab[i] = (tab[i]/sum)*total;
  }
  return tab;
})();
for (var i=0; i<amount; i++) {
  randomChart.push({
    min: 0,
    value: +(Math.random()*100).toFixed(),
    max: 100,
    angle: angles[i],
    unit: "kg",
    color: '#'+Math.floor(Math.random()*16777215).toString(16)
  });
}

$(document).ready(function() {
  var chartData = randomChart;
  var myPolarArea = new Chart(document.getElementById("canvas").getContext("2d")).PolarArea(chartData, {
    scaleShowLabels: false,
    scaleShowLine: false
  });
  $('pre').text(JSON.stringify(chartData, null, '\t'));
});
