define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./ecfpBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'fpmb', 'form');
            $("#paramForm").emapForm({
                data: mode,
                model: 'h',
                root:WIS_EMAP_SERV.getContextPath()
            });
            
            this.eventMap = {
                '[data-action=update]': this.updateParam
            };
        },
        updateParam: function(){
        	if( $("#paramForm").emapValidate('validate') ){
	        		bs.save(params).done(function(params){
	    			});
				alert("数据保存成功");
				$('#emapdatatable').emapdatatable('reload');
				$.bhPaperPileDialog.hide();
        	}
        }

    };
    return viewConfig;
});