<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<!--Basic jQuery -->
	<script type="text/javascript" src="resources/js/validCheck.js"></script>
	
	<!-- customs CSS file -->
	<link rel="stylesheet" href="resources/css/reset.css">
	<link rel="stylesheet" href="resources/css/indexCalendar.css">
	<link rel="stylesheet" href="resources/css/scheduleIncludePage.css">
	

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
		
		
		<div class="container">

        <!-- 일자 클릭시 메뉴오픈 -->
        <div id="contextMenu" class="dropdown clearfix">
            <ul class="dropdown-menu dropNewEvent" role="menu" aria-labelledby="dropdownMenu"
                style="display:block;position:static;margin-bottom:5px;">
                <li><a tabindex="-1" href="#">할일</a></li>
                <li><a tabindex="-1" href="#">스케줄</a></li>
                
                <li class="divider"></li>
                <li><a tabindex="-1" href="#" data-role="close">Close</a></li>
            </ul>
        </div>

        <div id="wrapper">
            <div id="loading"></div>
            <div id="calendar"></div>
        </div>


        <!-- 일정 추가 MODAL -->
        <div class="modal fade" tabindex="-1" role="dialog" id="eventModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-xs-12">
                                <label class="col-xs-4" for="edit-allDay">하루종일</label>
                                <input class='allDayNewEvent' id="edit-allDay" type="checkbox"></label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <label class="col-xs-4" for="edit-title">일정명</label>
                                <input class="inputModal" type="text" name="edit-title" id="edit-title"
                                    required="required" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <label class="col-xs-4" for="edit-start">시작</label>
                                <input class="inputModal" type="text" name="edit-start" id="edit-start" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <label class="col-xs-4" for="edit-end">끝</label>
                                <input class="inputModal" type="text" name="edit-end" id="edit-end" />
                            </div>
                        </div>
                          <div class="row">
                            <div class="col-xs-12">
                                <label class="col-xs-4" for="edit-part">상대방</label>
                                <select class="part_filter" id="part_filter" multiple="multiple" style="width: 64.96666%;"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <label class="col-xs-4" for="edit-type">구분</label>
                                <select class="inputModal" type="text" name="edit-type" id="edit-type">
                                    <option value="할일">할일</option>
                                    <option value="스케줄">스케줄</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <label class="col-xs-4" for="edit-color">색상</label>
                                <select class="inputModal" name="color" id="edit-color">
                                    <option value="#D25565" style="color:#D25565;">빨간색</option>
                                    <option value="#9775fa" style="color:#9775fa;">보라색</option>
                                    <option value="#ffa94d" style="color:#ffa94d;">주황색</option>
                                    <option value="#74c0fc" style="color:#74c0fc;">파란색</option>
                                    <option value="#f06595" style="color:#f06595;">핑크색</option>
                                    <option value="#63e6be" style="color:#63e6be;">연두색</option>
                                    <option value="#a9e34b" style="color:#a9e34b;">초록색</option>
                                    <option value="#4d638c" style="color:#4d638c;">남색</option>
                                    <option value="#495057" style="color:#495057;">검정색</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer modalBtnContainer-addEvent">
                        <button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
                        <button type="button" class="btn btn-primary" id="save-event">저장</button>
                    </div>
                    <div class="modal-footer modalBtnContainer-modifyEvent">
                        <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-danger" id="deleteEvent">삭제</button>
                        <button type="button" class="btn btn-primary" id="updateEvent">저장</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">필터</h3>
            </div>
            <div class="panel-body">
                <div class="col-lg-6">
                    <label for="calendar_view">구분별</label>
                    <div class="input-group">
                        <select class="filter" id="type_filter" multiple="multiple">
                            <option value="할일">할일</option>
                            <option value="스케줄">스케줄</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.filter panel -->
    </div>
    <!-- /.container -->
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
</body>
</html>