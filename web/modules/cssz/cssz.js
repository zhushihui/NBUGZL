define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./csszBS');
	var csszSave = require('./csszSave');
	var csszView = require('./csszView');
	var csszParam = require('./csszParam');

	var viewConfig = {
		initialize: function() {
			var view = utils.loadCompiledPage('cssz');
            this.$rootElement.html(view.render({}), true);
            this.pushSubView([csszSave]);
            this.pushSubView([csszParam]);
            this.initView();

			this.eventMap = {
//				"[data-action=add]": this.actionAdd,
				"[data-action=edit]": this.actionEdit,
//				"[data-action=detail]": this.actionDetail,
//				"[data-action=delete]": this.actionDelete,
//				"[data-action=export]": this.actionExport,
//				"[data-action=import]": this.actionImport,
				"[data-action=custom-column]": this.actionCustomColumn,
				"[data-action=batchModify]": this.actionBatchModify				
			};
		},

		initView: function() {
            this._initAdvanceQuery();
            this._initTable();
        },

        
        actionBatchModify: function() {
             	var row = $("#emapdatatable").emapdatatable("checkedRecords");
             	var csszEditTpl = utils.loadCompiledPage('csszParam');
             	if (row.length > 0) {
         			var params = row.map(function(el){
         				return {KCID:el.KCID, CWID:el.CWID, XXX:el.XXX};	//模型主键
         			});
                 	$.bhPaperPileDialog.show({
                 		content: csszEditTpl.render({}),
                 		title: "编辑",
                 		ready: function($header, $body, $footer){
                 			csszParam.initialize();    		          			
                     	}
                     });
             	}
             },
        
        
//        actionAdd: function(){
//        	var csszNewTpl = utils.loadCompiledPage('csszSave');
//        	$.bhPaperPileDialog.show({
//        		content: csszNewTpl.render({}),
//        		title: "新建",
//        		ready: function($header, $body, $footer){
//        			csszSave.initialize();
//            	}
//            });
//        },
        
 	   actionEdit: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var cwid = $(e.target).attr("data-x-cwid");
        	var csszEditTpl = utils.loadCompiledPage('csszSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'szcs', {KCID:id,CWID:cwid});
        	
        	$.bhPaperPileDialog.show({
        		content: csszEditTpl.render({}),
        		title: "编辑",
        		ready: function($header, $body, $footer){
        			csszSave.initialize();
        			
        			$("#emapForm").emapForm("setValue", data.rows[0]);
        			
            	}
            });
        },
        
//        actionDetail: function(e){
//        	var id = $(e.target).attr("data-x-wid");
//        	var csszViewTpl = utils.loadCompiledPage('csszSave');
//        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'szcs', {KCID:id});
//        	
//        	$.bhPaperPileDialog.show({
//        		content: csszViewTpl.render({}),
//        		title: "查看",
//        		ready: function($header, $body, $footer){
//        			csszView.initialize(data.rows[0]);
//            	}
//            });
//        },
//        
//        actionDelete: function(){
//    		var row = $("#emapdatatable").emapdatatable("checkedRecords");
//    		if(row.length > 0){
//    			var params = row.map(function(el){
//    				return {KCID:el.KCID, XXX:el.XXX};	//模型主键
//    			});
//    			bs.del(params).done(function(data){
//    				alert("数据删除成功");
//    				$('#emapdatatable').emapdatatable('reload');
//    			});
//    		}
//        },
//        
//        actionExport: function(){
//        	bs.exportData({}).done(function(data){
//        	});
//        },
//
//		actionImport: function(){
//        	$.emapImport({
//	        	"contextPath": contextPath,
//	        	"app": "nbugzl",
//	        	"module": "modules",
//	        	"page": "cssz",
//	        	"action": "szcs",
//	        	//"tplUrl": "modules/htgl/dataModel.T_JZG_HT.xls",
//	        	"preCallback": function() {
//	        	},
//	        	"closeCallback": function() {
//	        		$('#emapdatatable').emapdatatable('reload');
//	        	},
//	    	});
//        },
        
        actionCustomColumn: function(){
        	$('#emapdatatable').emapdatatable('selectToShowColumns');
        },
        
		_initAdvanceQuery: function() {
            var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'szcs', "search");
            var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
                data: searchData,
                contextPath : contextPath,
                schema: true
            });
            $query.on('search', this._searchCallback);
        },

        _searchCallback: function(e, data, opts) {
            $('#emapdatatable').emapdatatable('reloadFirstPage', {
                querySetting: data
            });
        },

        _initTable: function() {
            var tableOptions = {
                pagePath: bs.api.pageModel,
                action: 'szcs',
                height:null,
                pageSize:50,
                customColumns: [{
                    colIndex: '0',
                    type: 'checkbox'
                }, {
                    colIndex: '1',
                    type: 'tpl',
                    column: {
                        text: '操作',
                        align: 'center',
                        cellsAlign: 'center',
                        cellsRenderer: function(row, column, value, rowData) {
                            return '<a href="javascript:void(0)" data-action="edit" data-x-wid="' + rowData.KCID +'" data-x-cwid=' + rowData.CWID +'>' + '编辑' + '</a>';
                        }
                    }
                }]
            };
            $('#emapdatatable').emapdatatable(tableOptions);
        }
	};

	return viewConfig;
});