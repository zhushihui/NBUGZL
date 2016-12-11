define(function(require, exports, module) {
	var utils = require('utils');
	var bs = {
		api: {
			pageModel: 'modules/ecfp.do',
			resultProfile: './mock/resultProfile.json'
		},
		getDemoMainModel: function() {
			var def = $.Deferred();
			utils.doAjax(bs.api.resultProfile, null, 'get').done(function(data) {
				data.length = data.list.length;
				def.resolve(data);
			}).fail(function(res) {
				def.reject(res);
			});
			return def.promise();
		},
		save: function(formData){
			//TODO 将formData提交到自定义动作流上
			return BH_UTILS.doAjax('../modules/ecfp/ecfpdzl.do', formData);
		},
		del: function(params){
			//TODO 添加删除动作
			return BH_UTILS.doAjax('../modules/ecfp/NBU_TEACHER_WORKLOAD_DELETE.do', {
				NBU_TEACHER_WORKLOAD_DELETE:JSON.stringify(params)
			});
		},
		exportData: function(obj){
			var params = {
					root: contextPath,
					app : "nbugzl",
					module : "modules",
					page : 'ecfp',
					action : 'ecfp'
			};
			//选择字段导出
			$('#emapdatatable').emapdatatable('selectColumnsExport', params);	
		},
		
		exportJcData: function(obj){
			var params = {
					root: contextPath,
					app : "nbugzl",
					module : "modules",
					page : 'ecfp',
					action : 'jcsj'
			};
			//选择字段导出
			$('#paramForm').emapdatatable('selectColumnsExport', params);	
		},
		//二次分配界面,输入比例为分数时运算方法
        popupGetScore : function(score){
        	if (score ==''){//是否为空
        		score ='0';
        	}
        	var result = 0;
        	if(score.indexOf('/') > 0){//包含分号
        		var scoreList = score.split('/');
        		result = scoreList[0] / scoreList[1];
        	}else{
        		result = score;
        	}
        	return result;
        },
        //二次分配添加界面,输入比例是否合理
        popupDialogDanger : function(str,od) {
        	var p = {};
        	//是否包含中文和英文
        	if (escape(str).indexOf("%u") <0 && str.search(/[a-zA-Z]+/)==-1){
        		if(this.popupGetScore(str) >1 || this.popupGetScore(str) <0){//是否大于1 或小于0
            		p = {
                			title:'操作提示',
                            content:od+'比例不能大于1且不能小于0',
                            buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
                	BH_UTILS.bhDialogDanger(
                			p
                	);
                	return false;
            	}else{
            		return true;
            	}
            }else {
            	p = {
            			title:'操作提示',
                        content:'比例不能含有汉字和字母',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
        		BH_UTILS.bhDialogDanger(
            			p
            	);
        		return false;
        	}
        },
        //二次分配回退界面,输入比例是否合理
        popupEditDialogDanger : function(str,od,nd) {
        	var p = {};
        	//是否包含中文和英文
        	if (escape(str).indexOf("%u") <0 && str.search(/[a-zA-Z]+/)==-1){
        		if(this.popupGetScore(str) >nd || this.popupGetScore(str) <0){//是否大于nd
            		p = {
                			title:'操作提示',
                            content:od+'比例不能大于' + nd,
                            buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
                	BH_UTILS.bhDialogDanger(
                			p
                	);
                	return false;
            	}else{
            		return true;
            	}
            }else {
            	p = {
            			title:'操作提示',
                        content:'比例不能含有汉字和字母',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
        		BH_UTILS.bhDialogDanger(
            			p
            	);
        		return false;
        	}
        },
      //二次分配界面，调用模板时,输入比例是否合理
        popupModelDialogDanger : function(sumData,otherData) {
        	var isAll = false;
        	//比例之和是否为1,且是当前课程比例
        	if(sumData.D1 >0 && sumData.D1 <1 && otherData.D1 !=0){
        		otherData.D1 = (1-sumData.D1).toFixed(3);
        		isAll = true;
        	}
        	if(sumData.D2 >0 && sumData.D2 <1 && otherData.D2 !=0){
        		otherData.D2 = (1-sumData.D2).toFixed(3);
        		isAll = true;
        	}
        	if(sumData.D3 >0 && sumData.D3 <1 && otherData.D3 !=0){
        		otherData.D3 = (1-sumData.D3).toFixed(3);
        		isAll = true;
        	}
        	if(sumData.D4 >0 && sumData.D4 <1 && otherData.D4 !=0){
        		otherData.D4 = (1-sumData.D4).toFixed(3);
        		isAll = true;
        	}
        	if(sumData.D5 >0 && sumData.D5 <1 && otherData.D5 !=0){
        		otherData.D5 = (1-sumData.D5).toFixed(3);
        		isAll = true;
        	}
        	if(sumData.D6 >0 && sumData.D6 <1 && otherData.D6 !=0){
        		otherData.D6 = (1-sumData.D6).toFixed(3);
        		isAll = true;
        	}
        	
        	otherData['isAll'] = isAll;
        	return otherData;
        }
	};

	return bs;
});