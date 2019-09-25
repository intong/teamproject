package com.sdAcademy.fp.scheduler;

import java.util.List;

public class Schedules {
private List<Schedule> schedule;
	
	
	public Schedules() {
		// TODO Auto-generated constructor stub
	}


	public Schedules(List<Schedule> schedule) {
		super();
		this.schedule = schedule;
	}


	public List<Schedule> getSchedule() {
		return schedule;
	}


	public void setSchedule(List<Schedule> schedule) {
		this.schedule = schedule;
	}

}
