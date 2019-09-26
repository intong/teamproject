var params = [ 0, 0, 0, 0 ];
var test = [ 8 * 1, 2 * 1, 1 * 1, 2 * 1 ];

var sleepar = [ 1, 3, 6, 8.1, 10, 12, 13 ];
var exerar = [ 1, 2.1, 3, 4, 5, 6 ];
var drinkar = [ 1.1, 3, 5, 6 ];
var fastar = [ 2.1, 4, 6, 7 ];

var jbAry = [
		[
				'회복 저하',
				'몇 분간 숨을 고르게 정리하지 못하거나, 에너지가 없는 것처럼 느껴지거나, 팔과 다리가 반응하지 않는 것처럼 느껴진다면 운동을 약간 줄여야 할 수도 있다  운동을 마친 후에도 통증이 느껴지거나 2리터 이상의 물을 마시고도 여전히 목이 마른 것 또한 회복이 오래 걸린다는 증거다.' ],
		[
				'몸이 약해짐',
				'운동을 지나치게 많이 하면 몸의 방어력이 강화되지 않고 오히려 약해진다. 이렇게 되면 일반적인 감기 회복뿐만 아니라 운동 중 “다친” 근섬유를 재생하는데 더 많은 시간이 소요된다. 평소보다 부상 회복이 더 오래 걸리는 것을 경험하게 될 수도 있다. 이 또한 운동을 지나치게 많이 하고 있다는 징후이다.' ],
		[
				'아침 심박 수가 높음',
				'운동을 많이 하면 심박 수가 변한다. 휴식하는 동안과 매일 아침 하루를 시작하기 전에 맥박을 확인하자.  아침에 심박 수가 더 높다면 운동을 너무 많이 하고 있다는 징후이며, 우리 몸이 평소처럼 회복하지 못했다는 의미이다.' ],
		[
				'잠을 자기가 더 어려움',
				'운동을 지나치게 많이 하면 우리 몸은 스트레스 호르몬을 과도하게 생성한다.  이렇게 되면 몸이 매우 피곤해도 밤에 잠을 자기가 더 어려워질 수 있다.' ],
		[
				'지속적인 통증',
				'휴식을 취하고 있는데도 몸에 통증이 느껴진다면, 운동을 보류해야만 한다.  이러한 증상은 운동이 너무 힘들 때 흔히 나타난다. 근육에 과부하가 걸리면 경련 및 따끔거림을 경험하는 것이 일반적이다.' ],
		[
				'극심한 피로감',
				'과도하게 운동을 하면 근육의 피로뿐만 아니라, 힘이 부족하고 일상적인 활동(일, 공부, 아이와 놀아주기, 요리 등)을 수행할 에너지가 없음을 느끼게 될 수도 있다. 집중력, 수행력 혹은 기억력 문제가 있다면 헬스장에서 너무 오랜 시간을 보냈기 때문일 수도 있다.' ],
		[
				'성과없는 결과물',
				'목표는 체중을 줄이는 것이지만 몇 주간 운동량을 늘려도 변화가 없다면, 우리가 과도하게 많은 양의 운동을 하는 것일 수 있다. 몸이 혹사당할 때 실제로 신진대사가 느려지며, 이로 인해 체중을 감량하는 것이 더 어려워진다.' ],
		[
				'언제나 기분 Down',
				'우리가 운동을 지나치게 많이 하고 있음을 나타내는 또 다른 징후 중 하나는 끊임없이 짜증이 나고, 변덕스러워지며, 화가 나는 것이다.  운동은 스트레스를 줄여주고 긴장을 완화하지만, 과도하게 많이 하면 반대의 효과가 나타날 수 있다. 헬스장에 가는 대신 목욕을 하거나 잠을 자는 등의 긴장을 완화해주는 활동을 해보자. ' ],
		[
				'좌절감 Up',
				'운동을 많이 하는 사람들은 종종 좌절감을 느끼며 낮은 동기 부여를 경험한다. 결과가 나타나기까지 오랜 시간이 걸려 마치 노력이 헛된 것처럼 보이게 될 수 있기 때문이다.  좌절감과 슬픔은 더 많은 운동으로 극복할 수 있는 것이 아니라 휴식과 다른 활동을 통해 극복할 수 있다.' ],
		[ '팔과 다리가 무거움',
				'다리가 무겁고 관절과 근육이 뻣뻣하고 지속적인 통증이 나타나는 것이 잦아짐을 느끼는 대표적인 증상이다.' ],
		[
				'불안증세 Up',
				'운동은 고사하고, 매사에 싫증이 나며 무엇에나 관심이 없어진다. 신경이 예민하고 말다툼을 하거나 우울증에 빠지게 되며, 스스로 긴장을 풀지 못하고 우왕좌왕 불안해 진다.' ] ];
var kkarray = [
		[
				'정신건강에 악영향',
				'지난해 미국 워싱턴 주립대 연구진은 쌍둥이인 성인 1700쌍을 대상으로 연구한 결과 하루 평균 7~9시간 자는 사람들 중 우울증상을 보인 이들은 27%를 기록했다. 반면 그 이상 자는 사람의 경우에는 우울 정도가 47%에 이르는 것으로 나타났다.  또한 한 정신건강의학과 교수는 “알코올 의존, 불안 장애, 외상 후 스트레스 장애도 9시간 이상의 수면과다와 연관이 높으며, 이에 따라 정신 건강에도 악영향을 미칠 것으로 본다”고 지적했다.' ],
		[
				'당뇨병 위험',
				'캐나다 연구팀에 따르면 밤에 8시간 이상 잠을 잘 경우 그렇지 않을 때 보다 제2형 당뇨병에 걸릴 확률이 2배 이상 높다고 밝혔다.  한 연구원은 “오래 잠을 자면 체질량지수가 높아지고 포도당 처리 능력이 떨어져 당뇨병의 전조 증세가 나타날 수 있다”고 설명했다. ' ],
		[
				'치매의 원인',
				'미국 하버드의대 연구진이 70대 여성 1만5000명을 대상으로 조사한 결과 9시간 이상 자는 여성은 인지 기능이 떨어져 치매에 걸리기 쉬운 경향을 보였고, 뇌의 노화가 2년 더 진행된 경우도 있었다. 반면 7시간 자는 여성은 9시간 이상이나 5시간 이하로 자는 이들보다 기억력이 좋았다.  또한 스페인 마드리드 대학병원 연구진이 노인 2715명을 조사한 결과, 매일 9시간 이상 자는 사람은 6~8시간 자는 사람보다 3년 뒤 뇌 인지 기능이 현저하게 떨어진 것으로 나타났다.' ],
		[
				'뇌 중풍의 위험 ',
				'지난 2008년 미국 노스캐롤라이나대에서 실시한 연구에서는 9시간 이상 잔 여성이 7시간 잔 여성보다 60~70% 뇌중풍에 걸릴 위험이 더 높다는 결과가 나왔다.  한 연구원은 “수면시간이 뇌중풍에 걸릴 위험과 관계가 있는지 명확하게 밝혀진 것은 없지만 잠을 많이 자는 사람은 수면 중 무호흡증을 겪는 등 실제로 양질의 잠을 자는 것이 아니기 때문에 뇌에 산소 공급이 잘 이뤄지지 않아 뇌중풍의 위험을 높일 수 있다”고 말했다. ' ],
		[
				'임신 가능성 저하',
				'지난 2013년 미국 생식의학회가 체외수정을 원하는 여성 650명을 대상으로 평소 수면 시간을 조사한 결과, 가장 임신율이 높은 여성들의 수면 시간은 7~8시간인 반면, 가장 임신율이 낮은 여성들의 수면 시간은 9~11시간으로 나타났다. 연구팀은 “생식 호르몬 분비에 충분한 수면이 필수적이지만, 과도한 수면 활동은 생식 주기에 영향을 미치고 정상적인 호르몬 작용을 방해해 불임으로도 이어질 수도 있을 것”이라고 밝혔다. ' ],
		[
				'살 찐다',
				'캐나다의 한 연구팀은 6년 동안 수면시간이 체중에 미치는 영향에 대해 연구했다. 그 결과 하루에 9시간 이상 자는 사람의 경우 그렇지 않은 사람에 비해 같은 기간 동안 체중이 증가할 확률이 25%나 더 높았다.  지난 2009년 국내 대학병원 연구팀이 성인 8700명을 대상으로 조사한 결과에서도 하루에 9시간 이상 잠을 자는 사람은 비만인 경우가 많았다. ' ],
		[
				'시력 저하',
				'지난달 미국 캘리포니아 망막 의료 연구진은 1003명의 환자들을 대상으로 수면패턴을 조사한 결과, 8시간 이상 잔 사람들의 시력이 대체적으로 낮다는 사실을 발견했다.  한 박사는 “눈을 오랜 시간 감고 있으면 압력이 가해져 시력 저하의 주원인이 된다”며 “심각한 경우는 녹내장으로 이어질 수 있다”고 경고했다. ' ],
		[
				'뇌졸중 위험',
				'미국 뉴욕 의과대학교 연구팀이 29만 명을 대상으로 한 대규모 조사결과,  잠이 모자란 사람보다 잠을 과다하게 자는 사람이 뇌졸중 위험에 훨씬 취약한 것으로 나타났다. 하루 9시간 이상 수면을 취하는 경우 뇌졸중 위험이 146%까지 증가한 반면, 6시간 이하 잠을 자는 사람은 22%정도 높아지는데 그쳤다. 수면부족보다 수면과다가 결과적으로 수면의 질까지 떨어뜨려 뇌에 더 심각한 문제를 초래한다는 것이다. ' ] ];

$(function() {
	$("#revise").click(function() {
		location.href = "biorythm.update";
	});
	$
			.getJSON(
					"biorythm.get",
					function(data) {
						$.each(data.bio, function(i, m) {
							params[0] = (m.w_sleep) * 1;
							params[1] = (m.w_exer) * 1;
							params[2] = (m.w_drink) * 1;
							params[3] = (m.w_fast) * 1;
						});

						if (params[0] == 1) {
							params[0] = sleepar[0];
						} else if (params[0] == 2) {
							params[0] = sleepar[1];
						} else if (params[0] == 3) {
							params[0] = sleepar[2];
						} else if (params[0] == 4) {
							params[0] = sleepar[3];
						} else if (params[0] == 5) {
							params[0] = sleepar[4];
						} else if (params[0] == 6) {
							params[0] = sleepar[5];
						} else if (params[0] == 7) {
							params[0] = sleepar[6];
						}

						if (params[1] == 1) {
							params[1] = exerar[0];
						} else if (params[1] == 2) {
							params[1] = exerar[1];
						} else if (params[1] == 3) {
							params[1] = exerar[2];
						} else if (params[1] == 4) {
							params[1] = exerar[3];
						} else if (params[1] == 5) {
							params[1] = exerar[4];
						} else if (params[1] == 6) {
							params[1] = exerar[5];
						}

						if (params[2] == 1) {
							params[2] = drinkar[0];
						} else if (params[2] == 2) {
							params[2] = drinkar[1];
						} else if (params[2] == 3) {
							params[2] = drinkar[2];
						} else if (params[2] == 4) {
							params[2] = drinkar[3];
						}

						if (params[3] == 1) {
							params[3] = fastar[0];
						} else if (params[3] == 2) {
							params[3] = fastar[1];
						} else if (params[3] == 3) {
							params[3] = fastar[2];
						} else if (params[3] == 4) {
							params[3] = fastar[3];
						}

						var options = {
							'legend' : {
								names : [ '수면시간', '운동시간', '술', '패스트푸드' ]
							},
							'dataset' : {
								title : 'Biorhythm',
								values : [ [ test[0], params[0] ],
										[ test[1], params[1] ],
										[ test[2], params[2] ],
										[ test[3], params[3] ] ],
								colorset : [ '#2EB400', '#DC143C' ],
								fields : [ '정상 수치', '당신 수치' ]

							},
							'chartDiv' : 'chart1',
							'chartType' : 'jira',
							'chartSize' : {
								width : 650,
								height : 450
							},
							'minValue' : 0,
							'maxValue' : 14,
							'increment' : 1
						};
						Nwagon.chart(options);

						var str = [ '수면시간', '운동시간', '음주 횟수', '패스트푸드' ];
						for (var i = 0; i < 4; i++) {
							var tab = $("<table></table>").attr('class',
									'tab' + i);
							var td = $("<td></td>").text(str[i]).attr("class",
									"tdn");
							var tr = $("<tr></tr>").append(td);
							tab.append(tr);

							var div = $("<div></div>").attr('class', 'div' + i);

							div.append(tab);
							$('.advise').append(div);
						}
						var keywords = [ '불면증', '땅끄부부 !' ];

						if ((params[0] > test[0])
								&& (params[0] - test[0] > 0.1)) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('야외 활동 필요!!');
							var tr = $("<tr></tr>").append(td);
							$(".tab0").append(tr);

							var k = 0;
							var testarray1 = [];
							for (var i = 0; i < 5; i++) {
								k = Math.floor((Math.random() * 8));
								testarray1[i] = k;
								for (searchCur = 0; searchCur < i; searchCur++) {
									if (testarray1[i] == testarray1[searchCur]) {
										i--;
										break;
									}
								}
							}

							for (var i2 = 0; i2 < 5; i2++) {
								var content = $("<span></span>").attr(
										"data-tooltip-text",
										kkarray[testarray1[i2]][1]).text(
										(i2 + 1) + " ) "
												+ kkarray[testarray1[i2]][0]);
								var td3 = $("<td></td>").append(content);
								var tr2 = $("<tr></tr>").append(td3);
								$(".tab0").append(tr2);
							}

						} else if (params[0] < test[0]) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('수면 부족!! 더 자야됨.')
									.attr("colspan", "2");
							var tr2 = $("<tr></tr>").append(td);
							$(".tab0").append(tr2);
							$(".v1").empty();
							$
									.ajax({
										url : "https://dapi.kakao.com/v2/search/vclip",
										data : {
											query : keywords[0],
											size : 5
										},
										beforeSend : function(req) {
											req
													.setRequestHeader(
															"Authorization",
															"KakaoAK 854779c907ee4f51133157699d51210d");
										},
										success : function(kakaoJSON) {
											$
													.each(
															kakaoJSON.documents,
															function(i, n) {
																var img = $(
																		"<img>")
																		.attr(
																				"src",
																				n.thumbnail);
																var a = $(
																		"<a></a>")
																		.attr(
																				"href",
																				n.url)
																		.append(
																				img);
																var imgtd = $(
																		"<td></td>")
																		.attr(
																				"class",
																				"vdimg")
																		.append(
																				a)
																		.attr(
																				"align",
																				"center");
																;
																var title = $("<marquee></marquee>")
																.attr("scrollamount",3)
																.attr(
																		"class",
																		"svtitle"+i)
																.text(n.title);
																var titletd = $(
																		"<td></td>")
																		.attr(
																				"class",
																				"vdtitle")
																		.append(
																				title);
																var tr = $(
																		"<tr></tr>")
																		.append(
																				imgtd)
																		.attr(
																				"class",
																				"v1");
																var tr2 = $(
																		"<tr></tr>")
																		.append(
																				titletd)
																		.attr(
																				"class",
																				"v1");
																$(".tab0")
																		.append(
																				tr,
																				tr2);
															});
										}
									});
						} else if (params[0] - test[0] < 0.1) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('정상 범위!!');
							var tr = $("<tr></tr>").append(td);

							$(".tab0").append(tr);
						}

						// 운동시간 비교
						if ((params[1] > test[1])
								&& (params[1] - test[1] > 0.2)) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('운동이 너무 과함!!');
							var tr = $("<tr></tr>").append(td);
							$(".tab1").append(tr);
							var j = 0;
							var testarray = [];

							for (var i = 0; i < 5; i++) {
								j = Math.floor((Math.random() * 11));
								testarray[i] = j;
								for (var bb = 0; bb < i; bb++) {
									if (testarray[i] == testarray[bb]) {
										i--;
										break;
									}
								}
							}
							for (var i2 = 0; i2 < 5; i2++) {
								var content = $("<span></span>").attr(
										"data-tooltip-text",
										jbAry[testarray[i2]][1]).text(
										(i2 + 1) + " ) "
												+ jbAry[testarray[i2]][0]);
								var td3 = $("<td></td>").append(content);
								var tr2 = $("<tr></tr>").append(td3);

								$(".tab1").append(tr2);
							}
						} else if (params[1] < test[1]) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('운동 부족!!');
							var tr = $("<tr></tr>").append(td);
							$(".tab1").append(tr);
							$(".v2").empty();
							$
									.ajax({
										url : "https://dapi.kakao.com/v2/search/vclip",
										data : {
											query : keywords[1],
											size : 5
										},
										beforeSend : function(req) {
											req
													.setRequestHeader(
															"Authorization",
															"KakaoAK 854779c907ee4f51133157699d51210d");
										},
										success : function(kakaoJSON) {
											$
													.each(
															kakaoJSON.documents,
															function(i, n) {
																var img = $(
																		"<img>")
																		.attr(
																				"src",
																				n.thumbnail);
																var a = $(
																		"<a></a>")
																		.attr(
																				"href",
																				n.url)
																		.append(
																				img);
																var imgtd = $(
																		"<td></td>")
																		.attr(
																				"class",
																				"vdimg")
																		.append(
																				a)
																		.attr(
																				"align",
																				"center");
																var title = $("<marquee></marquee>")
																		.attr("scrollamount",3)
																		.attr(
																				"class",
																				"evtitle"+i)
																		.text(n.title);
																var titletd = $(
																		"<td></td>")
																		.attr(
																				"class",
																				"vdtitle")
																		.append(
																				title);
																var tr = $(
																		"<tr></tr>")
																		.append(
																				imgtd)
																		.attr(
																				"class",
																				"v2");
																var tr2 = $(
																		"<tr></tr>")
																		.append(
																				titletd)
																		.attr(
																				"class",
																				"v2");
																$(".tab1")
																		.append(
																				tr,
																				tr2);
															});
										}
									});

						} else if (params[1] - test[1] < 0.2) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('정상 범위!!');
							var tr = $("<tr></tr>").append(td);

							$(".tab1").append(tr);
						}

						// 술 횟수 비교
						if (params[2] - test[2] > 2.2) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('술 좀 줄이자!!');
							var tr = $("<tr></tr>").append(td);

							var img = $("<img>").attr('src',
									'resources/IMG/drink.jpg').attr('class', 'imgTD2');

							var div = $("<div></div>").attr('class', 'scale');
							div.append(img);

							var td2 = $("<td></td>").attr("rowspan", "5")
									.append(div);
							var tr2 = $("<tr></tr>").append(td2);

							$(".tab2").append(tr, tr2);
						} else if ((params[2] - test[2] < 2.2)
								&& (params[3] - test[2] > 0.2)) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('술 조금만 줄이자!!').attr("colspan", 2);
							var tr = $("<tr></tr>").append(td);
							$(".tab2").append(tr);

							var simg = [
									[
											'http://image.auction.co.kr/itemimage/12/6c/7f/126c7fac41.jpg',
											'밀크씨슬' ],
									[
											'https://pds.joins.com/news/component/htmlphoto_mmdata/201405/28/htm_2014052811193450105011.JPG',
											'우루사' ],
									[
											'http://ggnn.co.kr/data/item/1499498745/1542079636266m0.jpg',
											'리버트렌스4' ],
									[
											'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/22857767_1357522561025342_2366984492897271808_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&se=7&oh=b583314d17293a2fb05311687828054c&oe=5DF66284&ig_cache_key=MTYzNjk1NTU3MTU0NDY4MDM4NQ%3D%3D.2',
											'엑세라민B' ],
									[
											'http://ggnn.co.kr/data/item/1565749631/thumb-thum_600x600.jpg',
											'써큐클린' ] ];
							var sj = 0;
							var testarray3 = [];
							for (var i = 0; i < 5; i++) {
								sj = Math.floor((Math.random() * 5));
								testarray3[i] = sj;
								for (var bb = 0; bb < i; bb++) {
									if (testarray3[i] == testarray3[bb]) {
										i--;
										break;
									}
								}
							}
							for (var i2 = 0; i2 < 5; i2++) {
								var tr2 = '<tr><td name="pieTD"><img src="'
										+ simg[testarray3[i2]][0]
										+ '" class="imgTD"></td></tr><tr><td>'
										+ simg[testarray3[i2]][1]
										+ '</td></tr>';
								$(".tab2").append(tr2);
							}

						} else if (params[2] - test[2] < 0.2) {

							var td = $("<td></td>").attr('class', 'alert')
									.text('정상 범위!!');
							var tr = $("<tr></tr>").append(td);

							$(".tab2").append(tr);
						}
						// 패스트푸드 비교
						if ((params[3] - test[3] > 0.2)) {
							// test용
							var img = $("<img>").attr('src',
									'resources/IMG/burger.jpg').attr('class',
									'imgTD3');

							// hover용
							var div = $("<div></div>").attr('class', 'scale2');
							div.append(img);

							var td = $("<td></td>").attr('class', 'alert')
									.text('패스트푸드 그만!!');
							var tr = $("<tr></tr>").append(td);

							var td2 = $("<td></td>").append(div);
							var tr2 = $("<tr></tr>").append(td2);

							$(".tab3").append(tr);
							$(".tab3").append(tr2);

						} else if (params[3] - test[3] < 0.2) {
							var td = $("<td></td>").attr('class', 'alert')
									.text('조금만 덜 먹자!!');
							var tr = $("<tr></tr>").append(td);

							$(".tab3").append(tr);
						}
					});

	$.ajax({
		url : "biorythm.chart2",
		success : function(MonthWeekData) {
			var bc = [];
			var mw = [];

			var sleeps = [];
			var exers = [];
			var drinks = [];
			var fasts = [];
			$.each(MonthWeekData.bio, function(i, m) {
				var sleep = m.w_sleep;
				var exer = m.w_exer;
				var drink = m.w_drink;
				var fast = m.w_fast;

				if (sleep == 1) {
					sleep = sleepar[0];
				} else if (sleep == 2) {
					sleep = sleepar[1];
				} else if (sleep == 3) {
					sleep = sleepar[2];
				} else if (sleep == 4) {
					sleep = sleepar[3];
				} else if (sleep == 5) {
					sleep = sleepar[4];
				} else if (sleep == 6) {
					sleep = sleepar[5];
				} else if (sleep == 7) {
					sleep = sleepar[6];
				}

				if (exer == 1) {
					exer = exerar[0];
				} else if (exer == 2) {
					exer = exerar[1];
				} else if (exer == 3) {
					exer = exerar[2];
				} else if (exer == 4) {
					exer = exerar[3];
				} else if (exer == 5) {
					exer = exerar[4];
				} else if (exer == 6) {
					exer = exerar[5];
				}

				if (drink == 1) {
					drink = drinkar[0];
				} else if (drink == 2) {
					drink = drinkar[1];
				} else if (drink == 3) {
					drink = drinkar[2];
				} else if (drink == 4) {
					drink = drinkar[3];
				}

				if (fast == 1) {
					fast = fastar[0];
				} else if (fast == 2) {
					fast = fastar[1];
				} else if (fast == 3) {
					fast = fastar[2];
				} else if (fast == 4) {
					fast = fastar[3];
				}

				sleeps[i] = sleep;
				exers[i] = exer;
				drinks[i] = drink;
				fasts[i] = fast;

				mw[0] = sleeps;
				mw[1] = exers;
				mw[2] = drinks;
				mw[3] = fasts;
			});

			$.ajax({
				url : "MonthWeekJSON",
				success : function(monthWeekJSON) {
					$.each(monthWeekJSON.monthWeekData, function(i, b) {
						bc[i] = b.monthweek;
					});

					var options2 = {
						'legend' : {
							names : [ '수면시간', '운동시간', '술', '패스트푸드' ]
						},
						'dataset' : {
							title : 'Monthly Biorhythm',
							values : mw,
							colorset : [ '#DC143C', '#2EB400', "#8E24AA",
									"#1E88E5", "#EF5350" ],
							fields : bc,
						},
						'chartDiv' : 'chart2',
						'chartType' : 'line',
						'chartSize' : {
							width : 650,
							height : 450
						},
						'minValue' : 0,
						'maxValue' : 14,
						'increment' : 1,
					};
					Nwagon.chart(options2);
				}
			});
		}
	});
});