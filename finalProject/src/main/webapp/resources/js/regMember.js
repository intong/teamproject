function goJoin(){
	var ok = false;
	var form = document.joinSubmit;	
	var id = $('.id').val();
	var pw = $('.pw').val();
	var name = $('.name').val();
	var birth = $('.birth').val();
	
	if (id == "") {
		alert('아이디를 입력해 주세요.');
	}else if(pw == ""){
		alert('비밀번호를 입력해 주세요.');
	}else if(name == ""){
		alert('이름을 입력해 주세요.');
	}else if(birth == ""){
		alert('생년월일을 입력해 주세요.');
	}else{
		ok = true;
	}
	if (ok) {		
		form.submit();
	}
}


// 뒤로 가기 방지
//뒤로가기 방지
function dontBack(){
	window.history.forward();
	function noBack(){window.history.forward();}
}



$(function(){
	dontBack();
});



