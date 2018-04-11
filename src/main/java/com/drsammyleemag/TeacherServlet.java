package com.drsammyleemag;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.people.v1.PeopleService;
import com.google.api.services.people.v1.model.Person;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

import freemarker.template.Template;
import freemarker.template.TemplateException;
import com.drsammyleemag.entity.Schedule;


public class TeacherServlet extends HttpServlet { 
	private final Logger log = Logger.getLogger("logger");
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res) 
			throws ServletException, IOException{
		User user = UserServiceFactory.getUserService().getCurrentUser();
		if(user == null){
			res.sendRedirect("/login");
			return;
		}
		LoginInfo info = new LoginInfo();
		Credential cred = GoogleUtils.cred(user.getUserId());
		if(cred == null || cred.getAccessToken() == null){
			log.warning("cred or access token is null");
			res.sendRedirect("/auth");
			return;
		}
		
		info.email = user.getEmail();
		info.token = cred.getAccessToken();
		info.logout = UserServiceFactory.getUserService().createLogoutURL("/");
		
		//make info a json sting
		ObjectMapper mapper = new ObjectMapper();
		String infoJson = mapper.writeValueAsString(info);
		log.info("loginfo is " + infoJson);
		
		
		
		TemplateGen template = (TemplateGen) this.getServletContext().getAttribute("template");
		res.setContentType("text/html");
		res.setStatus(HttpServletResponse.SC_OK);
		log.log(Level.INFO, "redenring teacher");
		//populate the root with user profile
		Map<String, Object> root = new HashMap<>();
		root.put("info", infoJson);
		Template teacherPage = template.getTeacherPage();
		
			try {
				teacherPage.process(root, res.getWriter());
			} catch (TemplateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
	}

}
