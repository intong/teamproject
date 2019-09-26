package com.sdAcademy.fp.scheduler;

public class Schedule {
	private int s_no;
	private String s_id;
	private String s_content;
	private String s_stime;
	private String s_etime;
	private String s_part;
	private String s_partKor;
	private int s_todocheck;
	private String s_color;
	private boolean s_allday;
	
	
	
	
	private String m_name;
	
	public Schedule() {
		// TODO Auto-generated constructor stub
	}

	public Schedule(int s_no, String s_id, String s_content, String s_stime, String s_etime, String s_part,
			String s_partKor, int s_todocheck, String s_color, boolean s_allday, String m_name) {
		super();
		this.s_no = s_no;
		this.s_id = s_id;
		this.s_content = s_content;
		this.s_stime = s_stime;
		this.s_etime = s_etime;
		this.s_part = s_part;
		this.s_partKor = s_partKor;
		this.s_todocheck = s_todocheck;
		this.s_color = s_color;
		this.s_allday = s_allday;
		this.m_name = m_name;
	}

	public int getS_no() {
		return s_no;
	}

	public void setS_no(int s_no) {
		this.s_no = s_no;
	}

	public String getS_id() {
		return s_id;
	}

	public void setS_id(String s_id) {
		this.s_id = s_id;
	}

	public String getS_content() {
		return s_content;
	}

	public void setS_content(String s_content) {
		this.s_content = s_content;
	}

	public String getS_stime() {
		return s_stime;
	}

	public void setS_stime(String s_stime) {
		this.s_stime = s_stime;
	}

	public String getS_etime() {
		return s_etime;
	}

	public void setS_etime(String s_etime) {
		this.s_etime = s_etime;
	}

	public String getS_part() {
		return s_part;
	}

	public void setS_part(String s_part) {
		this.s_part = s_part;
	}

	public String getS_partKor() {
		return s_partKor;
	}

	public void setS_partKor(String s_partKor) {
		this.s_partKor = s_partKor;
	}

	public int getS_todocheck() {
		return s_todocheck;
	}

	public void setS_todocheck(int s_todocheck) {
		this.s_todocheck = s_todocheck;
	}

	public String getS_color() {
		return s_color;
	}

	public void setS_color(String s_color) {
		this.s_color = s_color;
	}

	public boolean isS_allday() {
		return s_allday;
	}

	public void setS_allday(boolean s_allday) {
		this.s_allday = s_allday;
	}

	public String getM_name() {
		return m_name;
	}

	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	
	
	
	

	
	
	
	
	
	
}
