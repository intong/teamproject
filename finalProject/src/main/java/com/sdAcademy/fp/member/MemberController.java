package com.sdAcademy.fp.member;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MemberController {

	@Autowired
	private MemberDAO mDAO;
	
	
	// login 하기
	@RequestMapping(value = "/login.go", method = RequestMethod.POST)
	public void loginDo(HttpServletResponse response, HttpServletRequest request, Member inputMember) {
		mDAO.login(request, inputMember);
		try {
			response.sendRedirect("/fp/");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	// 회원가입양식으로 가기
	@RequestMapping(value = "/join", method = RequestMethod.GET)
	public String goInsertMember(HttpServletResponse response) {
		return "registrationPage/regMember";
	}
	
	// 회원가입하기
	@RequestMapping(value = "/join", method = RequestMethod.POST)
	public String goInsertMember(HttpServletRequest request, Member m) {
		mDAO.joinMember(request, m);
		mDAO.login(request, m);
		request.setAttribute("includePage", "scheduleIncludePage.jsp");
		return "calendar/indexCalendar";
	}

	// logout 하기
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		mDAO.logout(request);
		try {
			response.sendRedirect("/fp/");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
