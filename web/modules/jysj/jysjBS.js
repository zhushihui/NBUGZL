define(function(require, exports, module) {
	var utils = require('utils');
	var bs = {
		api: {
			pageModel: 'modules/jysj.do',
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
			return BH_UTILS.doAjax('../modules/jysj/sjglydtzjdzl.do', formData);
		},
		del: function(params){
			//TODO 添加删除动作
//			return BH_UTILS.doAjax('../modules/jysj/T_PXXX_XSJBXX_DELETE.do', {
//				T_PXXX_XSJBXX_DELETE:JSON.stringify(params)
//			});
		},
		exportData: function(obj){
			$.ajax({
				url : contextPath + "/sys/emapcomponent/imexport/export.do",
				data : {
					app : "nbugzl",
					module : "modules",
					page : 'jysj',
					action : 'jysjdr'
				},
				type : 'post',
				dataType : 'json',
				success : function(ret) {
					var attachment = ret.attachment;
					var url = contextPath + "/sys/emapcomponent/file/getAttachmentFile/"
							+ attachment + ".do";
					window.location.href = url;
					return false;
				},
				error : function(resp) {
					if (resp.status == 401 || resp.status == 403)
						alert('导出失败');
				}
			});
		}
	};

	return bs;
});