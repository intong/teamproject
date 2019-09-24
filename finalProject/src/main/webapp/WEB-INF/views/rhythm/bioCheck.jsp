<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset=UTF-8>
<title>바이오리듬 체크</title>

<style type="text/css">
#titleDiv {
	position: relative;
	top: 20px;
	font-size: 50px;
}

#sleepDiv {
	position: relative;
	width: 500px;
	height: 180px;
	margin-top: 60px; //
	background-color: red;
}

#sleepTab, #exerTab, #drinkTab, #fastTab {
	width: 300px;
}

.td1 {
	width: 200px;
}

.td2 {
	width: 100px;
}

#exerDiv {
	position: relative;
	width: 500px;
	height: 160px;
	margin-top: 10px; //
	background-color: orange;
}

#drinkDiv {
	position: relative;
	width: 500px;
	height: 110px;
	margin-top: 10px; //
	background-color: yellow;
}

#fastDiv {
	position: relative;
	width: 500px;
	height: 110px;
	margin-top: 10px; //
	background-color: green;
}

#b1 {
	width: 200px;
	height: 70px;
	background-color: #4DB6AC;
	color: #E0F2F1;
	font-size: 30px;
}

#btnDiv {
	margin-top: 80px;
}
</style>
<script type="text/javascript" src="resources/JQ/JQuery.js"></script>
<script type="text/javascript">
	$(function() {
		$("#b1").click(
				function() {
					$("#chart1").empty();
					var sleep = $('input[name="sleep"]:checked').val();
					var exercise = $('input[name="exercise"]:checked').val();
					var drink = $('input[name="drink"]:checked').val();
					var fast = $('input[name="fast"]:checked').val();

					$.ajax({
						url : "biorythm.get",
						data : {
							sleep : sleep,
							exercise : exercise,
							drink : drink,
							fast : fast
						},
						success : function(bioJSON) {
							//alert(sleep);
							//alert(exercise);
							//alert(drink);
							//alert(fast);
							//alert(bioJSON.state);
							var state = bioJSON.state;
							location.href = "biorythmResult.go?state=" + state
									+ "&sleep=" + sleep + "&exercise="
									+ exercise + "&drink=" + drink + "&fast="
									+ fast;
							//$("#result").text("이번 주 당신의 생활 패턴은 " + state + "입니다.");
						}
					});
				});
	});
</script>
</head>
<body>
	<div align="center" id="bioCheckDiv">
		<div id="titleDiv">
			패 턴 분 석 조 사
			<hr>
		</div>
		<div id="sleepDiv">
			<table id="sleepTab">
				<tr>
					<td align="left" class="td1">수면시간(1주일 평균시간):</td>
					<td class="td2"><input type="radio" id="sleep" name="sleep"
						value="1">0 ~ 1시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input type="radio" id="sleep" name="sleep"
						value="2">1 ~ 3시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input type="radio" id="sleep" name="sleep"
						value="3">3 ~ 6시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input type="radio" id="sleep" name="sleep"
						value="4">6 ~ 8시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input type="radio" id="sleep" name="sleep"
						value="5">8 ~ 10시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input type="radio" id="sleep" name="sleep"
						value="6">10 ~ 12시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input type="radio" id="sleep" name="sleep"
						value="7">13시간 이상</td>
				</tr>
			</table>
		</div>
		<div id="exerDiv">
			<table id="exerTab">
				<tr>
					<td align="left" class="td1">운동시간(1주일 평균시간):</td>
					<td class="td2"><input id="exercise" type="radio"
						name="exercise" value="1">안함</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="exercise" type="radio"
						name="exercise" value="2">1 ~ 2시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="exercise" type="radio"
						name="exercise" value="3">2 ~ 3시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="exercise" type="radio"
						name="exercise" value="4">3 ~ 4시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="exercise" type="radio"
						name="exercise" value="5">4 ~ 5시간</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="exercise" type="radio"
						name="exercise" value="6">6 시간 이상</td>
				</tr>
			</table>
		</div>
		<div id="drinkDiv">
			<table id="drinkTab">
				<tr>
					<td align="left" class="td1">술(1주일 평균 횟수):</td>
					<td class="td2"><input id="drink" type="radio" name="drink"
						value="1">0 ~ 1회</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="drink" type="radio" name="drink"
						value="2">2 ~ 3회</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="drink" type="radio" name="drink"
						value="3">4 ~ 5회</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="drink" type="radio" name="drink"
						value="4">6회 이상</td>
				</tr>
			</table>
		</div>
		<div id="fastDiv">
			<table id="fastTab">
				<tr>
					<td align="left" class="td1">패스트푸드(1주일 평균 횟수):</td>
					<td class="td2"><input id="fast" type="radio" name="fast"
						value="1">0 ~ 2회</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="fast" type="radio" name="fast"
						value="2">3 ~ 4회</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="fast" type="radio" name="fast"
						value="3">5 ~ 6회</td>
				</tr>
				<tr>
					<td class="td1"></td>
					<td class="td2"><input id="fast" type="radio" name="fast"
						value="4">7회 이상</td>
				</tr>
			</table>
		</div>
		<div id="btnDiv">
			<button id="b1">제 출</button>
		</div>

	</div>

</body>
</html>