define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xyndgzlhzBS');

    var viewConfig = {
        initialize: function(data) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'xyjxgzl', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h',
                readonly:true
            });
            $("#emapForm").emapForm("setValue", data);
            
            $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});