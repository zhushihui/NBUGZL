package com.wisedu.emap.nbugzl.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wisedu.emap.dao.DaoParam;
import com.wisedu.emap.framework.imexport.IImportSave;
import com.wisedu.emap.model2.IEmapModel;
import com.wisedu.emap.model2.action.ActionType;
import com.wisedu.emap.model2.action.IDataModelUpdateAction;
import com.wisedu.emap.model2.container.DataModelContainer;
import com.wisedu.emap.pedestal.app.IEmapAppContext;

@Service("NBUGZL.src.com.wisedu.emap.nbugzl.service.ExternalImportSave")
public class ExternalImportSave implements IImportSave {
	@Autowired
	IEmapAppContext appContext;
	@Override
	public String save(IEmapModel arg0, Map<?, ?> arg1) {
		DaoParam dao = new DaoParam();
		for (Map.Entry<?, ?> entry : arg1.entrySet()) {
			System.out.println("key= " + entry.getKey() + " and value= "
					+ entry.getValue());
			String s = (String) entry.getKey();
			if (s.equals("STATUS")) {
				if(entry.getValue() == null || entry.getValue() == "") 
					continue;
				else 
					dao.addParam(s, entry.getValue());
			} else {
				dao.addParam(s, entry.getValue());
			}
		}
		DataModelContainer d1 = appContext.getDataModel("JG0101");
		IDataModelUpdateAction a1 = d1.getUpdateAction(ActionType.SAVE);
		a1.execute(dao);
		return null;
	}

}
