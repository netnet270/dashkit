$(document).ready(function () {
  $('.goal-table').DataTable();
  menu();
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
        $('.js-submenu').slideUp(300);
        menuItem.children('.js-submenu').slideDown(400);
        $(this).addClass('navbar-link--active');
      } 
    })
  }
  
  function chartOrder(){
    var ctx = $('#orderChart');
    var chart = new Chart(ctx, {
      type: 'bar',
      options: {
        tooltips: {
         
          callbacks: {
            title: function(tooltipItem, data) {
              return data['labels'][tooltipItem[0]['index']];
            },  
            label: function(tooltipItem, data) {
              return 0;
            },

            afterLabel: function(tooltipItem, data) {
              var dataset = data['datasets'][0];
              var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
              return  percent + '%';
            }
          },

          backgroundColor: '#FFF',
          titleFontSize: 16,
          titleFontColor: '#0066ff',
          bodyFontColor: '#000',
          bodyFontSize: 14,
          borderWidth: 1,
          borderColor: '#ccc',
          displayColors: false
        },

        legend: {
          display:false
        },

        scales: {
          xAxes: [{
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            categoryPercentage: 9,
            minBarLength: 2,
            gridLines: {
              offsetGridLines: false,
              color: "#fff"
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function(ctx) {
                if (!(ctx % 10)) return "$" + ctx + "k"
              }
            }
          }]
        }
      },
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Sales",
          data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32],
          backgroundColor:"#2d7be5",
        },
        {
          label: "Affiliates",
          data: [25, 20, 15, 22, 17, 10, 18, 26, 28, 26, 20, 32],
          backgroundColor:"#000",
        }]
      }
    
    })
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
              hoverBorderColor: "transparent"
            }]
          },
  
          options: {
            cutoutPercentage: 85,
            legend: {
              display:false
            },
            tooltips: {
              callbacks: {
                title: function(a, e) {
                  return e.labels[a[0].index]
                },
                label: function(a, e) {
                  var t = "";
                  return t += e.datasets[0].data[a.index] + "%"
                }
              }
            }
          }
      });
    })
  }

  function chartPerformance(){
    $('.js-performance-chart').each(function(){
      dataSet = $(this).attr("datasets");
      parseDataset = JSON.parse(dataSet); 

      var chart = new Chart( $(this), {
        type: "line",
        options: {
          scales: {
            yAxes: [{
              ticks: {
                callback: function(a) {
                    if (!(a % 10)) return "$" + a + "k"
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(a, e) {
                var t = e.datasets[a.datasetIndex].label || "",
                  o = a.yLabel,
                  r = "";
                return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "k</span>"
              }
            }
          }
        },
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
              label: "Performance",
              data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40]
          }]
        }
      });
    })
  }