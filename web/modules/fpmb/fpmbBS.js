﻿define(function(require, exports, module) {
	var utils = require('utils');
	var bs = {
		api: {
			pageModel: 'modules/fpmb.do',
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
			//TODO 将formData提交到后台动作上
			return BH_UTILS.doAjax('../modules/fpmb/NBU_DIVIDE_TEMPLATE_SAVE.do', formData);
		},
		del: function(params){
			//TODO 添加删除动作
//			return BH_UTILS.doAjax('../modules/fpmb/T_PXXX_XSJBXX_DELETE.do', {
//				T_PXXX_XSJBXX_DELETE:JSON.stringify(params)
//			});
		},
		exportData: function(obj){
			var params = {
					root: contextPath,
					app : "nbugzl",
					module : "modules",
					page : 'fpmb',
					action : 'fpmb'
			};
			//选择字段导出
			$('#emapdatatable').emapdatatable('selectColumnsExport', params);	
		}
	};

	return bs;
});