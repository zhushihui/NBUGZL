define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./jsgrgzlmxBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'jsgrgzlmx', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h'
            });
            
            this.eventMap = {
                '[data-action=save]': this.save
            };
        },
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		var formData = $("#emapForm").emapForm("getValue");
        		bs.save(formData).done(function(data){
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