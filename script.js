$(document).ready(function(){

	var duration = "";
	var doDuration = "";

	$(document).on('click', '#menu_toggle', function(){

		if($(this).hasClass("active")){

			$(this).removeClass("active")
			$(".main_container").removeClass("active").addClass("inactive")

		}else{

			$(this).addClass("active")
			$(".main_container").addClass("active").removeClass("inactive")
		}
	})

	function getData(time){

		var self = this;

		if(!time){

			this.duration = 'week';
		}else{

			this.duration = time;
		}

		var barChartData = '';

		$.ajax({
			method: 'GET',
			url: 'data.json',
		}).done(function(response){

			var schedule = self.duration.toLowerCase();
			barChartData = response.visitors[0][schedule];
			getGraphDetails(barChartData);

		}).error(function(error){

			console.log("Error ", error)
		})
	}

	function getdonutData(time){

		var self = this;

		if(!time){

			this.doDuration = 'week';
		}else{

			this.doDuration = time;
		}

		var barChartData = '';

		$.ajax({
			method: 'GET',
			url: 'data.json',
		}).done(function(response){

			var schedule = self.doDuration.toLowerCase();
			barChartData = response.activities[0][schedule];
			getDonutGraph(barChartData);

		}).error(function(error){

			console.log("Error ", error)
		})
	}

	function getLineData(time){

		var self = this;

		if(!time){

			this.doDuration = 'week';
		}else{

			this.doDuration = time;
		}

		var barChartData = '';

		$.ajax({
			method: 'GET',
			url: 'data.json',
		}).done(function(response){

			var schedule = self.doDuration.toLowerCase();
			barChartData = response.postviews[0][schedule];
			getLineGraph(barChartData);

		}).error(function(error){

			console.log("Error ", error)
		})
	}

	function getGraphDetails(chatData){

		var ele = document.getElementById("canvas-main").getContext("2d");

		window.myBar = new Chart(ele, {

	        type: 'bar',
	        data: chatData,
	        options: {
	            elements: {
	                rectangle: {
	                    borderWidth: 1,
	                    borderColor: 'rgb(0, 255, 0)',
	                    borderSkipped: 'bottom'
	                }
	            },
	            responsive: true,
	            legend: {
	                position: 'top',
	            },
	            title: {
	                display: true,
	                text: 'Social Media Visitors'
	            }
	        }
	    });
	}

	function getDonutGraph(dataD){

		var ele = document.getElementById("canvas-sub").getContext("2d");
		window.myDoughnut = new Chart(ele, {

			 type: 'doughnut',
			 data: dataD,
			 options: {
	            responsive: true,
	            legend: {
	                position: 'top',
	            },
	            title: {
	                display: true,
	                text: 'Social Media Activities'
	            },
	            animation: {
	                animateScale: true,
	                animateRotate: true
	            }
	        }
		});	
	}

	function getLineGraph(data){

		var ele = document.getElementById("canvas-sub1").getContext("2d");
		window.myDoughnut = new Chart(ele, {

			type:'line',
			data:data,
			options: {
                responsive: true,
                title:{
                    display:true,
                    text:'Social Media Post Views'
                },
                hover: {
                    mode: 'dataset'
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        },
                        ticks: {
                            suggestedMin: -10,
                            suggestedMax: 250,
                        }
                    }]
                }
            }

		})

	}

	function getNotifications(){

		var html = "";

		$.ajax({
			method: 'GET',
			url: 'data.json',
		}).done(function(response){

			var messages = response.messages;

			$.each(messages, function(index){

				var message = messages[index];
				html += '<li class="notification-item"><div class="user-img pull-left"><img src="'+message.imageUrl+'" /></div><div class="user-msg"><h5>'+message.sender+'</h5><div class="msg">'+message.message+'</div></div></li>';
			})
			
			$(".notifications-list").html(html);
		}).error(function(error){

			console.log("Error ", error)
		})
	}

	getData();
	getdonutData();
	getLineData();
	getNotifications();


	$(document).on('change', '.select-time', function(){

		var value = $(".select-time").val()

		getData(value);
	})

	$(document).on('change', '.select-sub-time', function(){

		var value = $(".select-sub-time").val()

		getdonutData(value);
	})

	$(document).on('change', '.select-sub1-time', function(){

		var value = $(".select-sub1-time").val()

		getLineData(value);
	})

})