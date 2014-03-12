// Random chart data generation
function randomChartData() {
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
  return randomChart;
}

// display chart
function displayChart(data) {
  new Chart($("#canvas").get(0).getContext("2d")).PolarArea(data, {
    scaleShowLabels: false
  });
  $('pre').text(JSON.stringify(data, null, '\t'));
}

function getAreaFormHTML(id, suffix, showAngle) {
  return "" +
    "<div class='well well-sm "+suffix+"-input' id='"+suffix+"-input-"+id+"'>\n" +
      "\tRange: [<input type='text' id='"+suffix+"-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='"+suffix+"-max"+id+"' class='max' placeholder='100'>], value: " +
      "<input type='text' id='"+suffix+"-value"+id+"' class='val'>, "+
      (showAngle?"":"angle: <input type='text' id='"+suffix+"-angle"+id+"' class='angle' placeholder='90'>&deg;, ") +
      "Unit: <input type='text' id='"+suffix+"-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-"+suffix+"-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='"+suffix+"-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

// init 4x2 zone
function init8Zone() {
  var html = '';
  for (var i=0; i<8; i++) {
    html += getAreaFormHTML(i, '4x2', true) +
      (i%2==0||i==7 ? "" : "<hr>");
  }
  $('#4x2').prepend(html);
  $('.colorpicker').each(function(el, i) {
    var colorField = '#f-'+$(this).attr('id');
    $(this).farbtastic(colorField);
    $(this).hide();
    var that = this;
    $(colorField).focus(function() {
      $(that).show();
    });
    $(colorField).blur(function() {
      $(that).hide();
    });
  });
  $('#generate-4x2').click(function () {
    var chartData = [], tmp;
    $('.4x2-input').each(function(el, i) {
      chartData.push({
        min:   0,
        value: 0,
        max:   100,
        angle: 10,
        unit:  '',
        color: '#ffffff'
      });  
      chartData.push({
        min:   +($(this).find('.min').val() ? $(this).find('.min').val() : 0),
        value: +($(this).find('.val').val()),
        max:   +($(this).find('.max').val() ? $(this).find('.max').val() : 100),
        angle: +($(this).find('.angle').val() ? $(this).find('.angle').val() : 25),
        unit:  ($(this).find('.unit').val() ? $(this).find('.unit').val() : ''),
        color: $(this).find('.color').val()
      });   
      chartData.push({
        min:   0,
        value: 0,
        max:   100,
        angle: 10,
        unit:  '',
        color: '#ffffff'
      });   
    });
    displayChart(chartData);
  });
}

// init Custom zone
function initCustomZone() {
  var html = '', cnt;
  for (cnt=0; cnt<4; cnt++) {
    html += getAreaFormHTML(cnt, 'custom');
  }
  $(html).insertAfter($('#custom-btn-group'));
  $('#more').click(function () {
    $(getAreaFormHTML(cnt++, 'custom')).insertBefore('#custom-btn-container');
    initColorPickers();
  });
  $('#less').click(function () {
    $('.custom-input').last().remove();
    cnt--;
  });
  $('#generate-custom').click(function () {
    var chartData = [], tmp;
    $('.custom-input').each(function(el, i) {
      chartData.push({
        min:   +($(this).find('.min').val() ? $(this).find('.min').val() : 0),
        value: +($(this).find('.val').val()),
        max:   +($(this).find('.max').val() ? $(this).find('.max').val() : 100),
        angle: +($(this).find('.angle').val() ? $(this).find('.angle').val() : 90),
        unit:  ($(this).find('.unit').val() ? $(this).find('.unit').val() : ''),
        color: $(this).find('.color').val()
      });    
    });
    displayChart(chartData);
  });  
}

function initColorPickers() {
  $('.colorpicker').each(function(el, i) {
    var colorField = '#f-'+$(this).attr('id');
    $(this).farbtastic(colorField);
    $(this).hide();
    var that = this;
    $(colorField).focus(function() {
      $(that).show();
    });
    $(colorField).blur(function() {
      $(that).hide();
    });
  });
}

function saveImg() {
  document.location.href = ($("#canvas").get(0).toDataURL()).replace("image/png", "image/octet-stream");
}

$(document).ready(function() {
  init8Zone();
  initCustomZone();
  initColorPickers();

  $('#savetoimg').click(function() {
    saveImg();
  });

  $('#random').click(function() {
    displayChart(randomChartData());
  });

  $('#random').click();
});
