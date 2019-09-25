package com.sdAcademy.fp.bio;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sdAcademy.fp.member.Member;

@Controller
public class BioController {

	@Autowired
	private BioDAO bDAO;

	// biorythm.go
	@RequestMapping(value = "/biorythm.go", method = RequestMethod.GET)
	public String goBio(Bio b, HttpServletRequest req, Member m) {

		if (bDAO.insertCheck(m, req) == 0) {
			req.setAttribute("includePage", "../rhythm/bioCheck.jsp");
			return "calendar/indexCalendar";
		} else {
			// db값 가져오기
			b = bDAO.getBioJSON(m, req).getBio().get(0);
			//System.out.println(bDAO.getBioJSON().getBio().get(0));
			// 가져온 값을 아래의 코드에 넣기
			// 링크에 값 넣고 state 값 출력
			bDAO.getBiorythm(b, req);
			req.setAttribute("includePage", "../rhythm/bioResult.jsp");
			return "calendar/indexCalendar";
		}

	}

	// biorythm.update
	@RequestMapping(value = "/biorythm.update", method = RequestMethod.GET)
	public String goBioU(HttpServletRequest req) {
		req.setAttribute("includePage", "../rhythm/bioUpdate.jsp");
		return "calendar/indexCalendar";
	}

	// biorythm.update.json
	@RequestMapping(value = "/biorythm.update.json", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public @ResponseBody Bios bioUJson(Member m, HttpServletRequest req) {
		return bDAO.getBioJSON(m, req);
	}

	@RequestMapping(value = "/biorythm.get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public @ResponseBody Bios bioCheckAJAX(HttpServletRequest req, Member m) {
		if (bDAO.insertCheck(m, req) == 0) {
			bDAO.insertBioData(req);
		}
		return bDAO.getBioJSON(m, req);
	}

	@RequestMapping(value = "/biorythm.chart2", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public @ResponseBody Bios bioCheckAJAX2(Member m, HttpServletRequest req) {
		return bDAO.getBioJSON2(m, req);
	}

	@RequestMapping(value = "/MonthWeekJSON", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public @ResponseBody MonthWeeks getMonthWeekJSON(Member m, HttpServletRequest req) {
		return bDAO.getMonthWeekJSON(m, req);
	}

	// biorythm.update.done
	@RequestMapping(value = "biorythm.update.done", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public @ResponseBody Bios bioCheckAJAX3(HttpServletRequest req, Member m) {
		bDAO.updateBioData(req);
		return bDAO.getBioJSON(m, req);
	}

}
