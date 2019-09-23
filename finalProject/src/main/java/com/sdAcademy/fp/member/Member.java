package com.sdAcademy.fp.member;

public class Member {
	private String m_id;
	private String m_pass;
	private String m_name;
	private String m_birth;
	
	public Member() {
		// TODO Auto-generated constructor stub
	}

	public Member(String m_id, String m_pass, String m_name, String m_birth) {
		super();
		this.m_id = m_id;
		this.m_pass = m_pass;
		this.m_name = m_name;
		this.m_birth = m_birth;
	}

	public String getM_id() {
		return m_id;
	}

	public void setM_id(String m_id) {
		this.m_id = m_id;
	}

	public String getM_pass() {
		return m_pass;
	}

	public void setM_pass(String m_pass) {
		this.m_pass = m_pass;
	}

	public String getM_name() {
		return m_name;
	}

	public void setM_name(String m_name) {
		this.m_name = m_name;
	}

	public String getM_birth() {
		return m_birth;
	}

	public void setM_birth(String m_birth) {
		this.m_birth = m_birth;
	}
	
	

	
	
	
}
