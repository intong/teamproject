<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<!--Basic jQuery -->
	<!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>  -->
	<script src="resources/b_fullCalendar/lib/moment.min.js"></script>
	<script src="resources/b_fullCalendar/lib/jquery.min.js"></script>
	<script type="text/javascript" src="resources/b_fullCalendar/lib/jquery-ui.min.js"></script>
	<script type="text/javascript" src="resources/js/validCheck.js"></script>
	
	<!-- customs CSS file -->
	<link rel="stylesheet" href="resources/css/reset.css">
	<link rel="stylesheet" href="resources/css/indexCalendar.css">
	<link rel="stylesheet" href="resources/css/scheduleIncludePage.css">
	
	<!-- fullCallendar -->
	<link rel="stylesheet" href="resources/b_fullCalendar/fullcalendar.min.css">
	<link rel="stylesheet" href="resources/b_fullCalendar/fullcalendar.print.min.css">
	<script type="text/javascript" src="resources/b_fullCalendar/fullcalendar.min.js"></script>
	
	<!-- bootstrap -->
	<link rel="stylesheet" href="resources/bootstrap/bootstrap.css">
	<script type="text/javascript" src="resources/bootstrap/bootstrap.js"></script>
	
	<!-- semantic UI -->
	<link rel="stylesheet" type="text/css" href="resources/a_semanticUI/semantic.min.css">
	<script src="resources/a_semanticUI/semantic.min.js"></script>
	
	<!-- customs JS file -->
	<script type="text/javascript" src="resources/js/scheduleIncludePage.js"></script>

<title>Insert title here</title>
</head>
<body>
	<div id="scheduleIncludePageFrame">
		<!-- 달력 -->
		<div id="scheduleCalendar">
				
		</div>
			<!-- 스케줄 게시판 출력 -->
			<div id="scheduleBoard">
				<div id="scheduleBoardFrame">	  			
			  		<table class="ui collapsing table boardFrame">
			  			<thead class="boardHeader">
			  				<tr>
			  					<th colspan="3">2019-05-02</th>
			  				</tr>
			  			</thead>
			  			<tbody>
			  				<tr>
			  					<td class="boardContent bcTime">14:00</td>
			  					<td class="boardContent bcContent">전자과 약속</td>
			  					<td class="boardContent bcPartner">
			  						<span>홍길동</span><span id="chat">채팅</span>
			  					</td>	  						
			  				</tr>
			  				<tr>
			  					<td class="boardContent bcTime">14:00</td>
			  					<td class="boardContent bcContent">전자과 약속</td>
			  					<td class="boardContent bcPartner">오세원</td>	  						
			  				</tr>
			  				<tr>
			  					<td class="boardContent bcTime">14:00</td>
			  					<td class="boardContent bcContent">전자과 약속</td>
			  					<td class="boardContent bcPartner">오세원</td>	  						
			  				</tr>
			  			</tbody>
			  		</table>
		  		</div>
	  		</div>
	  	</div>
</body>
</html>