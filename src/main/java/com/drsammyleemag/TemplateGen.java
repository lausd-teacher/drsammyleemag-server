package com.drsammyleemag;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletContext;
import freemarker.log.Logger;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapperBuilder;
import freemarker.template.Template;
import freemarker.template.TemplateDateModel;
import freemarker.template.TemplateExceptionHandler;

public class TemplateGen{
	
	private  final Configuration cfg = new Configuration(Configuration.VERSION_2_3_28);
	private final  Logger LOG = Logger.getLogger(TemplateGen.class.getName());
	public TemplateGen(ServletContext ctx){
		
		
		
		// Specify the data source where the template files come from. Here I set a
		// plain directory for it, but non-file-system are possible too:
		
		cfg.setServletContextForTemplateLoading(ctx, "WEB-INF/html");
		// Specify how templates will see the data-model. This is an advanced topic...
		// for now just use this:
		DefaultObjectWrapperBuilder owb = new DefaultObjectWrapperBuilder(Configuration.VERSION_2_3_28);
		owb.setForceLegacyNonListCollections(false);
		owb.setDefaultDateType(TemplateDateModel.DATETIME);
		cfg.setObjectWrapper(owb.build());

		// Set your preferred charset template files are stored in. UTF-8 is
		// a good choice in most applications:
		cfg.setDefaultEncoding("UTF-8");

		// Sets how errors will appear. Here we assume we are developing HTML pages.
		// For production systems TemplateExceptionHandler.RETHROW_HANDLER is better.
		cfg.setTemplateExceptionHandler(TemplateExceptionHandler.HTML_DEBUG_HANDLER);

	}
	
	public  String getAdminPage(){
		try {
			Template adminPage = cfg.getTemplate("admin.html");
			HashMap<String, Object> root = new HashMap<String, Object>();
			
			return adminPage.toString();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return error();
	}
	
	public  Template getTeacherPage(){
		try {
			Template teacherPage = cfg.getTemplate("teacher.html");
			return teacherPage;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	}
	
	public  Template getPlaygroundPage(){
		try {
			Template studentPage = cfg.getTemplate("playgroundSchedule.html");
			return studentPage;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	public  Template getSchoologyPage(){
		try {
			Template sch = cfg.getTemplate("schoology-google-login.html");
			return sch;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public Template getHomePage() {
		Template hp;
		try {
			hp = cfg.getTemplate("index.html");
			return hp;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	

	
   private static String error(){
	   return "<h1>Error</h1><div>Error redenring the page, please try later</div>";
   }


}
