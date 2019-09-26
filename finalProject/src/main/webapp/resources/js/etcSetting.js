//SELECT 색 변경
$('#edit-color').change(function() {
	$(this).css('color', $(this).val());
});

// 필터
$('.filter').on('change', function() {
	$('#calendar').fullCalendar('rerenderEvents');
});

$("#type_filter").select2({
	placeholder : "선택..",
	allowClear : true
});

// datetimepicker
$("#edit-start, #edit-end").datetimepicker({
	format : 'YYYY-MM-DD HH:mm'
});

$("#part_filter").select2({
	placeholder : "선택..",
	allowClear : true
});

$(function() {

	$.ajax({
		type : "get",
		url : "getAllMember.json",
		success : function(res) {

			$.each(res.member, function(i, m) {
				var option = $("<option></option>").attr('value', m.m_id).text(
						m.m_name+" ");
				$("#part_filter").prepend(option);

			});
		}

	});
	//	
	//
	//
	// /*
	
	// *
	// */
	//	
	//	
	//	
	//	
	//	
	//	
});