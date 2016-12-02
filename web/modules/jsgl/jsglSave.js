define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./jsglBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'cxjsxx', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h',
                root:WIS_EMAP_SERV.getContextPath()
            });
            
            this.eventMap = {
                '[data-action=save]': this.save
            };
        },
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		var formData = $("#emapForm").emapForm("getValue");
        		var convertData = {
        				JG0101ID : formData.JG0101ID_,
        				XM : formData.XM_,
        				DWH : formData.DWH_,
        				STATUS : formData.STATUS_	
        		}
        		bs.save(convertData).done(function(data){
    				//alert("数据保存成功");
        			
        			BH_UTILS.bhDialogSuccess({
                        title:'操作提示',
                        content:'数据保存成功',
                        callback:function(){
                            //alert('按钮的回调函数');
                        }
                    });

    				$('#emapdatatable').emapdatatable('reload');
    				$.bhPaperPileDialog.hide();//关闭当前弹窗
    			});
        	}
        }

    };
    return viewConfig;
});