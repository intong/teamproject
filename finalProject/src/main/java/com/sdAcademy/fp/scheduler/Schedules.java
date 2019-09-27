package com.sdAcademy.fp.scheduler;

import java.util.List;

public class Schedules {
private List<Schedule> schedule;

private Schedule sch;
	
	
	public Schedules() {
		// TODO Auto-generated constructor stub
	}


	


	public Schedules(List<Schedule> schedule) {
		super();
		this.schedule = schedule;
	}





	public Schedules(List<Schedule> schedule, Schedule sch) {
		super();
		this.schedule = schedule;
		this.sch = sch;
	}





	public List<Schedule> getSchedule() {
		return schedule;
	}


	public void setSchedule(List<Schedule> schedule) {
		this.schedule = schedule;
	}





	public Schedule getSch() {
		return sch;
	}





	public void setSch(Schedule sch) {
		this.sch = sch;
	}
	
	

}
