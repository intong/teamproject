<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset=UTF-8>
<title>바이오 리듬 결과</title>
<!-- bioResult CSS -->
<link rel="stylesheet" href="resources/css/bioResult.css">
<!-- Java Script -->
<script type="text/javascript" src="resources/js/bioResult.js"></script>

</head>
<body>
	<div id="state">
		<h3 style= "display: inline-block;">당신의 상태는</h3>
		<c:choose>
			<c:when test="${test == '매우 위험'}">
		 		<h3 style= "font-size:30px; color:red; display:inline-block;">"${test}"</h3>			
			</c:when>
			<c:when test="${test == '위험'}">
		 		<h3 style= "font-size:30px; color:orange; display:inline-block;">"${test}"</h3>			
			</c:when>
			<c:when test="${test == '주의'}">
		 		<h3 style= "font-size:30px; color:#FFAB00; display:inline-block;">"${test}"</h3>			
			</c:when>
			<c:when test="${test == '건강'}">
		 		<h3 style= "font-size:30px; color:blue; display:inline-block;">"${test}"</h3>			
			</c:when>
		</c:choose>
		<h3 style= "display: inline-block;">입니다.</h3>
	</div>
	<div id="reviseDiv">
		<button id="revise">이번 주 값 수정하기</button>
	</div>
	<br><br>
	<div id="chart1">
		 		<h3 style= "font-size:20px; color:#7E57C2;">이번 주 나의 BioRhythm!!</h3>				
	</div>
	
	<div id="chart2">
		 		<h3 style= "font-size:20px; color:#1A237E;">이번 달 나의 BioRhythm!!</h3>			
	</div>
	<div class="advise"></div>
	<br>
	<br>

</body>
</html>