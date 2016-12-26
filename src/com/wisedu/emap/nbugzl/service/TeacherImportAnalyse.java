package com.wisedu.emap.nbugzl.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wisedu.emap.base.util.GuidUtil;
import com.wisedu.emap.dao.DaoParam;
import com.wisedu.emap.framework.imexport.IImportAnalyse;
import com.wisedu.emap.model2.IEmapAction;
import com.wisedu.emap.model2.IEmapModel;
import com.wisedu.emap.pedestal.app.IEmapAppContext;

@Service("NBUGZL.src.com.wisedu.emap.nbugzl.service.TeacherImportAnalyse")
public class TeacherImportAnalyse implements IImportAnalyse {
	
	@Autowired
	IEmapAppContext appContext;
	
	@SuppressWarnings("deprecation")
	public String actionAnalyse(Map<String, Object> arg0, IEmapModel arg1) {
		// TODO 自动生成的方法存根
		Calendar c = Calendar.getInstance();
		arg0.put("CWID", GuidUtil.getRandomGuid());//增加nbu_course_workload表的唯一主键
		arg0.put("KCID", GuidUtil.getRandomGuid());//增加courses表的唯一主键
		arg0.put("TW_ID", GuidUtil.getRandomGuid());//增加nbu_teacher_workload表的唯一主键
		arg0.put("ZRN", c.get(Calendar.YEAR));//增加导入的年份
		arg0.put("XSFLID", 1);
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
