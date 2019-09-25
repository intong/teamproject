// 채팅연결
function addChat(){
	var partner;
	$('#chat').click(function(){
		var id = $('#memberID').text();
		window.open(
				'http://192.168.0.39/chatting/chat.go?m_id='+id+'&s_no=1&s_part=강남길',
				'window_name',
				'width=400px,height=600px,directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,top=300px,left=1000px'
		);
	});
}

// 스케줄등록 페이지로 이동
function moveRegSchedule(){
	location.href="regSchedule";
}


$(function(){
	addChat();
});