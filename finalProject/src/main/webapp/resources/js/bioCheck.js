$(function() {
	$("#b1").click(function() {
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
				location.href = "biorythm.go";
			}
		});
	});
});