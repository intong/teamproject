var sec = 0;

// 로그아웃하러 가기
function logoutGo(){
	$('#logoutBTN').click(function(){
		var conf = confirm('정말로 나가시겠습니까?');
		if (conf) {
			location.href = "logout";
		}		
	});
}

// 홈버튼
function goHome(){
	$('#logoDIV').click(function(){
		location.href = "/fp/";
	});
}

// 오늘 일짜 가져오기
function getToday(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	if(month < 10) month = "0"+month;
	var day = date.getDate();
	var week = date.getDay();
	var week2 = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
	var print = year + ". " + month + ". " + day +"  ";
	$('#today').append(print);
	if (week == 0) {
		$('#today').append(week2[week]).css('color','red').css("font-weight","bold");		
	}else if(week == 6){
		$('#today').append(week2[week]).css('color','blue').css("font-weight","bold");
	}else{
		$('#today').append(week2[week]).css("font-weight","bold");
	}
}

// 오늘 날씨 가져오기
function getWeather(){
	var lat;
	var lon;
	var temp;
	var condition;
	var getIP = "http://ip-api.com/json/";
	var getWeather; 
	$.getJSON(getIP,function(dataip){
		lat = dataip.lat;
		lon = dataip.lon;
		getWeather = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=aca3593e1f5288f88114a54e1f9fc385&units=metric&lang=kr"; 
		$.getJSON(getWeather,function(data){
			temp = data.main.temp;
			icon = data.weather[0].icon
			//alert(data.weather[0].description);
			$('#imgweather').attr('src',"http://openweathermap.org/img/wn/"+icon+"@2x.png");
			$('#temp').append(temp);
		});
	});
}

// FullCalendar
function getCalendar(){
	$('#calendar').fullCalendar({
	      header: {
	        left: 'prev,next today',
	        center: 'title',
	        right: 'month,agendaWeek,agendaDay'
	      },
	      defaultDate: '2018-03-12',
	      navLinks: true, // can click day/week names to navigate views
	      selectable: true,
	      selectHelper: true,
	      select: function(start, end) {
	        var title = prompt('Event Title:');
	        var eventData;
	        if (title) {
	          eventData = {
	            title: title,
	            start: start,
	            end: end
	          };
	          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
	        }
	        $('#calendar').fullCalendar('unselect');
	      },
	      editable: true,
	      eventLimit: true, // allow "more" link when too many events
	      events: [
	        {
	          title: 'All Day Event',
	          start: '2018-03-01'
	        },
	        {
	          title: 'Long Event',
	          start: '2018-03-07',
	          end: '2018-03-10'
	        },
	        {
	          id: 999,
	          title: 'Repeating Event',
	          start: '2018-03-09T16:00:00'
	        },
	        {
	          id: 999,
	          title: 'Repeating Event',
	          start: '2018-03-16T16:00:00'
	        },
	        {
	          title: 'Conference',
	          start: '2018-03-11',
	          end: '2018-03-13'
	        },
	        {
	          title: 'Meeting',
	          start: '2018-03-12T10:30:00',
	          end: '2018-03-12T12:30:00'
	        },
	        {
	          title: 'Lunch',
	          start: '2018-03-12T12:00:00'
	        },
	        {
	          title: 'Meeting',
	          start: '2018-03-12T14:30:00'
	        },
	        {
	          title: 'Happy Hour',
	          start: '2018-03-12T17:30:00'
	        },
	        {
	          title: 'Dinner',
	          start: '2018-03-12T20:00:00'
	        },
	        {
	          title: 'Birthday Party',
	          start: '2018-03-13T07:00:00'
	        },
	        {
	          title: 'Click for Google',
	          url: 'http://google.com/',
	          start: '2018-03-28'
	        }
	      ]
	    });
}

$(function(){
	logoutGo();
	goHome();
	getToday();
	getWeather();
	getCalendar();
});