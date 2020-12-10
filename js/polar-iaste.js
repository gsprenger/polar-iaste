/********************
**   CUSTOM AREA   **
********************/
function getCustomAreaFormHTML(id) {
  return "" +
    "<div class='well well-sm custom-input' id='custom-input-"+id+"'>\n" +
      "\tRange: [<input type='text' id='custom-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='custom-max"+id+"' class='max' placeholder='100'>], Value: " +
      "<input type='text' id='custom-value"+id+"' class='val'>, "+
      "Angle: <input type='text' id='custom-angle"+id+"' class='angle' placeholder='90'>&deg;, " +
      "Unit: <input type='text' id='custom-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-custom-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='custom-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

function initCustomZone() {
  var html = '', cnt;
  for (cnt=0; cnt<4; cnt++) {
    html += getCustomAreaFormHTML(cnt);
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

/********************
**     4x2 AREA    **
********************/
function get4x2AreaFormHTML(id) {
  return "" +
    "<div class='well well-sm 4x2-input' id='4x2-input-"+id+"'>\n" +
      "\tName: <input type='text' id='4x2-name"+id+"' class='name'>, "+
      "Range: [<input type='text' id='4x2-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='4x2-max"+id+"' class='max' placeholder='100'>], Value: " +
      "<input type='text' id='4x2-value"+id+"' class='val'>, "+
      "Unit: <input type='text' id='4x2-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-4x2-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='4x2-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

function init4x2Zone() {
  var html = '';
  for (var i=0; i<8; i++) {
    html += (i%2==0 ? "Section: <input type='text' id='4x2-section"+i+"' class='section'>" : "") +
      get4x2AreaFormHTML(i) +
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
        name: ($(this).find('.name').val() ? $(this).find('.name').val() : ''),
        section: ($('#4x2-section'+i).length ? $('#4x2-section'+i).val(): '')
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
      showLabels: true,
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0
    }, 100);
  });
}

/********************
**     4x3 AREA    **
********************/
function get4x3AreaFormHTML(id) {
  return "" +
    "<div class='well well-sm 4x3-input' id='4x3-input-"+id+"'>\n" +
      "\tName: <input type='text' id='4x3-name"+id+"' class='name'>, "+
      "Range: [<input type='text' id='4x3-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='4x3-max"+id+"' class='max' placeholder='100'>], Value: " +
      "<input type='text' id='4x3-value"+id+"' class='val'>, "+
      "Unit: <input type='text' id='4x3-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-4x3-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='4x3-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

function init4x3Zone() {
  var html = '';
  for (var i=0; i<12; i++) {
    html += (i%3==0 ? "Section: <input type='text' id='4x3-section"+i+"' class='section'>" : "") +
      get4x3AreaFormHTML(i) +
      (i%3==0||i%3==1||i==11 ? "" : "<hr>");
  }
  $('#4x3').prepend(html);
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
  $('#generate-4x3').click(function () {
    var chartData = [], tmp;
    $('.4x3-input').each(function(i, el) {
      chartData.push({
        min:   0,
        value: 0,
        max:   100,
        angle: 7,
        unit:  '',
        color: '#ffffff'
      });  
      chartData.push({
        min:   +($(this).find('.min').val() ? $(this).find('.min').val() : 0),
        value: +($(this).find('.val').val() ? $(this).find('.val').val() : 8*i+10),
        max:   +($(this).find('.max').val() ? $(this).find('.max').val() : 100),
        angle: +($(this).find('.angle').val() ? $(this).find('.angle').val() : 16),
        unit:  ($(this).find('.unit').val() ? $(this).find('.unit').val() : ''),
        color: $(this).find('.color').val(),
        name: ($(this).find('.name').val() ? $(this).find('.name').val() : ''),
        section: ($('#4x3-section'+i).length ? $('#4x3-section'+i).val(): '')
      });   
      chartData.push({
        min:   0,
        value: 0,
        max:   100,
        angle: 7,
        unit:  '',
        color: '#ffffff'
      });   
    });
    displayChart(chartData, {
      scaleShowLabels: false,
      scaleShowLine: true,
      scaleShowXYAxis: true,
      showLabels: true,
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0
    }, 100);
  });
}

/********************
**     5x2 AREA    **
********************/
function get5x2AreaFormHTML(id) {
  return "" +
    "<div class='well well-sm 5x2-input' id='5x2-input-"+id+"'>\n" +
      "\tName: <input type='text' id='5x2-name"+id+"' class='name'>, "+
      "Range: [<input type='text' id='5x2-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='5x2-max"+id+"' class='max' placeholder='100'>], Value: " +
      "<input type='text' id='5x2-value"+id+"' class='val'>, "+
      "Unit: <input type='text' id='5x2-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-5x2-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='5x2-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

function init5x2Zone() {
  var html = '';
  for (var i=0; i<10; i++) {
    html += (i%2==0 ? "Section: <input type='text' id='5x2-section"+i+"' class='section'>" : "") +
      get5x2AreaFormHTML(i) +
      (i%2==0||i==9 ? "" : "<hr>");
  }
  $('#5x2').prepend(html);
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
  $('#generate-5x2').click(function () {
    var chartData = [], tmp;
    $('.5x2-input').each(function(i, el) {
      chartData.push({
        min:   0,
        value: 0,
        max:   100,
        angle: 8,
        unit:  '',
        color: '#ffffff'
      });  
      chartData.push({
        min:   +($(this).find('.min').val() ? $(this).find('.min').val() : 0),
        value: +($(this).find('.val').val() ? $(this).find('.val').val() : 8*i+10),
        max:   +($(this).find('.max').val() ? $(this).find('.max').val() : 100),
        angle: +($(this).find('.angle').val() ? $(this).find('.angle').val() : 20),
        unit:  ($(this).find('.unit').val() ? $(this).find('.unit').val() : ''),
        color: $(this).find('.color').val(),
        name: ($(this).find('.name').val() ? $(this).find('.name').val() : ''),
        section: ($('#5x2-section'+i).length ? $('#5x2-section'+i).val(): '')
      });   
      chartData.push({
        min:   0,
        value: 0,
        max:   100,
        angle: 8,
        unit:  '',
        color: '#ffffff'
      });   
    });
    displayChart(chartData, {
      scaleShowLabels: false,
      scaleShowLine: true,
      scaleShowQuintAxis: true,
      showLabels: true,
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0
    }, 100);
  });
}

/********************
**     2x* AREA    **
********************/
function get2xNAreaFormHTML(id) {
  return "" +
    "<div class='well well-sm 2x-n-input' id='2x-n-input-"+id+"'>\n" +
      "\tName: <input type='text' id='2x-n-name"+id+"' class='name'>, "+
      "Range: [<input type='text' id='2x-n-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='2x-n-max"+id+"' class='max' placeholder='100'>], Value: " +
      "<input type='text' id='2x-n-value"+id+"' class='val'>, "+
      "Unit: <input type='text' id='2x-n-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-2x-n-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='2x-n-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

function get2xSAreaFormHTML(id) {
  return "" +
    "<div class='well well-sm 2x-s-input' id='2x-s-input-"+id+"'>\n" +
      "\tName: <input type='text' id='2x-s-name"+id+"' class='name'>, "+
      "Range: [<input type='text' id='2x-s-min"+id+"' class='min' placeholder='0'>, " +
      "<input type='text' id='2x-s-max"+id+"' class='max' placeholder='100'>], Value: " +
      "<input type='text' id='2x-s-value"+id+"' class='val'>, "+
      "Unit: <input type='text' id='2x-s-unit"+id+"' class='unit'>,\n"+
      "\t<div class='colorselect'>\n" +
        "\t\tColor: <input type='text' id='f-2x-s-color"+id+"' value='#123456' class='color'>\n" +
        "\t\t<div id='2x-s-color"+id+"' class='colorpicker'></div>" +
      "</div>" +
    "</div>";
}

function init2xZone() {
  var htmlN="",
      htmlS="",
      cnt, cntN=3, cntS=3;
  for (cnt=0; cnt<3; cnt++) {
    htmlN += get2xNAreaFormHTML(cnt);
    htmlS += get2xSAreaFormHTML(cnt);
  }
  $(htmlN).appendTo($('#2x-section-north'));
  $(htmlS).appendTo($('#2x-section-south'));
  $('#2x-n-more').click(function () {
    $(get2xNAreaFormHTML(cntN++)).appendTo($('#2x-section-north'));
    initColorPickers();
  });
  $('#2x-n-less').click(function () {
    if ($('.2x-n-input').length > 1) {
      $('.2x-n-input').last().remove();
      cntN--;
    }
  });
  $('#2x-s-more').click(function () {
    $(get2xSAreaFormHTML(cntN++)).appendTo($('#2x-section-south'));
    initColorPickers();
  });
  $('#2x-s-less').click(function () {
    if ($('.2x-s-input').length > 1) {
      $('.2x-s-input').last().remove();
      cntS--;
    }
  });
  $('#generate-2x').click(function () {
    var chartData = [], tmp,
        angleN = (180 / $('.2x-n-input').length) - 16,
        angleS = (180 / $('.2x-s-input').length) - 16;
    var genChartData = function(i, el, angle, suf) {
          chartData.push({
            min:   0,
            value: 0,
            max:   100,
            angle: 8,
            unit:  '',
            color: '#ffffff'
          });  
          chartData.push({
            min:   +($(el).find('.min').val() ? $(el).find('.min').val() : 0),
            value: +($(el).find('.val').val() ? $(el).find('.val').val() : 8*i+30),
            max:   +($(el).find('.max').val() ? $(el).find('.max').val() : 100),
            angle: angle,
            unit:  ($(el).find('.unit').val() ? $(el).find('.unit').val() : ''),
            color: $(el).find('.color').val(),
            name: ($(el).find('.name').val() ? $(el).find('.name').val() : ''),
            section: ($('#2x-section-'+suf).length ? $('#2x-section-'+suf).val(): '')
          });   
          chartData.push({
            min:   0,
            value: 0,
            max:   100,
            angle: 8,
            unit:  '',
            color: '#ffffff'
          });   
        }
    $('.2x-n-input').each(function(i, el) {
      genChartData(i, el, angleN, 'n');
    });
    $('.2x-s-input').each(function(i, el) {
      genChartData(i, el, angleS, 's');
    });
    displayChart(chartData, {
      scaleShowLabels: false,
      scaleShowLine: true,
      scaleShowXAxis: true,
      startAngle: -Math.PI,
      sectionMargin: 25,
      showLabels: true,
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0
    }, 100);
  });  
}

/********************
**     TEXT AREA    **
********************/
function initTextZone() {
  $('#generate-text').click(function () {
    var option, data;
    data = JSON.parse($('#text-area').val())
    option = $('#text-select').val()
    margin = 100;
    config = {
      scaleShowLabels: false,
      scaleShowLine: true,
      showLabels: true,
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0
    };
    switch(option) {
      case 'Custom':
        margin = 0;
        config.scaleShowLine = false;
        config.showLabels = false;
        break;
      case '4x2':
      case '4x3':
        config.scaleShowXYAxis = true;
        break;
      case '5x2':
        config.scaleShowQuintAxis = true;
        break;
      case '2x*':
        config.scaleShowXAxis = true;
        config.startAngle = -Math.PI;
        config.sectionMargin = 25;
        break;
      default:
        break;
    }
    displayChart(data, config, margin)
  });
}


/********************
** SERVICE METHODS **
********************/
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
  console.log(config)
  new Chart($("#canvas").get(0).getContext("2d"), margin).PolarArea(data, config);
  $('#text-area').val(JSON.stringify(data, null, '\t'));
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

/********************
**      MAIN       **
********************/
$(document).ready(function() {
  initCustomZone();
  init4x2Zone();
  init4x3Zone();
  init5x2Zone();
  init2xZone();
  initTextZone()
  initColorPickers();

  $('#savetoimg').click(function() {
    saveImg();
  });

  $('#random').click(function() {
    displayChart(randomChartData());
  });

  $('#random').click();
});
