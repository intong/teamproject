package com.sdAcademy.fp.scheduler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ScheduleController {
	
	@Autowired
	private ScheduleDAO sDAO;
	

	
	// 날짜 스케줄 json 만들기 ( 챗봇에 사용)
	@RequestMapping(value = "/getSchedule.json", method = RequestMethod.GET,produces="application/json; charset=utf-8")
	public @ResponseBody Schedules getScheduleJSON(Schedule s,HttpServletResponse res) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return sDAO.getScheduleByDate(s);
	}
	
	// 아이디를 통해서 스케줄 json 만들기 (달력 , 스케줄표에 사용 )
	@RequestMapping(value = "/getSchedulebyId", method = RequestMethod.GET,produces="application/json; charset=utf-8")
	public @ResponseBody Schedules getSchedulebyId(Schedule s,HttpServletResponse res,HttpServletRequest req) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return sDAO.getScheduleById(s,req);
	}
	
	// 아이디로 스케줄 게시판 출력용 json 만들기
	@RequestMapping(value = "/getScheduleBoardListLimit4", method = RequestMethod.GET,produces="application/json; charset=utf-8")
	public @ResponseBody Schedules getSchedulebyIdLimit4(Schedule s,HttpServletResponse res,HttpServletRequest req) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return sDAO.getScheduleBoadJSON(s, req);
	}
	
	
	// 스케줄 등록하기
	@RequestMapping(value = "/scheduleInsert", method = RequestMethod.GET,produces="application/json; charset=utf-8")
	public @ResponseBody Schedules scheduleInsert(Schedule s,HttpServletResponse res,HttpServletRequest req) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return sDAO.scheduleInsert(s,req);
	}

	

	
	

	
	
}
