package com.sdAcademy.fp;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sdAcademy.fp.member.MemberDAO;


@Controller
public class HomeController {
	
	@Autowired
	private MemberDAO mDAO;
	
	// 최초진입
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(HttpServletRequest request) {
		if (mDAO.loginCheckSession(request)) {
			request.setAttribute("includePage", "scheduleIncludePage.jsp");
			return "calendar/indexCalendar";
		}
		return "index";
	}
}
