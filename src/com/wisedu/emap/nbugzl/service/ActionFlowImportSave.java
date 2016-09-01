package com.wisedu.emap.nbugzl.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sun.awt.AppContext;

import com.wisedu.emap.dao.DaoParam;
import com.wisedu.emap.framework.imexport.IImportSave;
import com.wisedu.emap.model2.IEmapAction;
import com.wisedu.emap.model2.IEmapModel;
import com.wisedu.emap.model2.QueryResult;
import com.wisedu.emap.model2.action.ActionType;
import com.wisedu.emap.model2.action.IDataModelUpdateAction;
import com.wisedu.emap.model2.container.DataModelContainer;
import com.wisedu.emap.pedestal.app.IEmapAppContext;

@Service("NBUGZL.src.com.wisedu.emap.nbugzl.service.ActionFlowImportSave")
public class ActionFlowImportSave implements IImportSave {
	@Autowired
	IEmapAppContext appContext;

	public String save(IEmapModel arg0, Map<?, ?> arg1) {

		DaoParam dao = new DaoParam();
		DaoParam dao1 = new DaoParam();
		for (Map.Entry<?, ?> entry : arg1.entrySet()) {
			System.out.println("key= " + entry.getKey() + " and value= "
					+ entry.getValue());
			dao.addParam((String) entry.getKey(), entry.getValue());
			dao1.addParam((String) entry.getKey(), entry.getValue());
			if((String)entry.getKey() == "D"){
				dao.addParam("D1", entry.getValue());
				dao1.addParam("D1", 1);
			}			
		}
		
		DataModelContainer d1 = appContext.getDataModel("NBU_COURSES");
		IDataModelUpdateAction a1 = d1.getUpdateAction(ActionType.SAVE);

		DataModelContainer d2 = appContext.getDataModel("NBU_COURSE_WORKLOAD");
		IDataModelUpdateAction a2 = d2.getUpdateAction(ActionType.SAVE);

		DataModelContainer d3 = appContext.getDataModel("NBU_TEACHER_WORKLOAD");
		IDataModelUpdateAction a3 = d3.getUpdateAction(ActionType.ADD);
		a1.execute(dao);
		a2.execute(dao);
		a3.execute(dao1);
		
		
		return null;
	}

}
