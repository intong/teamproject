package com.sdAcademy.fp.bio;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdAcademy.fp.member.Member;

@Service
public class BioDAO {

	@Autowired
	private SqlSession ss;



	public int insertCheck(Member m, HttpServletRequest request) {
		// System.out.println(req.getSession().getAttribute("m"));
		try {
			m = (Member) request.getSession().getAttribute("m");

			return ss.getMapper(BioMapper.class).getCountBioData(m);

		} catch (Exception e) {
			e.printStackTrace();
			return 100;
		}
	}

	public void insertBioData(HttpServletRequest request) {
		// DB에 등록
		Connection con = null;
		PreparedStatement pstmt = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://dee123456.cafe24.com/dee123456?serverTimezone=Asia/Seoul", "dee123456",
					"sdedu03teampro");
			String query = "insert into sep06_weekJ values(NULL,NOW(),?,?,?,?,?)";
			pstmt = con.prepareStatement(query);
			Member m = (Member) request.getSession().getAttribute("m");
			String m_id = m.getM_id();
			String sleep = request.getParameter("sleep");
			System.out.println(sleep);
			String exercise = request.getParameter("exercise");
			String drink = request.getParameter("drink");
			String fast = request.getParameter("fast");

			pstmt.setString(1, m_id);
			pstmt.setString(2, sleep);
			pstmt.setString(3, exercise);
			pstmt.setString(4, drink);
			pstmt.setString(5, fast);
			pstmt.executeUpdate();
			
			pstmt.close();
			con.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// update
	public void updateBioData(HttpServletRequest request) {
		// DB에 등록
		Connection con = null;
		PreparedStatement pstmt = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://dee123456.cafe24.com/dee123456?serverTimezone=Asia/Seoul", "dee123456",
					"sdedu03teampro");
			String query = "update sep06_weekJ set w_sleep=?,w_exer=?,w_drink=?,w_fast=? where year(w_date)=year(now()) and week(w_date)=week(now())";

			pstmt = con.prepareStatement(query);
			String sleep = request.getParameter("sleep");
			String exercise = request.getParameter("exercise");
			String drink = request.getParameter("drink");
			String fast = request.getParameter("fast");

			String[] sleepar = { "1", "3", "6", "8.1", "10", "12", "13" };
			String[] exerar = { "1", "2.1", "3", "4", "5", "6" };
			String[] drinkar = { "1.1", "3", "5", "6" };
			String[] fastar = { "2.1", "4", "6", "7" };

			for (int i = 1; i < 8; i++) {
				if (sleep == "i") {
					sleep = sleepar[i - 1];
				}
			}
			for (int i = 1; i < 7; i++) {
				if (exercise == "i") {
					exercise = exerar[i - 1];
				}
			}
			for (int i = 1; i < 5; i++) {
				if (drink == "i") {
					drink = drinkar[i - 1];
				}
			}
			for (int i = 1; i < 8; i++) {
				if (fast == "i") {
					fast = fastar[i - 1];
				}
			}
			pstmt.setString(1, sleep);
			pstmt.setString(2, exercise);
			pstmt.setString(3, drink);
			pstmt.setString(4, fast);
			pstmt.executeUpdate();

			pstmt.close();

			con.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
/*
	// doWhatData를 aug22_test DB table에서 꺼내 json으로 뽑아내기
	public DoWhats getDoWhatJSON() {
		try {
			return new DoWhats(ss.getMapper(FinalMapper.class).getDoWhatData());

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	*/

	public Bios getBioJSON(Member m, HttpServletRequest request) {
		try {
			// System.out.println(getBioJSON());
			m = (Member) request.getSession().getAttribute("m");
			return new Bios(ss.getMapper(BioMapper.class).getBioData(m));

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 월별
	public Bios getBioJSON2(Member m, HttpServletRequest request) {
		try {
			// System.out.println(getBioJSON());
			m = (Member) request.getSession().getAttribute("m");
			return new Bios(ss.getMapper(BioMapper.class).getBioMonthData(m));

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// MonthWeek JSON
	public MonthWeeks getMonthWeekJSON(Member m, HttpServletRequest request) {
		try {
			// System.out.println(getBioJSON());
			m = (Member) request.getSession().getAttribute("m");
			return new MonthWeeks(ss.getMapper(BioMapper.class).getMonthWeek(m));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// July03_1_JQueryCrossDomainAJAX 참고
	// FlaskWas를 통한 딥러닝 AI 결과 도출
	public void getBiorythm(Bio b, HttpServletRequest request) {
		try {
			String s = String.format("http://59.9.140.27:9999/biorythm.get?sleep=%f&exercise=%f&drink=%f&fast=%f",
					b.getW_sleep(), b.getW_exer(), b.getW_drink(), b.getW_fast());
			URL u = new URL(s);
			HttpURLConnection huc = (HttpURLConnection) u.openConnection();
			InputStream is = huc.getInputStream();

			InputStreamReader isr = new InputStreamReader(is, "utf-8");
			JSONParser jp = new JSONParser();
			JSONObject state = (JSONObject) jp.parse(isr);

			String test = state.get("state").toString();
			request.setAttribute("test", test);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
