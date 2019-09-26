package com.sdAcademy.fp.scheduler;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleDAO {
	@Autowired
	private SqlSession ss;
	
	
	
	// 약속한 사람 아이디를 이름으로 변환해주는 메서드
	/*private List<Schedule> transKor(List<Schedule> schedules){
		Schedule sch = new Schedule();
		
		for (Schedule schedule : schedules) {
			String parts = null;
			String[] part;
			String kopart = "";
			if (schedule.getS_part() != null) {
				parts = schedule.getS_part();
				part = parts.split(" ");
				for (int i = 0; i < part.length; i++) {
					sch.setS_id(part[i]);
					if (i + 1 == part.length) {
						kopart += ss.getMapper(MemberMapper.class).getMemberNameById(sch).getM_name();
					} else {
						kopart += ss.getMapper(MemberMapper.class).getMemberNameById(sch).getM_name() + " ";
					}
				}
			}
			schedule.setKoPart(kopart);
		}
		return schedules;
		
		
		
	}*/
	
	
	// 날짜로 스케줄가져와서 JSON으로 보내줄 schedules 리턴(챗봇에 사용되는 json)
	public Schedules getScheduleByDate(Schedule s) {
		List<Schedule> schedules = ss.getMapper(ScheduleMapper.class).getScheduleByDate(s);
		Schedules result = new Schedules(schedules);
		return result;
	}
	
	
	// 아이디로 스케줄 가져와서 JSON 으로 보내줄 schedules 리턴 (달력,스케줄표에 사용 되는 json)
	public Schedules getScheduleById(Schedule s, HttpServletRequest request) {
		
		List<Schedule> schedules = ss.getMapper(ScheduleMapper.class).getScheduleById(s);
	
		
		
		Schedules result = new Schedules(schedules);
		return result;
	}
	
	// 스케줄 등록하는 메서드 
	public Schedules scheduleInsert(Schedule s, HttpServletRequest request) {
		
		try {
			if (ss.getMapper(ScheduleMapper.class).scheduleInsert(s) == 1) {
				System.out.println("성공");
			} else {
				System.out.println("망했따! 도랐따!");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Schedule> schedules = ss.getMapper(ScheduleMapper.class).getScheduleListLimit4(s);
		Schedules result = new Schedules(schedules);
		
		return result;
	}
	
	
	// 스케줄 게시판 출력용 JSON 메서드
	public Schedules getScheduleBoadJSON(Schedule s, HttpServletRequest request) {
		s.setS_id(request.getParameter("s_id"));
		List<Schedule> schedules = ss.getMapper(ScheduleMapper.class).getScheduleListLimit4(s);
		Schedules result = new Schedules(schedules);
		return result;
	} 

} // end of class
