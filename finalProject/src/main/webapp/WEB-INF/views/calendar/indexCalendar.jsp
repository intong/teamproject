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
<link rel="stylesheet" href="resources/css/regSchedule.css">

<!-- fullCallendar -->
<link rel="stylesheet" href="resources/b_fullCalendar/fullcalendar.min.css">
<link rel="stylesheet" href="resources/b_fullCalendar/fullcalendar.print.min.css">
<script type="text/javascript" src="resources/b_fullCalendar/fullcalendar.min.js"></script>


<!-- semantic UI -->
<link rel="stylesheet" type="text/css" href="resources/a_semanticUI/semantic.min.css">
<script src="resources/a_semanticUI/semantic.min.js"></script>

<!-- customs JS file -->
<script type="text/javascript" src="resources/js/indexCalendar.js"></script>

<title>달력페이지</title>
</head>
<script type="text/javascript">

$(function({
	
	alert('6666');
});

</script>
<body>
	<script type="text/javascript">
		$(function(){
			alert('77777777');
		});
	</script>

	<!-- Header -->
	<div id="FrameHeader">
		<div id="ContainerHeader">
			<div id="BTNsDIV">
				<button id="logoutBTN">로그아웃</button>
				<button id="logoutBTN">내 정보 수정</button>
			</div>
			<!-- 
				Header의 내용 작성 공간 
				* Header 포함 내용
					- 로고
					- (JSP include) 로그인 페이지
					- (JSP include) 메뉴 List (Home / 스케줄보기  / 생활태펀 분석)
			-->
			<div id="logoDIV">
				<div id="logoBig">MOS</div>
				<div id="logoSmall">My Own Scheduler</div>
			</div>
			<div id="menuDIV">
				<ul id="menuDIV_ul">
					<li class="menuDIV_li home"><a href="/fp/">홈으로</a></li>
					<li class="menuDIV_li"><a href="#">생활패턴보기</a></li>
				</ul>
			</div>
			<div id="loginDIV">
				<div id="weatherIMG">
					<img alt="" id="imgweather">
				</div>
				<div id="temp">기온</div>
				<div id="today"></div>
				<div id="memberID">${sessionScope.m.m_id }</div>
			</div>
		</div>
	</div>

	<!-- Content includePage  -->
	<div id="FrameContent">
		<div id="ContainerContent">
			<!-- 여기부터 Content의 내용 작성 공간 includePage-->
			<jsp:include page="${includePage }" />
		</div>
	</div>
	
	<!-- 단비 챗봇 -->
<div id="frogue-container" class="position-right-bottom"
      data-chatbot="50c5198c-52ef-4df1-864c-62c29428f24e"
      data-user="사용자ID"
      data-init-userid="${sessionScope.m.m_id }"
      ></div>
<!-- data-init-식별키=값 으로 셋팅하면 챗플로우에 파라미터와 연동가능. 식별키는 소문자만 가능 -->
<script>
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https:\/\/danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'frogue-embed'));

</script>
	
	<!-- Footer -->
	<div id="FrameFooter">
		<div id="ContainerFooter">
			<!-- 여기부터 Footer의 내용 작성 공간 -->
		</div>
	</div>
</body>
</html>