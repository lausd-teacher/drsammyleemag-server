package com.drsammyleemag.entity;

import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

public abstract class UserProf {

	@Id
	public Long id;
	@Index
	public String acctId;
	public String firstName;
	public String lastName;
	public String picUrl;
}
