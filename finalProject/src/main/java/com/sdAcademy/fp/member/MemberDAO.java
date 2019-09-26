package com.sdAcademy.fp.member;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberDAO {
	
	private boolean loginCheck;
	
	@Autowired
	private SqlSession ss;
	
	// 로그인 여부 체크하기
	public boolean loginCheckSession(HttpServletRequest request) {
		if (request.getSession().getAttribute("m") != null) {
			return loginCheck = true;
		}else {
			return loginCheck = false;
		}
	}
	
	// 회원가입하기
	public void joinMember(HttpServletRequest request, Member m) {
		try {			
			if (ss.getMapper(MemberMapper.class).join(m) == 1) {
				request.setAttribute("result1", "회원 가입되었습니다.\n 감사합니다.");
			}else {
				request.setAttribute("result1", "회원가입 실패");
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("db문제");
		}
	}// end of 회원가입 메서드
		
	// 로그인
	public void login(HttpServletRequest request, Member inputMember) {
		try {
			Member dbMember = ss.getMapper(MemberMapper.class).getMemberById(inputMember);
			if (dbMember == null) {
				System.out.println("미가입");
			}else {
				if (inputMember.getM_pass().equals(dbMember.getM_pass())) {
					System.out.println("로그인성공");
					request.getSession().setAttribute("m", inputMember);
					request.getSession().setMaxInactiveInterval(15*60);
					loginCheckSession(request);
				}else {
					System.out.println("비번불일치");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("로그인실패- DB");
		}
	}// end of login 메서드
	
	// 로그아웃
	public void logout(HttpServletRequest request) {
		request.getSession().setAttribute("m", null);
		System.out.println("확인");
	}
	
	// 모든 멤버 반환해주는 메서드(달력 셀렉트 옵션 추가 할때 사용 )
	public Members getAllMember() {
		List<Member> member = ss.getMapper(MemberMapper.class).getAllMember();
		Members members = new Members(member);
		return members;
	}

	
	
} // end of class
