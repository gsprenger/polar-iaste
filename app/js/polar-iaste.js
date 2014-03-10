var chartData = [], amount;
amount = +(Math.random()*10).toFixed()+1;
for (var i=0; i<amount; i++) {
  chartData.push({
    min: 0,
    value: +(Math.random()*100).toFixed(),
    max: 100,
    angle: 2*Math.PI/amount,
    unit: "kg",
    color: '#'+Math.floor(Math.random()*16777215).toString(16)
  });
}

$(document).ready(function() {
  var myPolarArea = new Chart(document.getElementById("canvas").getContext("2d")).PolarArea(chartData, {
    scaleShowLabels: false,
    scaleShowLine: false
  });
  $('pre').text(JSON.stringify(chartData, null, '\t'));
});
