package com.sdAcademy.fp.scheduler;

import java.util.List;

public interface ScheduleMapper {
	
	// 날짜로 스케줄 리스트 가져오기
	public abstract List<Schedule> getScheduleByDate(Schedule s);

	// 이름으로 스케줄 리스트 가져오기
	public abstract List<Schedule> getScheduleById(Schedule s);
	
	// 스케줄 등록 
	public abstract int scheduleInsert(Schedule s);

}
