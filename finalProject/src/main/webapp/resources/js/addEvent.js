var eventModal = $('#eventModal');
var modalTitle = $('.modal-title');
var editAllDay = $('#edit-allDay');
var editTitle = $('#edit-title');
var editStart = $('#edit-start');
var editEnd = $('#edit-end');
var editType = $('#edit-type');
var editPart = $("#part_filter");
var editColor = $('#edit-color');
var user =$("#memberID");

var addBtnContainer = $('.modalBtnContainer-addEvent');
var modifyBtnContainer = $('.modalBtnContainer-modifyEvent');

/*******************************************************************************
 * 새로운 일정 생성 **************
 */
var newEvent = function(start, end, eventType) {

   $("#contextMenu").hide(); // 메뉴 숨김
   
   modalTitle.html('새로운 일정');
   editStart.val(start);
   editEnd.val(end);
   editType.val(eventType).prop("selected", true);

   addBtnContainer.show();
   modifyBtnContainer.hide();
   eventModal.modal('show');

   /** ****** 임시 RAMDON ID - 실제 DB 연동시 삭제 ********* */
   var eventId = 1 + Math.floor(Math.random() * 1000);
   /** ****** 임시 RAMDON ID - 실제 DB 연동시 삭제 ********* */

   // 새로운 일정 저장버튼 클릭
   $('#save-event').unbind();
   $('#save-event').on(
         'click',
         function() {
            
            var part = "";
            for (var i = 0; i < editPart.val().length; i++) {
               if(i+1==editPart.val().length){
                  part +=editPart.val()[i];
               }else{
                  part +=editPart.val()[i]+",";   
               }
               
            }
            
            var partName= $("#part_filter option:selected").text();
            var partNames = partName.split(" ");
            
            if(partNames[partNames.length-1]==""){
               partNames.pop();
            }
            
            
            var names = "";
            
            for (var i = 0; i < partNames.length; i++) {
               if(i+1==partNames.length){
                  names +=partNames[i];
               }else{
                  names +=partNames[i]+",";   
               }
               
            }
            var resultType;
            if(editType.val()=='할일'){
               resultType=0;
            }else{
               resultType=1;
               
            }
            
            

            var eventData = {
               _id : eventId,
               title : editTitle.val(),
               start : editStart.val(),
               end : editEnd.val(),
               type : editType.val(),
               username :user.text() ,
               parts : part,
               partner :names,
               backgroundColor : editColor.val(),
               textColor : '#ffffff',
               allDay : false
            };

            if (eventData.start > eventData.end) {
               alert('끝나는 날짜가 앞설 수 없습니다.');
               return false;
            }

            if (eventData.title === '') {
               alert('일정명은 필수입니다.');
               return false;
            }

            var realEndDay;

            if (editAllDay.is(':checked')) {
               eventData.start = moment(eventData.start).format(
                     'YYYY-MM-DD');
               // render시 날짜표기수정
               eventData.end = moment(eventData.end).add(1, 'days')
                     .format('YYYY-MM-DD');
               // DB에 넣을때(선택)
               realEndDay = moment(eventData.end).format('YYYY-MM-DD');

               eventData.allDay = true;
            }

            
            $("#calendar").fullCalendar('renderEvent', eventData, true);
            
            editAllDay.prop('checked', false);
            eventModal.modal('hide');

            // 새로운 일정 저장
            $.ajax({
               type : "get",
               url : "scheduleInsert",
               data : {
                  
               s_id :eventData.username,
               s_content : eventData.title,
               s_stime : eventData.start,
               s_etime : eventData.end,
               s_part :part,
               s_partKor:names,
               s_todocheck : resultType,
               s_allday : eventData.allDay,
               s_color :eventData.backgroundColor
               
               },
               success : function(response) {
            	   $('#scheduleBoardFrame').empty();
            	   
            	   $.each(response.schedule, function(i,v) {
            		var day = v.s_stime.substring(0,10);
       				var time = v.s_stime.substring(10,16);
       				var content = v.s_content;
       				var partID = v.s_part;
       				var partKor = v.s_partKor;
       				var no = v.s_no;
       				
       				var th = $('<th></th>').attr("colspan","4").text(day);
       				var tr_th = $('<tr></tr>').append(th);
       				var thead = $('<thead></thead>').attr("class","boardHeader").append(tr_th);
       				var td1 = $('<td></td>').attr("class","boardContent bcTime").text(time);
       				var td2 = $('<td></td>').attr("class","boardContent bcContent").text(content);
       				var span1 = $('<span></span>').text(partKor);
       				var icon = $('<i></i>').attr('class','comments outline large icon').attr("onclick","jeonjakua("+no+','+"'"+partKor+"'"+");");
       				//var span2 = $('<span></span>').attr("class","chat").attr("onclick","jeonjakua("+no+','+"'"+partKor+"'"+");").text("채팅");
       				var td3 = $('<td></td>').attr("class","boardContent bcPartner").append(span1);
       				var td4 = $('<td></td>').attr("class","boardContent bcPartner").append(icon);
       				var tr_td = $('<tr></tr>').append(td1,td2,td3,td4);
       				var tbody = $('<tbody></tbody>').append(tr_td);
       				var table = $('<table></table>').attr("class","ui collapsing table boardFrame").css("margin-bottom","20px").append(thead,tbody);
       				$('#scheduleBoardFrame').append(table);
					
				})
                  
                  
                   $('#calendar').fullCalendar('removeEvents');
                   $('#calendar').fullCalendar('refetchEvents');
               }
            });
         });
};