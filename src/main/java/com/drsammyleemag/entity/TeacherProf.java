package com.drsammyleemag.entity;

import com.google.api.services.people.v1.model.Person;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;

@Entity
public class TeacherProf{

	@Id
	public String acctId;
	public String[] gradeLevels;
	public String roomNum;
	public String title;
	@Ignore
	public Person person;
	
}
