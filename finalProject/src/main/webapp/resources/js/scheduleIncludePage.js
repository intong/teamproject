var id = $('#memberID').text();
// 채팅연결
function jeonjakua(no,partKo){
	var partner;
		window.open(
				'http://192.168.0.39/chatting/chat.go?m_id='+id+'&s_no='+no+'&s_part='+partKo,
				'window_name',
				'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400px,height=600px,top=300px,left=1000px'
		);
}

function ScheduleForLimit4(schedules) {
	var day = [];
	var dayResult =[];
	$.each(schedules.schedule, function(i,s) {
	
		day.push(s.s_stime.substring(0,10));	
	});
	
	
	$.each(day, function(i, el) {
		if($.inArray(el,dayResult)===-1)dayResult.push(el);
	});
	
	
	$.each(dayResult , function (i,d) {
		
		var th = $('<th></th>').attr("colspan","4").text(d);
		var tr_th = $('<tr></tr>').append(th);
		var thead = $('<thead></thead>').attr("class","boardHeader").append(tr_th);
		
		var tbody = $('<tbody></tbody>');
		$.each(schedules.schedule, function(i,v){
			
			var vday = v.s_stime.substring(0,10);
			
			var time = v.s_stime.substring(10,16);
			var content = v.s_content;
			var partID = v.s_part;
			var partKor = v.s_partKor;
			var no = v.s_no;
			if(d == vday){
				var td1 = $('<td></td>').attr("class","boardContent bcTime").text(time);
				var td2 = $('<td></td>').attr("class","boardContent bcContent").text(content);
				var span1 = $('<span></span>').text(partKor);
				var icon = $('<i></i>').attr('class','comments outline large icon').attr("onclick","jeonjakua("+no+','+"'"+partKor+"'"+");");
				//var span2 = $('<span></span>').attr("class","chat").attr("onclick","jeonjakua("+no+','+"'"+partKor+"'"+");").text("채팅");
				var td3 = $('<td></td>').attr("class","boardContent bcPartner").append(span1);
				var td4 = $('<td></td>').attr("class","boardContent bcPartner").append(icon);
				var tr_td = $('<tr></tr>').append(td1,td2,td3,td4);
				
				tbody.append(tr_td);
				
			}
		
			
			
			
		});
		
		
		var table = $('<table></table>').attr("class","ui collapsing table boardFrame").css("margin-bottom","20px").append(thead,tbody);
		$('#scheduleBoardFrame').append(table);
		
	});
	
	
}


// 게시판 스케줄  뿌리기
function spreadScheduleBoard(){
	$.ajax({
		url : "getScheduleBoardListLimit4",
		data : {s_id:id},
		success : function(scheduleBoard){
			
			ScheduleForLimit4(scheduleBoard);
				
				
			
			
			
			
			/*$.each(scheduleBoard.schedule, function(i,v){
				var day = v.s_stime.substring(0,10);
				var time = v.s_stime.substring(10,16);
				var content = v.s_content;
				var partID = v.s_part;
				var partKor = v.s_partKor;
				var no = v.s_no;
				
				
				var th = $('<th></th>').attr("colspan","4").text(day);
				var tr_th = $('<tr></tr>').append(th);
				var thead = $('<thead></thead>').attr("class","boardHeader").append(tr_th);
				
				
				var td1 = $('<td></td>').attr("class","boardContent bcTime").text(time);
				var td2 = $('<td></td>').attr("class","boardContent bcContent").text(content);
				var span1 = $('<span></span>').text(partKor);
				var icon = $('<i></i>').attr('class','comments outline large icon').attr("onclick","jeonjakua("+no+','+"'"+partKor+"'"+");");
				//var span2 = $('<span></span>').attr("class","chat").attr("onclick","jeonjakua("+no+','+"'"+partKor+"'"+");").text("채팅");
				var td3 = $('<td></td>').attr("class","boardContent bcPartner").append(span1);
				var td4 = $('<td></td>').attr("class","boardContent bcPartner").append(icon);
				var tr_td = $('<tr></tr>').append(td1,td2,td3,td4);
				var tbody = $('<tbody></tbody>').append(tr_td);
				
				
				
				var table = $('<table></table>').attr("class","ui collapsing table boardFrame").css("margin-bottom","20px").append(thead,tbody);
				$('#scheduleBoardFrame').append(table);
			});*/
		}	
	});
}

$(function(){
	spreadScheduleBoard();
});