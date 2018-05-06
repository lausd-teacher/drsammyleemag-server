package com.drsammyleemag.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.calendar.model.Calendar;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;
import com.google.api.services.people.v1.PeopleService;
import com.google.api.services.people.v1.model.Person;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.googlecode.objectify.Key;
import com.google.common.collect.ImmutableList;

@WebServlet("/teacher/*")
public class TeacherService extends HttpServlet{

	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException{
		String uri = req.getPathInfo();
		if(uri == null) {
			getTeacherPage(req, res);
		}else {
		switch(uri) {
		case AppUrl.STU_MONTH:getStudentMonth(req,res); break;
		case AppUrl.AWARDS:getAwards(req,res); break;
		default:getPlayground(req,res); break;//default to playground
		}
		}
	}
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException{
		String uri = req.getPathInfo();
		if(uri == null) {
			
		}else {
		switch(uri) {
		case AppUrl.STU_MONTH:postStudentMonth(req,res); break;
		case AppUrl.AWARDS:postAwards(req,res); break;
		default:postPlayground(req,res); break;//default to playground
		}
		}
	}
	
	@Override
	public void doDelete(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException{
		String uri = req.getPathInfo();
		if(uri== null) {
			
		}else {
		switch(uri) {
		case AppUrl.STU_MONTH:deleteStudentMonth(req,res); break;
		case AppUrl.AWARDS:deleteAwards(req,res); break;
		default:deletePlayground(req,res); break;//default to playground
		}
		}
	}
	
	private void getTeacherPage(HttpServletRequest req, HttpServletResponse res) {
		
	}
	private void getStudentMonth(HttpServletRequest req, HttpServletResponse res) {
		
	}
	
private void getAwards(HttpServletRequest req, HttpServletResponse res) {
		
	}
private void getPlayground(HttpServletRequest req, HttpServletResponse res) {
	
}
private void postPlayground(HttpServletRequest req, HttpServletResponse res) {
	
}
private void postAwards(HttpServletRequest req, HttpServletResponse res) {
	
}
private void postStudentMonth(HttpServletRequest req, HttpServletResponse res) {
	
}
private void deleteStudentMonth(HttpServletRequest req, HttpServletResponse res) {
	
}

private void deleteAwards(HttpServletRequest req, HttpServletResponse res) {
	
}
private void deletePlayground(HttpServletRequest req, HttpServletResponse res) {
	
}
}
