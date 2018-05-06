package com.drsammyleemag;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;


@WebListener
public class TemplateListener implements ServletContextListener{

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		event.getServletContext().setAttribute("template", null);
		
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		TemplateGen template = new TemplateGen(event.getServletContext());
		event.getServletContext().setAttribute("template", template);
		
	}

}
