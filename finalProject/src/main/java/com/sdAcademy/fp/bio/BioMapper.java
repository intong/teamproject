package com.sdAcademy.fp.bio;

import java.util.List;

import com.sdAcademy.fp.member.Member;

public interface BioMapper {
	
//	public abstract List<DoWhat> getDoWhatData();
	public abstract List<Bio> getBioData(Member m);
	public abstract int getCountBioData(Member m);
	public abstract List<Bio> getBioMonthData(Member m);
	public abstract List<MonthWeek> getMonthWeek(Member m);
	
	//login
	public abstract Member getMemberByID(Member m);
}
