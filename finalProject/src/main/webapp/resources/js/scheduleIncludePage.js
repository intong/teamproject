var id = $('#memberID').text();


// 채팅연결
function addChat(){
	var partner;
	$('#chat').click(function(){
		window.open(
				'http://192.168.0.39/chatting/chat.go?m_id='+id+'&s_no=1&s_part=강남길',
				'window_name',
				'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400px,height=600px,top=300px,left=1000px'
		);
	});
}

//// 게시판 스케줄 JSON 가져오기
//function getScheduleBoardJSON(){
//	location.href="getScheduleBoardListLimit4?s_id="+id;
//}


// 게시판 스케줄  뿌리기
function spreadScheduleBoard(){
	$.ajax({
		url : "getScheduleBoardListLimit4",
		data : {s_id:id},
		success : function(scheduleBoard){
			$.each(scheduleBoard.schedule, function(i,v){
				var day = v.s_stime.substring(0,10);
				var time = v.s_stime.substring(10,16);
				var content = v.s_content;
				var partID = v.s_part;
				var partKor = v.s_partKor;
				
				var th = $('<th></th>').attr("colspan","3").text(day);
				var tr_th = $('<tr></tr>').append(th);
				var thead = $('<thead></thead>').attr("class","boardHeader").append(tr_th);
				var td1 = $('<td></td>').attr("class","boardContent bcTime").text(time);
				var td2 = $('<td></td>').attr("class","boardContent bcContent").text(content);
				var span1 = $('<span></span>').text(partKor);
				var span2 = $('<span></span>').attr("id","chat").text("채팅");
				var td3 = $('<td></td>').attr("class","boardContent bcPartner").append(span1,span2);
				var tr_td = $('<tr></tr>').append(td1,td2,td3);
				var tbody = $('<tbody></tbody>').append(tr_td);
				var table = $('<table></table>').attr("class","ui collapsing table boardFrame").append(thead,tbody);
				$('#scheduleBoardFrame').append(table);
			});
		}	
	});
}


$(function(){
	addChat();
	spreadScheduleBoard();
});