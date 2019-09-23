// input 값 유효성 검사하여 form 태그 로그인 시키기
function loginDo(){
	var ok = true;
	var id = $('#id').val();
	var pw = $('#pw').val();
	var form = document.loginSubmit;
	
	if (id == "") {
		ok = false;
		alert('아이디를 입력해 주세요');
	}else if(pw == ""){
		ok = false;
		alert('비밀번호를 입력해 주세요');
	}else{
		ok = true;
	}
	if (ok) {
		form.submit();
	}
}





$(function(){
	
});