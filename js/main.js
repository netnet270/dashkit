$(window).on('load', function(){

  sidebarCollapse();
  menu();
  
  //chart
  $('.js-chart').each(function(){
    dataLabel = $(this).attr("labels");
    dataSet = $(this).attr("dataset");
    
    parseDataset = JSON.parse(dataSet); 
    parseDataLabel = JSON.parse(dataLabel);

    var chart = new Chart( $(this), {
        type: 'doughnut',
        
        data: {
          labels: parseDataLabel,
          datasets: [{
            data: parseDataset,
            borderColor: '#252830',
            backgroundColor: ['#1ca8dd', '#1bc98e'],
            borderWidth: 2,
            hoverBorderColor: "transparent"
          }]
        },

        options: {
          cutoutPercentage: 80,
          responsive: true,
          legend: {
           display:false
          }
        }
    });
  })

  $(".js-stats-canvas").each(function () {
    dataSet = $(this).data("dataset");
    new Chart($(this), {
      type: 'line',
      data: {
        datasets: [
          {
            fill: !0,
            backgroundColor: "rgba(255,255,255,.3)",
            borderColor: "#fff",
            pointBorderColor: "#fff",
            lineTension: .25,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 20,
            data: dataSet,
          }
        ],
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      },
      options: {
        animation: {
          duration: 0
        },
        legend: {
          display: !1
        },
        scales: {
          xAxes: [{
            display: !1
          }],
          yAxes: [{
            display: !1
          }]
        },
        tooltips: {
          enabled: !1
        }
      }
    });
  });

  $(window).resize(function () { 
    if($(this).width() > 768 ) {
      $(".js-sidebar-collapse").show();
    }
  });
})

  // sidebar-collapse

  function sidebarCollapse(){
    $('.js-btn-toggle').on('click', function(){
      $('.js-sidebar-collapse').slideToggle();
    })
  }
  
  function menu(){
    $('.js-navbar-link').on('click', function(){
      if($(this).hasClass('navbar-link--active')){

      }
      else{
        $('.js-submenu').slideUp();
      }
    })
  }
  