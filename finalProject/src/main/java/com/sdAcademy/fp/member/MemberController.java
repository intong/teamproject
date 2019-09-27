package com.sdAcademy.fp.member;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public void goInsertMember(HttpServletRequest request, Member m, HttpServletResponse response) {
		mDAO.joinMember(request, m);
		mDAO.login(request, m);
		try {
			response.sendRedirect("/fp/");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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

	// 멤버들 JSON 으로 보내주기
	@RequestMapping(value = "/getAllMember.json", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	public @ResponseBody Members getAllMemberJSON(HttpServletResponse res) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return mDAO.getAllMember();
	}

}
