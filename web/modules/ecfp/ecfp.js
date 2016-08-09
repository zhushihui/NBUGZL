define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./ecfpBS');
	var ecfpSave = require('./ecfpSave');
	var ecfpView = require('./ecfpView');

	var viewConfig = {
		initialize: function() {
			var view = utils.loadCompiledPage('ecfp');
            this.$rootElement.html(view.render({}), true);
            this.pushSubView([ecfpSave]);
            this.initView();

			this.eventMap = {
//				"[data-action=add]": this.actionAdd,
				"[data-action=edit]": this.actionEdit,
//				"[data-action=detail]": this.actionDetail,
//				"[data-action=delete]": this.actionDelete,
//				"[data-action=export]": this.actionExport,
//				"[data-action=import]": this.actionImport,
				"[data-action=custom-column]": this.actionCustomColumn
			};
		},

		initView: function() {
            this._initAdvanceQuery();
            this._initTable();
        },

//        actionAdd: function(){
//        	var ecfpNewTpl = utils.loadCompiledPage('ecfpSave');
//        	$.bhPaperPileDialog.show({
//        		content: ecfpNewTpl.render({}),
//        		title: "新建",
//        		ready: function($header, $body, $footer){
//        			ecfpSave.initialize();
//            	}
//            });
//        },
        
 	   actionEdit: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var jg0101id = $(e.target).attr("bh");
        	var ecfpEditTpl = utils.loadCompiledPage('ecfpSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'ecfp', {CWID:id,JG0101ID:jg0101id});
        	
        	$.bhPaperPileDialog.show({
        		content: ecfpEditTpl.render({}),
        		title: "添加教师",
        		ready: function($header, $body, $footer){
        			ecfpSave.initialize();
        			
        			$("#emapForm").emapForm("setValue", data.rows[0]);
        			
            	}
            });
        },
//        
//        actionDetail: function(e){
//        	var id = $(e.target).attr("data-x-wid");
//        	var ecfpViewTpl = utils.loadCompiledPage('ecfpSave');
//        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'ecfp', {WID:id});
//        	
//        	$.bhPaperPileDialog.show({
//        		content: ecfpViewTpl.render({}),
//        		title: "查看",
//        		ready: function($header, $body, $footer){
//        			ecfpView.initialize(data.rows[0]);
//            	}
//            });
//        },
//        
//        actionDelete: function(){
//    		var row = $("#emapdatatable").emapdatatable("checkedRecords");
//    		if(row.length > 0){
//    			var params = row.map(function(el){
////    				return {XSBH:el.XSBH, XXX:el.XXX};	//模型主键
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
//	        	"page": "ecfp",
//	        	"action": "ecfp",
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
            var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'ecfp', "search");
            var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
                data: searchData,
                contextPath : contextPath,
                schema: true
            });
            $query.on('search', this._searchCallback);
        },

        _searchCallback: function(e, data, opts) {
            $('#emapdatatable').emapdatatable('reload', {
                querySetting: data
            });
        },

        _initTable: function() {
            var tableOptions = {
                pagePath: bs.api.pageModel,
                action: 'ecfp',
                height:null,
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
                        	return '<a href="javascript:void(0)" data-action="edit"  data-x-wid=' + rowData.CWID + ' bh=' + rowData.JG0101ID + '>' + '添加' + '</a>';
                        }
                    }
                }]
            };
            $('#emapdatatable').emapdatatable(tableOptions);
        }
	};

	return viewConfig;
});