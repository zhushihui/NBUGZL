package com.wisedu.emap.nbugzl.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.wisedu.emap.base.util.GuidUtil;
import com.wisedu.emap.framework.imexport.IImportAnalyse;
import com.wisedu.emap.model2.IEmapModel;

@Service("NBUGZL.src.com.wisedu.emap.nbugzl.service.TeacherImportAnalyse")
public class TeacherImportAnalyse implements IImportAnalyse{

	public String actionAnalyse(Map<String, Object> arg0, IEmapModel arg1) {
		// TODO 自动生成的方法存根
		arg0.put("CWID",GuidUtil.getRandomGuid());
		arg0.put("KCID",GuidUtil.getRandomGuid());
		arg0.put("TW_ID",GuidUtil.getRandomGuid());
		return null;
	}

	public Map<Integer, String> afterAnalyse(List<Map<String, Object>> arg0,
			IEmapModel arg1) {
		// TODO 自动生成的方法存根
		System.out.println("afterAnalyse");
		return null;
	}

	public Map<Integer, String> afterSaveAnalyse(
			List<Map<String, Object>> arg0, IEmapModel arg1) {
		// TODO 自动生成的方法存根
		System.out.println("afterSaveAnalyse");
		return null;
	}

	public Map<Integer, String> beforeAnalyse(List<Map<String, Object>> arg0,
			IEmapModel arg1) {
		// TODO 自动生成的方法存根
		System.out.println("before");
		return null;
	}

}
