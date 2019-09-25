package com.sdAcademy.fp.member;

import java.util.List;

public class Members {
	private List<Member> member;

	public Members(List<Member> member) {
		super();
		this.member = member;
	}

	public Members() {
		// TODO Auto-generated constructor stub
	}

	public List<Member> getMember() {
		return member;
	}

	public void setMember(List<Member> member) {
		this.member = member;
	}

}
