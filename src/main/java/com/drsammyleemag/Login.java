package com.drsammyleemag;


import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;




import com.google.api.client.auth.oauth2.Credential;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;


@WebServlet("/login")
public class Login extends HttpServlet{
	private final Logger log = Logger.getAnonymousLogger();
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException{
		
		log.info("Login servlet called");
		UserService us = UserServiceFactory.getUserService();
		User user = us.getCurrentUser();
		if(user == null){
			String url = us.createLoginURL("/login");
			res.sendRedirect(url);
			return;
		}
		Credential cred = GoogleUtils.cred(user.getUserId());
		
    	//possible null for cred if this is the case have user auth
    	//then send back here
    	if(cred == null || cred.getAccessToken() == null){
    		log.info("cred is null in first log in should redirect");
    		res.sendRedirect("/auth");
    		return;
    	}
    	
    	if(cred.getExpiresInSeconds()< 600){
			cred.refreshToken();
		}
    	
		//send user to appropriate page
		
	}
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException{
				doGet(req, res);
	}
	
}
