define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./ecfpBS');

    var viewConfig = {
        initialize: function() {
        	   var tableOptions = {
                       pagePath: bs.api.pageModel,
                       action: 'jcsj',
                       height:null,
                       customColumns: [{
//                           colIndex: '0',
//                           type: 'checkbox'
                       }, {
//                           colIndex: '1',
//                           type: 'tpl',
                           column: {
                               text: '����',
                               align: 'center',
                               cellsAlign: 'center',
                               cellsRenderer: function(row, column, value, rowData) {
                                   return '<a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.WID + '>' + '�༭' + '</a>';
                               }
                           }
                       }]
                   };
                   $('#paramForm').emapdatatable(tableOptions);
               
            
            this.eventMap = {
                '[data-action=exportJc]': this.actionExportJc
            };
        },
         
        
        actionExportJc: function(){
        	bs.exportJcData().done(function(data){
        	});
        },
    };
    return viewConfig;
});