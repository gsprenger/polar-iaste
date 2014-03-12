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
function displayChart(data, config, margin) {
  if (config == null) {
    config = {
      scaleShowLabels: false,
      scaleShowLine: false,
    };
  }
  if (margin == null) {
    margin = 0;
  }
  new Chart($("#canvas").get(0).getContext("2d"), margin).PolarArea(data, config);
  $('pre').text(JSON.stringify(data, null, '\t'));
}

function getCustomAreaFormHTML(id) {
  return "" +
    "<div class='well well-sm custom-input' id='custom-input-"+id+"'>\n" +
      "\tRange: [<input type='text' id='custom-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='custom-max"+id+"' class='max' placeholder='100'>], value: " +
      "<input type='text' id='custom-value"+id+"' class='val'>, "+
      "angle: <input type='text' id='custom-angle"+id+"' class='angle' placeholder='90'>&deg;, " +
      "Unit: <input type='text' id='custom-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-custom-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='custom-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

function get4x2AreaFormHTML(id) {
  return "" +
    "<div class='well well-sm 4x2-input' id='4x2-input-"+id+"'>\n" +
      "\tRange: [<input type='text' id='4x2-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='4x2-max"+id+"' class='max' placeholder='100'>], value: " +
      "<input type='text' id='4x2-value"+id+"' class='val'>, "+
      "Unit: <input type='text' id='4x2-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-4x2-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='4x2-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

// init 4x2 zone
function init8Zone() {
  var html = '';
  for (var i=0; i<8; i++) {
    html += get4x2AreaFormHTML(i, '4x2', true) +
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
    $('.4x2-input').each(function(i, el) {
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
        value: +($(this).find('.val').val() ? $(this).find('.val').val() : 10*i+20),
        max:   +($(this).find('.max').val() ? $(this).find('.max').val() : 100),
        angle: +($(this).find('.angle').val() ? $(this).find('.angle').val() : 25),
        unit:  ($(this).find('.unit').val() ? $(this).find('.unit').val() : ''),
        color: $(this).find('.color').val(),
        name: 'test'
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
    displayChart(chartData, {
      scaleShowLabels: false,
      scaleShowLine: true,
      scaleShowXYAxis: true,
      showLabels: true
    }, 50);
  });
}

// init Custom zone
function initCustomZone() {
  var html = '', cnt;
  for (cnt=0; cnt<4; cnt++) {
    html += getCustomAreaFormHTML(cnt, 'custom');
  }
  $(html).insertAfter($('#custom-btn-group'));
  var updateAnglePlaceholder = function() {
    var val = 360 / $('.custom-input .angle').length;
    $('.custom-input .angle').each(function() {
      $(this).attr('placeholder', val);
    })
  };
  $('#more').click(function () {
    $(getCustomAreaFormHTML(cnt++, 'custom')).insertBefore('#custom-btn-container');
    initColorPickers();
    updateAnglePlaceholder();
  });
  $('#less').click(function () {
    $('.custom-input').last().remove();
    updateAnglePlaceholder();
    cnt--;
  });
  $('#generate-custom').click(function () {
    var chartData = [], tmp;
    $('.custom-input').each(function(el, i) {
      chartData.push({
        min:   +($(this).find('.min').val() ? $(this).find('.min').val() : 0),
        value: +($(this).find('.val').val()),
        max:   +($(this).find('.max').val() ? $(this).find('.max').val() : 100),
        angle: +($(this).find('.angle').val() ? $(this).find('.angle').val() : $(this).find('.angle').attr('placeholder')),
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
