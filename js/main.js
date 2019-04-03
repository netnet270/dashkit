$(document).ready(function () {
  $('.goal-table').DataTable();

  $('[data-toggle="tooltip"]').tooltip();  

  $(".nav-tabs a").click(function(){
    $(this).tab('show');
  })
  
  // menu();
  chartOrder();
  chartDevices();
  chartPerformance(); 
})
  // sidebar-collapse

  function menu(){
    $('.js-navbar-link').on('click', function(){
      var menuItem = $(this).parent('.js-navbar-item');

      if($(this).hasClass('navbar-link--active')){
        $(this).removeClass('navbar-link--active');
      }
      
      else{
        $('.js-navbar-link').removeClass('navbar-link--active')
        $('.collapse').removeClass('show');
        $(this).addClass('navbar-link--active');
      } 
    })
  }
  
  function chartOrder(){
    var _chart1;
    function drawOrder(_data) {
      _chart1 = new Chart(document.getElementById('orderChart'), {
        type: "bar",
        data: _data,
        options: {
          tooltips: {
            enabled: false,
            mode: "index",
            intersect: false,
            custom: function (r) {
              var a = $("#chart-tooltip");
              if (a.length || (a = $('<div id="chart-tooltip" class="popover bs-popover-top" role="tooltip"></div>'), $("body").append(a)), 0 !== r.opacity) {
                if (r.body) {
                  var e = r.title || [],
                    l = r.body.map(function (a) {
                      return a.lines
                    }),
                    n = "";
                  n += '<div class="arrow"></div>', e.forEach(function (a) {
                    n += '<h3 class="popover-header text-center">' + a + "</h3>"
                }), l.forEach(function (a, e) {
                  var t = '<span class="popover-body-indicator" style="background-color: ' + r.labelColors[e].backgroundColor + '"></span>',
                    o = 1 < l.length ? "justify-content-left" : "justify-content-center";
                  n += '<div class="popover-body d-flex align-items-center ' + o + '">' + t + a + "</div>"
                }), a.html(n)
              }
              var t = $(this._chart.canvas),
                o = (t.outerWidth(), t.outerHeight(), t.offset().top),
                s = t.offset().left,
                i = a.outerWidth(),
                c = a.outerHeight(),
                d = o + r.caretY - c - 16,
                u = s + r.caretX - i / 2;
              a.css({
                top: "calc(" + d + "px - 1.5%)",
                left: u + "px",
                display: "block"
              })
            } else a.css("display", "none")
          },
          callbacks: {
            label: function (a, e) {
              var t = e.datasets[a.datasetIndex].label || "",
                o = a.yLabel,
                r = "";
              return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>"
            },
            labelColor: function (tooltipItem, chart) {
              return {
                backgroundColor: '#2C7BE5'
              };
            }
          }
        },
        scales: {
          xAxes: [{
            barThickness: 10,
            ticks: {
              fontWeight: 700,
              fontSize: 13,
              fontColor: '#90a0b7',
            },
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            ticks: {
              fontWeight: 700,
              fontSize: 14,
              fontColor: '#90a0b7',
              beginAtZero: true,
              callback: function (a) {
                if (!(a % 10)) return "$" + a + "k"
              }
            },
            gridLines: {
              drawBorder: false,
              borderDash: [2, 4],
              color: "#e6edf7"
            }
          }]
        },
        legend: {
          display: false,
        }
      }
    })
  }

  var tooltip = $('[data-toggle="tooltip"]');
  tooltip.length && tooltip.tooltip();

  var dataOrder = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Sales",
      data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32],
      backgroundColor: "#2c7be5",
      borderColor: "#2c7be5",
    }]
  }

  drawOrder(dataOrder);

  $("#cardToggle").change(function (e) {
    if ($(this).is(':checked')) {
      dataOrder.datasets.push(
        {
          data: [15, 10, 20, 12, 7, 0, 8, 16, 18, 16, 10, 22],
          backgroundColor: "#d2ddec",
          label: "Affiliate"
        }
      )
    } else {
      dataOrder.datasets.splice(-1, 1);
    }
    _chart1.update();
  });

  }

  function chartDevices(){
    $('.js-devices-chart').each(function(){
      dataSet = $(this).attr("datasets");
      parseDataset = JSON.parse(dataSet); 

      var chart = new Chart( $(this), {
          type: 'doughnut',
          
          data: {
            labels: ["Desktop", "Tablet", "Mobile"],
            datasets: [{
              data: parseDataset['datasets'],
              backgroundColor: ["#2d7be5" ,"#a6c5f7" ,"#d2ddec"],
            }]
          },
  
          options: {
            cutoutPercentage: 85,
            legend: {
              display:false
            }
          }
      });
    })
  
  }

  function chartPerformance(){

    $('.js-performance-chart').each(function(){
      var ctx = $(this);
      dataSet = $(this).attr("datasets");
      parseDataset = JSON.parse(dataSet); 
      var chart = new Chart( ctx, {
        type: 'line',
          options: {
            elements: {
              point:{
                radius: 0
              },
          },
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                gridLines: {
                  drawBorder: false,
                  borderDash: [2, 2],
                },
                ticks: {
                  beginAtZero: true,
                  callback: function(ctx) {
                    if (!(ctx % 10)) return "$" +" " + ctx + "k"
                  },
                  fontColor: "#a9afb9",
                  scaleFontSize: 20
                }
              }],
              xAxes: [{
                barPercentage: 0.5,
                barThickness: 30,
                maxBarThickness: 10,
                categoryPercentage: 9,
                minBarLength: 2,
                gridLines: {
                  offsetGridLines: false,
                  color: "#fff",
                },
                ticks: {
                  fontColor: "#a9afb9",
                  fontFamily: "Cerebri Sans",
                  scaleFontSize: 20,
                  lineDashType: "dash"
              },
              }],
            }
          },
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: "Performance",
              fill : false,
              borderColor : "#2c7be5",
              data: parseDataset['datasets']
            }]
          }
      });
    })
  }