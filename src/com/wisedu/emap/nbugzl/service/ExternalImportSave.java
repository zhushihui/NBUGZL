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
			dao.addParam((String) entry.getKey(), entry.getValue());
			if(((String)entry.getKey()).equals("JG0101ID_")){
				dao.addParam("JG0101ID", entry.getValue());
			} else if (((String)entry.getKey()).equals("XM_")) {
				dao.addParam("XM", entry.getValue());
			} else if (((String)entry.getKey()).equals("DWH_")) {
				dao.addParam("DWH", entry.getValue());
			} else if (((String)entry.getKey()).equals("STATUS_")) {
				dao.addParam("STATUS", entry.getValue());
			}
		}
		DataModelContainer d1 = appContext.getDataModel("NBU_WP_JG0101");
		IDataModelUpdateAction a1 = d1.getUpdateAction(ActionType.SAVE);
		a1.execute(dao);
		return null;
	}

}
