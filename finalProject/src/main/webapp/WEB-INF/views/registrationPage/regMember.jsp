<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

	<!--Basic jQuery -->
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="resources/js/validCheck.js"></script>
	
	<!-- customs CSS file -->
	<link rel="stylesheet" href="resources/css/reset.css">
	<link rel="stylesheet" href="resources/css/regMember.css">
	
	<!-- semantic UI -->
	<link rel="stylesheet" type="text/css" href="resources/a_semanticUI/semantic.min.css">
	<script src="resources/a_semanticUI/semantic.min.js"></script>

	<!-- fullCallendar -->
	<link rel="stylesheet" href="resources/b_fullCalendar/core/main.css">
	<link rel="stylesheet" href="resources/b_fullCalendar/daygrid/main.css">
	<script type="text/javascript" src="resources/b_fullCalendar/core/main.js"></script>
	<script type="text/javascript" src="resources/b_fullCalendar/daygrid/main.js"></script>

	<!-- customs JS file -->
	<script type="text/javascript" src="resources/js/regMember.js"></script>
</head>
<body>
	<c:if test="${result != null }">
		<script type="text/javascript">
			alert('${result}');
		</script>
	</c:if>
	<div id="regMemberFrame">
		<div id="regMemberHeader">
			<span id="title">회원가입양식</span>
		</div>
			<div id="regMemberContent">
				<form action="join" method="post" id="formHidden" name="joinSubmit">
				<div id="regMemberContainer">
					<div id="regMemberContainer_menu">
						<div class="containerMenu">아이디 : </div>
						<div class="containerMenu">비밀번호 : </div>
						<div class="containerMenu">이름 : </div>
						<div class="containerMenu">생년월일 : </div>
					</div>
					<div id="regMemberContainer_input">
						<div class="containerInput">
							<div class="ui input">
			  					<input type="text" placeholder="아이디 입력" class="inputWidth id" name="m_id">
							</div>
						</div>
						<div class="containerInput">
							<div class="ui input">
			  					<input type="text" placeholder="비밀번호 입력 (ex) 4자리 숫자만 입력해 주세요." class="inputWidth pw" name="m_pass">
							</div>
						</div>
						<div class="containerInput">
							<div class="ui input">
		  						<input type="text" placeholder="이름 입력" class="inputWidth name" name="m_name">
							</div>
						</div>
						<div class="containerInput">
							<div class="ui input">
		  						<input type="text" placeholder="생년월일 입력 (ex) 1998/02/03" class="inputWidth birth" name="m_birth">
							</div>
						</div>
					</div>
					<!-- 버튼 -->
					<div id="btnContainer">
						<div class="ui animated button" id="BTN" onclick="goJoin()">
							<div class="visible content">보내기</div>
							<div class="hidden content">
								<i class="right arrow icon"></i>	
							</div>
						</div>
						<div id="goBackLoginBTN">
						</div>
					</div>
				</div>
				</form>
			</div>
	</div>
</body>
</html>