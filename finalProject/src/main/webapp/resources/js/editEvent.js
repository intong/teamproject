/* ****************
 *  일정 편집
 * ************** */
var editEvent = function (event, element, view) {

    $('.popover.fade.top').remove();
    $(element).popover("hide");

    if (event.allDay === true) {
        editAllDay.prop('checked', true);
    } else {
        editAllDay.prop('checked', false);
    }

    if (event.end === null) {
        event.end = event.start;
    }

    if (event.allDay === true && event.end !== event.start) {
        editEnd.val(moment(event.end).subtract(1, 'days').format('YYYY-MM-DD HH:mm'))
    } else {
        editEnd.val(event.end.format('YYYY-MM-DD HH:mm'));
    }
    var ids = [];
    var parts = event.part.split(",");
    
    ids[0]=parts;
   
    modalTitle.html('일정 수정');
    editTitle.val(event.title);
    editStart.val(event.start.format('YYYY-MM-DD HH:mm'));
    editType.val(event.type);
    $("#part_filter").select2('val',ids);
   
    
    editColor.val(event.backgroundColor).css('color', event.backgroundColor);

    addBtnContainer.hide();
    modifyBtnContainer.show();
    eventModal.modal('show');

    //업데이트 버튼 클릭시
    $('#updateEvent').unbind();
    $('#updateEvent').on('click', function () {

        if (editStart.val() > editEnd.val()) {
            alert('끝나는 날짜가 앞설 수 없습니다.');
            return false;
        }

        if (editTitle.val() === '') {
            alert('일정명은 필수입니다.')
            return false;
        }

        var statusAllDay;
        var startDate;
        var endDate;
        var displayDate;
        

        if (editAllDay.is(':checked')) {
            statusAllDay = true;
            startDate = moment(editStart.val()).format('YYYY-MM-DD');
            endDate = moment(editEnd.val()).format('YYYY-MM-DD');
            displayDate = moment(editEnd.val()).add(1, 'days').format('YYYY-MM-DD');
        } else {
            statusAllDay = false;
            startDate = editStart.val();
            endDate = editEnd.val();
            displayDate = endDate;
        }

        eventModal.modal('hide');

        event.allDay = statusAllDay;
        event.title = editTitle.val();
        event.start = startDate;
        event.end = displayDate;
        event.type = editType.val();
        event.backgroundColor = editColor.val();
        
        var resultType;
      if(event.type=='할일'){
         resultType=0;
      }else{
         resultType=1;
         
      }
      var partId = $("#part_filter").val();
      var part = "";
      for (var i = 0; i <partId.length; i++) {
         if(i+1==partId.length){
            part +=partId[i];
         }else{
            part +=partId[i]+",";   
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
        

        $("#calendar").fullCalendar('updateEvent', event);

        //일정 업데이트
        $.ajax({
            type: "get",
            url: "scheduleUpdateAll",
            data: {
                s_no: event._id,
                s_id:userId,
                s_content : event.title,
                s_stime : event.start,
                s_etime : event.end,
                s_part :part,
                s_partKor : names,
                s_todocheck : resultType,
                s_allday: event.allDay,
                s_color :event.backgroundColor
            },
            success: function (response) {
            	$('#scheduleBoardFrame').empty();
            	ScheduleForLimit4(response);
            }
        });

    });

    // 삭제버튼
    $('#deleteEvent').unbind();
    $('#deleteEvent').on('click', function () {
        $("#calendar").fullCalendar('removeEvents', [event._id]);
        eventModal.modal('hide');

        //삭제시
        $.ajax({
            type: "get",
            url: "scheduleDeleteByNo",
            data: {
                s_no: event._id,
                s_id:userId
            },
            success: function (response) {
            	alert('삭제되었습니다.');
            	$('#scheduleBoardFrame').empty();
            	ScheduleForLimit4(response);
            }
        });
    });
};