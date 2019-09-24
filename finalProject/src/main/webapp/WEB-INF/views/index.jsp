<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=UTF-8">
	<!--Basic jQuery -->
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="resources/js/validCheck.js"></script>
	<!-- customs CSS file -->
	<link rel="stylesheet" href="resources/css/reset.css">
	<link rel="stylesheet" href="resources/css/index.css">
	<!-- customs JS file -->
	<script type="text/javascript" src="resources/js/index.js"></script>
	<!-- semantic UI -->
	<link rel="stylesheet" type="text/css" href="resources/a_semanticUI/semantic.min.css">
	<script src="resources/a_semanticUI/semantic.min.js"></script>
	
<title>로그인</title>
</head>
<body>

	<c:if test="${result != null }">
		<script type="text/javascript">
			alert('${result}');
			
		</script> 
	</c:if>
	<div id="indexLoginBackground">
		<div id="indexLoginFrame">
			<div id="loginTxt">로그인</div>
			<div id="loginInput">
				
				<!-- semanticUI layout LoginSystem -->
				<form action="login.go" method="post" class="ui large form" name="loginSubmit">
			      <div class="ui stacked segment">
			        <div class="field">
			          <div class="ui left icon input">
			            <i class="user icon"></i>
			            <input type="text" name="m_id" id="id" placeholder="아이디">
			          </div>
			        </div>
			        <div class="field">
			          <div class="ui left icon input">
			            <i class="lock icon"></i>
			            <input type="password" name="m_pass" id="pw" placeholder="비밀번호">
			          </div>
			        </div>
			        <div class="ui fluid large teal submit button" id="loginBTN" onclick="loginDo();">로그인</div>
			      </div>
			    </form>
		
		    	<div class="ui message">
		      	회원이 아니신가요? <a href="join">가입하러하기</a>
		    	</div>
				
			</div>
		</div>
	</div>
</body>
</html>