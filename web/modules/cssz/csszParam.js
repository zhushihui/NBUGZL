define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./csszBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'gxcsbc', 'form');
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
        		
        		var formData = $("#paramForm").emapForm("getValue");

        		var row = $("#emapdatatable").emapdatatable("checkedRecords");
				for (var i = 0; i < row.length; i++) {
					var KCID = row[i].KCID;
					var params = {
						K4 : formData.K4,
						K5 : formData.K5,
						C1 : formData.C1,
						C2 : formData.C2,
						C3 : formData.C3,
						C4 : formData.C4,
						C6 : formData.C6,
						J : formData.J,
						KCID : KCID
					};
	        		bs.save(params).done(function(params){

	    			});
				}
				alert("���ݱ���ɹ�");
				$('#emapdatatable').emapdatatable('reload');
				$.bhPaperPileDialog.hide();//�رյ�ǰ����
        	}
        }

    };
    return viewConfig;
});