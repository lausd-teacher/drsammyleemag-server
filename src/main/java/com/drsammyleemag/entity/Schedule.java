package com.drsammyleemag.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Schedule {
	@Id
	public Long id;
	@Index
	public String acctId;
	public ScheduleItem[] items;

}
