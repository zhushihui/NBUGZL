define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./jsgrgzlmxBS');
	var jsgrgzlmxSave = require('./jsgrgzlmxSave');
	var jsgrgzlmxView = require('./jsgrgzlmxView');

	var viewConfig = {
		initialize: function() {
			var view = utils.loadCompiledPage('jsgrgzlmx');
            this.$rootElement.html(view.render({}), true);
            this.pushSubView([jsgrgzlmxSave]);
            this.initView();

			this.eventMap = {
				"[data-action=add]": this.actionAdd,
				"[data-action=edit]": this.actionEdit,
				"[data-action=detail]": this.actionDetail,
				"[data-action=delete]": this.actionDelete,
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
        	var jsgrgzlmxNewTpl = utils.loadCompiledPage('jsgrgzlmxSave');
        	$.bhPaperPileDialog.show({
        		content: jsgrgzlmxNewTpl.render({}),
        		title: "新建",
        		ready: function($header, $body, $footer){
        			jsgrgzlmxSave.initialize();
            	}
            });
        },
        
 	   actionEdit: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var jsgrgzlmxEditTpl = utils.loadCompiledPage('jsgrgzlmxSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'jsgrgzlmx', {WID:id});
        	
        	$.bhPaperPileDialog.show({
        		content: jsgrgzlmxEditTpl.render({}),
        		title: "编辑",
        		ready: function($header, $body, $footer){
        			jsgrgzlmxSave.initialize();
        			
        			$("#emapForm").emapForm("setValue", data.rows[0]);
        			
            	}
            });
        },
        
        actionDetail: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var jsgrgzlmxViewTpl = utils.loadCompiledPage('jsgrgzlmxSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'jsgrgzlmx', {WID:id});
        	
        	$.bhPaperPileDialog.show({
        		content: jsgrgzlmxViewTpl.render({}),
        		title: "查看",
        		ready: function($header, $body, $footer){
        			jsgrgzlmxView.initialize(data.rows[0]);
            	}
            });
        },
        
        actionDelete: function(){
    		var row = $("#emapdatatable").emapdatatable("checkedRecords");
    		if(row.length > 0){
    			var params = row.map(function(el){
//    				return {XSBH:el.XSBH, XXX:el.XXX};	//模型主键
    			});
    			bs.del(params).done(function(data){
    				alert("数据删除成功");
    				$('#emapdatatable').emapdatatable('reload');
    			});
    		}
        },
        
        actionExport: function(){
        	bs.exportData({}).done(function(data){
        	});
        },

		actionImport: function(){
        	$.emapImport({
	        	"contextPath": contextPath,
	        	"app": "nbugzl",
	        	"module": "modules",
	        	"page": "jsgrgzlmx",
	        	"action": "jsgrgzlmx",
	        	//"tplUrl": "modules/htgl/dataModel.T_JZG_HT.xls",
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
            var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'jsgrgzlmx', "search");
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
                action: 'jsgrgzlmx',
                height:null,
                customColumns: [{
                    colIndex: '0',
                    type: 'checkbox'
                }, {
//                    colIndex: '1',
//                    type: 'tpl',
                    column: {
                        text: '操作',
                        align: 'center',
                        cellsAlign: 'center',
                        cellsRenderer: function(row, column, value, rowData) {
                            return '<a href="javascript:void(0)" data-action="detail" data-x-wid=' + rowData.WID + '>' + '详情' + '</a>'+ 
                            ' | <a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.WID + '>' + '编辑' + '</a>';
                        }
                    }
                }]
            };
            $('#emapdatatable').emapdatatable(tableOptions);
        }
	};

	return viewConfig;
});