$(function() {
	$.getJSON("biorythm.update.json", function(data) {
		var sleep;
		var exer;
		var drink;
		var fast;

		$.each(data.bio, function(i, b) {
			sleep = b.w_sleep;
			exer = b.w_exer;
			drink = b.w_drink;
			fast = b.w_fast;
		});

		$("input:radio[name='sleep']:radio[value=" + sleep + "]").prop(
				'checked', true);
		$("input:radio[name='exercise']:radio[value=" + exer + "]").prop(
				'checked', true);
		$("input:radio[name='drink']:radio[value=" + drink + "]").prop(
				'checked', true);
		$("input:radio[name='fast']:radio[value=" + fast + "]").prop('checked',
				true);
	});

	// update 시키기
	$("#b1").click(function() {
		$("#chart1").empty();
		var sleep = $('input[name="sleep"]:checked').val();
		var exercise = $('input[name="exercise"]:checked').val();
		var drink = $('input[name="drink"]:checked').val();
		alert(drink);
		var fast = $('input[name="fast"]:checked').val();
		$.ajax({
			url : "biorythm.update.done",
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