<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>건강 수정</title>
<script type="text/javascript" src="resources/JQ/JQuery.js"></script>
<script type="text/javascript">
$(function() {
	//db에 있는 값 불러오기
		//1안 : db값을 다시 input value 값으로 수정해야함 (성공)
		//2안:db값 받아서 바로 checked로 수정해버리자.  ( 그럼 if가 21개...)
	  	//checked
		   //$("input:radio[name='fruits']:radio[value='사과']").prop('checked', true); // 선택하기
	
	//db값
	var sleepar1= ["1","3","6","8.1","10","12","13"];
	var exerar1= ["1","2.1","3","4","5","6"];
	var drinkar1= ["1.1","3","5","6"];
	var fastar1= ["2.1","4","6","7"];
	//input  value		
	var  sleepar2=["1","2","3","4","5","6","7"];
	var  exerar2=["1","2","3","4","5","6"];
	var  drinkar2=["1","2","3","4"];
	var  fastar2=["1","2","3","4"];
   $.getJSON("biorythm.update.json", function(data) {
	   //alert(JSON.stringify(data));
	   $.each(data.bio,function(io, o){
		   //sleep
	   $.each(sleepar1,function(i, m){
		   //alert(i);
		  //alert(o.w_sleep);
		   if(o.w_sleep==m){
			   $("input:radio[name='sleep']:radio[value="+sleepar2[i]+"]").prop('checked', true);
			   return false;
		   }else{return true;}
	   });
	   	//exercise
	   	$.each(exerar1,function(i, m){
		   if(o.w_exer==m){
			   $("input:radio[name='exercise']:radio[value="+exerar2[i]+"]").prop('checked', true);
			   return false;
		   }else{return true;}
	   });
	   	
	   	//drink
			   //alert(o.w_drink)
	   	$.each(drinkar1,function(i, m){
		   if(o.w_drink==m){
			   $("input:radio[name='drink']:radio[value="+drinkar2[i]+"]").prop('checked', true);
			   return false;
		   }else{return true;}
	   });
	   	
	   	//fast
	   	$.each(fastar1,function(i, m){
			   if(o.w_fast==m){
				   $("input:radio[name='fast']:radio[value="+fastar2[i]+"]").prop('checked', true);
				   return false;
			   }else{return true;}
		   });
	   });
   });
   
	   //update 시키기
	   $("#b1").click(function() {
			$("#chart1").empty();
			var sleep = $('input[name="sleep"]:checked').val();
			var exercise = $('input[name="exercise"]:checked').val();
			var drink = $('input[name="drink"]:checked').val();
			alert(drink);
			var fast = $('input[name="fast"]:checked').val();
			$.ajax({
				url : "biorythm.update.done",
				data : {
					sleep : sleep,
					exercise : exercise,
					drink : drink,
					fast : fast
				},
				success : function(bioJSON) {
					location.href = "biorythm.go";
				}
			});
		});
  
});
</script>
</head>
<body>
바이오 리듬 수정 페이지 입니다.
	<table border="1">
		<tr>
			         <td colspan="7" align="center">수면시간(1주일 평균시간)</td>
      </tr>
      <tr>
         <td><input type="radio"  id="sleep" name="sleep" value="1">0~1시간</td>
         <td><input type="radio"  id="sleep" name="sleep" value="2">1~3시간</td>
         <td><input type="radio"  id="sleep" name="sleep" value="3">3~6시간</td>
         <td><input type="radio"  id="sleep" name="sleep" value="4">6~8시간</td>
         <td><input type="radio"  id="sleep" name="sleep" value="5">8~10시간</td>
         <td><input type="radio"  id="sleep" name="sleep" value="6">10~12시간</td>
         <td><input type="radio"  id="sleep" name="sleep" value="7">13시간 이상</td>
      </tr>
      <tr>
         <td colspan="7" align="center">운동시간(1주일 평균시간)</td>
      </tr>
      <tr>
         <td><input id="exercise" type="radio" name="exercise" value="1">안함</td>
         <td><input id="exercise" type="radio" name="exercise" value="2">0~2시간</td>
         <td><input id="exercise" type="radio" name="exercise" value="3">2~3시간</td>
         <td><input id="exercise" type="radio" name="exercise" value="4">3~4시간</td>
         <td><input id="exercise" type="radio" name="exercise" value="5">4~5시간</td>
         <td><input id="exercise" type="radio" name="exercise" value="6">6시간 이상</td>
      </tr>
      <tr>
         <td colspan="7" align="center">술(1주일 횟수)</td>
      </tr>
      <tr>
         <td><input id="drink" type="radio" name="drink" value="1">0~1회</td>
         <td><input id="drink" type="radio" name="drink" value="2">2~3회</td>
         <td><input id="drink" type="radio" name="drink" value="3">4~5회</td>
         <td><input id="drink" type="radio" name="drink" value="4">6회 이상</td>
      </tr>
      <tr>
         <td colspan="7" align="center">패스트푸드(1주일 횟수)</td>
      </tr>
      <tr>
         <td><input id="fast" type="radio" name="fast" value="1">0~1회</td>
         <td><input id="fast" type="radio" name="fast" value="2">2~3회</td>
         <td><input id="fast" type="radio" name="fast" value="3">4~5회</td>
         <td><input id="fast" type="radio" name="fast" value="4">6~7회</td>
      </tr>
      <tr>
         <td colspan="7" align="center">
            <button id="b1">바이오 리듬 수정</button>
         </td>
      </tr>
	</table>
</body>
</html>