define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xybmglBS');

    var viewConfig = {
        initialize: function(data) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'XX0301_QUERY', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h',
                readonly:true,
                root:WIS_EMAP_SERV.getContextPath()
            });
            $("#emapForm").emapForm("setValue", data);
            
            $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});