package com.sdAcademy.fp.bio;

import java.util.Date;

public class Bio {
	private Date w_date;
	private String w_id;
	private double w_sleep;
	private double w_exer;
	private double w_drink;
	private double w_fast;
	
	private String state;

	public Bio() {
		// TODO Auto-generated constructor stub
	}

	public Bio(Date w_date, String w_id, double w_sleep, double w_exer, double w_drink, double w_fast, String state) {
		super();
		this.w_date = w_date;
		this.w_id = w_id;
		this.w_sleep = w_sleep;
		this.w_exer = w_exer;
		this.w_drink = w_drink;
		this.w_fast = w_fast;
		this.state = state;
	}

	public Date getW_date() {
		return w_date;
	}

	public void setW_date(Date w_date) {
		this.w_date = w_date;
	}

	public String getW_id() {
		return w_id;
	}

	public void setW_id(String w_id) {
		this.w_id = w_id;
	}

	public double getW_sleep() {
		return w_sleep;
	}

	public void setW_sleep(double w_sleep) {
		this.w_sleep = w_sleep;
	}

	public double getW_exer() {
		return w_exer;
	}

	public void setW_exer(double w_exer) {
		this.w_exer = w_exer;
	}

	public double getW_drink() {
		return w_drink;
	}

	public void setW_drink(double w_drink) {
		this.w_drink = w_drink;
	}

	public double getW_fast() {
		return w_fast;
	}

	public void setW_fast(double w_fast) {
		this.w_fast = w_fast;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	
}
