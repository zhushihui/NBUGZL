define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./jsglBS');
	var jsglSave = require('./jsglSave');
	var jsglView = require('./jsglView');

	var viewConfig = {
		initialize: function() {
			var view = utils.loadCompiledPage('jsgl');
            this.$rootElement.html(view.render({}), true);
            this.pushSubView([jsglSave]);
            this.initView();

			this.eventMap = {
				"[data-action=add]": this.actionAdd,
				"[data-action=edit]": this.actionEdit,
//				"[data-action=detail]": this.actionDetail,
//				"[data-action=delete]": this.actionDelete,
				"[data-action=export]": this.actionExport,
				"[data-action=import]": this.actionImport,
				"[data-action=custom-column]": this.actionCustomColumn
			};
		},

		initView: function() {
            this._initAdvanceQuery();
            this._initTable();
        },

        actionAdd: function(){
        	var jsglNewTpl = utils.loadCompiledPage('jsglSave');
        	$.bhPaperPileDialog.show({
        		content: jsglNewTpl.render({}),
        		title: "新建",
        		ready: function($header, $body, $footer){
        			jsglSave.initialize();
            	}
            });
        },
        
 	   actionEdit: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var jsglEditTpl = utils.loadCompiledPage('jsglSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'cxjsxx', {JG0101ID_:id});
        	
        	$.bhPaperPileDialog.show({
        		content: jsglEditTpl.render({}),
        		title: "编辑",
        		ready: function($header, $body, $footer){
        			jsglSave.initialize();
        			
        			$("#emapForm").emapForm("setValue", data.rows[0]);
        			
            	}
            });
        },
        
//        actionDetail: function(e){
//        	var id = $(e.target).attr("data-x-wid");
//        	var jsglViewTpl = utils.loadCompiledPage('jsglSave');
//        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'cxjsxx', {JG0101ID:id});
//        	
//        	$.bhPaperPileDialog.show({
//        		content: jsglViewTpl.render({}),
//        		title: "查看",
//        		ready: function($header, $body, $footer){
//        			jsglView.initialize(data.rows[0]);
//            	}
//            });
//        },
        
//        actionDelete: function(){
//    		var row = $("#emapdatatable").emapdatatable("checkedRecords");
//    		if(row.length > 0){
//    			var params = row.map(function(el){
//    				return {JG0101ID:el.JG0101ID, XXX:el.XXX};	//模型主键
//    			});
//    			bs.del(params).done(function(data){
//    				alert("数据删除成功");
//    				$('#emapdatatable').emapdatatable('reload');
//    			});
//    		}
//        },
        
        actionExport: function(){
        	bs.exportData({}).done(function(data){
        	});
        },

		actionImport: function(){
			var params = {
					"save" : "NBUGZL.src.com.wisedu.emap.nbugzl.service.ExternalImportSave"
			};
        	$.emapImport({
	        	"contextPath": contextPath,
	        	"app": "nbugzl",
	        	"params" : params,
	        	"module": "modules",
	        	"page": "jsgl",
	        	"action": "wpjsdrdzl",
	        	"tplUrl": "modules/jsgl/JG_WP_TEACHER.xls",
	        	"preCallback": function() {
	        	},
	        	"closeCallback": function() {
	        		$('#emapdatatable').emapdatatable('reload');
	        	},
	    	});
        },
        
        actionCustomColumn: function(){
        	$('#emapdatatable').emapdatatable('selectToShowColumns');
        },
        
		_initAdvanceQuery: function() {
            var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'cxjsxx', "search");
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
                action: 'cxjsxx',
                height:null,
                customColumns: [
//                                {
//                    colIndex: '0',
//                    type: 'checkbox'
//                }, 
                {
                    colIndex: '0',
                    type: 'tpl',
                    column: {
                        text: '操作',
                        align: 'center',
                        cellsAlign: 'center',
                        cellsRenderer: function(row, column, value, rowData) {
                        	if (rowData.STATUS_ == '外聘') {
                        		 return '<a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.JG0101ID_ + '>' + '编辑' + '</a>';
                        	} else {
                        		return '无';
                        	}
                           
                        }
                    }
                }]
            };
            $('#emapdatatable').emapdatatable(tableOptions);
        }
	};

	return viewConfig;
});