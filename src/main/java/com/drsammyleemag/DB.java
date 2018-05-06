package com.drsammyleemag;


import static com.googlecode.objectify.ObjectifyService.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.Work;


public class DB<T> implements Serializable {
	
	static {
		
	}
	

	
	private DB(){
		
	}
	
	
	public static Objectify db(){
		return ofy();
	}
	//Revist using Generics at a later time for now just use objectify	
	private Class<T> clazz;
 
  
  public DB(Class<T> clazz){
		this.clazz = clazz;
	}
  
  
  public  Key<T> save(final T clazz){
	
		return ofy().transactNew(new Work<Key<T>>(){

			@Override
			public Key<T> run() {
				// TODO Auto-generated method stub
				return db().save().entity(clazz).now();
			}});
	}
	
	public  void delete(T entity){
		DB.db().delete().entity(entity).now();
	}
	
	public  List<T> list(){
		return DB.db().transactNew(new Work<List<T>>(){

			@Override
			public List<T> run() {
				return DB.db().load().type(clazz).list();
			}});
		
	}
	

	
	public  T getById(Long id){
		
	 return	DB.db().load().type(clazz).id(id).now();
	}
	
	public void deleteById(Long id){
		DB.db().delete().type(clazz).id(id);
		
	}
	
	public Collection<T> listByKeys(List<Key<T>> keys){
	
		return DB.db().load().keys(keys).values();
	}
	

	
}
		


