package com.sdAcademy.fp.member;

import java.util.List;

import com.sdAcademy.fp.scheduler.Schedule;

public interface MemberMapper {
	public abstract int join(Member m);
	public abstract Member getMemberById(Member m);
	
	// 모든 멤버 가져오기
	public abstract List<Member> getAllMember();
	
	// 아이디로 멤버 이름 가져오기
	public abstract Member getMemberNameById(Schedule s);
}
