package com.sdAcademy.fp.scheduler;

import java.util.List;

public interface ScheduleMapper {
	
	// 날짜로 스케줄 리스트 가져오기
	public abstract List<Schedule> getScheduleByDate(Schedule s);

	// 이름으로 스케줄 리스트 가져오기
	public abstract List<Schedule> getScheduleById(Schedule s);
	
	// 게시판 스케줄 가져오기
	public abstract List<Schedule> getScheduleListLimit4(Schedule s);
	
	// 스케줄 등록 
	public abstract int scheduleInsert(Schedule s);
	
	// 스케줄 날짜 변경
	public abstract int scheduleUpdateDate(Schedule s);
	
	
	// 번호에 맞는 스케줄 가져오기
	public abstract Schedule getScheduleByNo(Schedule s);
	
	// 스케줄 삭제 
	public abstract int scheduleDelete(Schedule s);
	
	
	// 스케줄 전부 업데이트 
	public abstract int scheduleUpdateAll(Schedule s);
	
	// 최근 올린 스케줄 가져오기
	public abstract Schedule getScheduleNew(Schedule s);

}
