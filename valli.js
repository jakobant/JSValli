var ccolor = ['rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)']

var urlParams = new URLSearchParams(window.location.search);

/**
 * Plugin: Manipulate z-index of the chart
 */
AmCharts.addInitHandler(function(chart) {
  if (AmCharts.nestedChartHolder === undefined)
    AmCharts.nestedChartHolder = {};

  if (chart.bringToFront === true) {
    chart.addListener("init", function(event) {
      var chart = event.chart;
      var div = chart.div;
      var parent = div.parentNode;
      if (AmCharts.nestedChartHolder[parent] === undefined)
        AmCharts.nestedChartHolder[parent] = [];
      AmCharts.nestedChartHolder[parent].push(chart);
      
      chart.div.addEventListener('mousemove', function() {
        var x = Math.abs(chart.mouseX - (chart.realWidth / 2));
        var y = Math.abs(chart.mouseY - (chart.realHeight / 2));
        var r = Math.sqrt(x*x + y*y);
        var smallChart;
        var smallRadius;
        for(var i = 0; i < AmCharts.nestedChartHolder[parent].length; i++) {
          var checkChart = AmCharts.nestedChartHolder[parent][i];
          
          if((checkChart.radiusReal < r) || (smallRadius < checkChart.radiusReal)) {
            checkChart.div.style.zIndex = 1;
          }
          else {
            if (smallChart !== undefined)
              smallChart.div.style.zIndex = 1;
            checkChart.div.style.zIndex = 2;
            smallChart = checkChart;
            smallRadius = checkChart.radiusReal;
          }
          
        }
      }, false);
    });
  }

}, ["pie"]);

/**
 * Read csv and populate Chart
 */
console.log(urlParams.get('csv'));
var plays = [];
if (urlParams.has('csv')) {
  d3.csv(urlParams.get('csv'), function(rows) {
    plays = rows;
    doStuff();
  });
} else {
  d3.csv("play.csv", function(rows) {
    plays = rows;
    doStuff();
  });
}

document.getElementById('randomizeData').addEventListener('click', function() {
  console.log('click');
  doStuff();
});

function shuffleExtra(array) {
  var num = Math.floor(Math.random() * 15 + 1);
  var nume = Math.floor(Math.random() * 50 + 1);
  console.log(num);
  console.log(nume);
  var findex = array[0];
  var nindex = array[1];
  array[0] = "";
  if (num != 14) {
    array[1] = "X marks the Spot";
  }
  var currentIndex = array.length, temporaryValue, randomIndex;
  if (nume == 49) {
    for (i=0; i < array.length; i++) {
      array[i] = findex;
    }
  } else {
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }
  return array;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function doStuff() {
var anames = [];
var arules = [];
var aextras = [];
for (i=0; i < plays.length; i++) {
 anames.push(plays[i].name);
 arules.push(plays[i].rules);
 aextras.push(plays[i].extra);
}
anames = shuffle(anames);
arules = shuffle(arules);
aextras = shuffleExtra(aextras);
var extras = [];
var names = [];
var todo = [];
console.log(aextras);
for (i=0; i < plays.length; i++) {
  if (aextras[i] == "" || aextras[i]==null) {
    extras.push({"title": aextras[i], "value": 100, "color": "#090E0F"});
  } else {
    extras.push({"title": aextras[i], "value": 100, "color": "#ee1000"});
  }
  names.push({"title": anames[i], "value": 100, "color": ccolor[i]});
  todo.push({"title": arules[i], "value": 100, "color": ccolor[i]});
}

//Randomize the animation
var one = Math.floor(Math.random() * 7 + 1);
var two = Math.floor(Math.random() * 7 + 1);
var three = Math.floor(Math.random() * 7 + 1);
AmCharts.makeChart("chart2", {
  "type": "pie",
  "responsive": { "enabled": true },
  "bringToFront": true,
  "dataProvider": extras,
  "startDuration": one,
  "pullOutRadius": 0,
  "color": "#fff",
  "fontSize": 10,
  "titleField": "title",
  "valueField": "value",
  "colorField": "color",
  "labelRadius": -50,
  "labelColor": "#fff",
  "radius": 150,
  "innerRadius": 50,
  "outlineAlpha": 0.5,
  "outlineThickness": 1,
  "labelText": "[[title]]",
  "balloonText": "[[title]]"
});
AmCharts.makeChart("chart3", {
  "type": "pie",
  "responsive": { "enabled": true },
  "bringToFront": true,
  "dataProvider": names,
  "startDuration": two,
  "pullOutRadius": 0,
  "color": "#fff",
  "fontSize": 14,
  "titleField": "title",
  "valueField": "value",
  "colorField": "color",
  "labelRadius": -50,
  "labelColor": "#fff",
  "radius": 250,
  "innerRadius": 150,
  "outlineAlpha": 1,
  "outlineThickness": 1,
  "labelText": "[[title]]",
  "balloonText": "[[title]]"
});

AmCharts.makeChart("chart4", {
  "type": "pie",
  "responsive": { "enabled": true },
  "bringToFront": true,
  "dataProvider": todo,
  "startDuration": three,
  "pullOutRadius": 0,
  "color": "#fff",
  "fontSize": 14,
  "bold": true,
  "titleField": "title",
  "valueField": "value",
  "colorField": "color",
  "labelRadius": -50,
  "labelColor": "#fff",
  "radius": 350,
  "innerRadius": 250,
  "outlineAlpha": 1,
  "outlineThickness": 1,
  "labelText": "[[title]]",
  "balloonText": "[[title]]",
  "allLabels": [{
    "text": "Drink until you die!",
    "bold": true,
    "size": 18,
    "color": "#ffffff",
    "x": 0,
    "align": "center",
    "y": 20
  }]
});
}
