define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./kcgzlBS');
	var kcgzlSave = require('./kcgzlSave');
	var kcgzlView = require('./kcgzlView');

	var viewConfig = {
		initialize: function() {
			var view = utils.loadCompiledPage('kcgzl');
            this.$rootElement.html(view.render({}), true);
            this.pushSubView([kcgzlSave]);
            this.initView();

			this.eventMap = {
//				"[data-action=add]": this.actionAdd,
//				"[data-action=edit]": this.actionEdit,
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

        actionAdd: function(){
        	var kcgzlNewTpl = utils.loadCompiledPage('kcgzlSave');
        	$.bhPaperPileDialog.show({
        		content: kcgzlNewTpl.render({}),
        		title: "新建",
        		ready: function($header, $body, $footer){
        			kcgzlSave.initialize();
            	}
            });
        },
        
 	   actionEdit: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var kcgzlEditTpl = utils.loadCompiledPage('kcgzlSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'kcgzl', {WID:id});
        	
        	$.bhPaperPileDialog.show({
        		content: kcgzlEditTpl.render({}),
        		title: "编辑",
        		ready: function($header, $body, $footer){
        			kcgzlSave.initialize();
        			
        			$("#emapForm").emapForm("setValue", data.rows[0]);
        			
            	}
            });
        },
        
        actionDetail: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var kcgzlViewTpl = utils.loadCompiledPage('kcgzlSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'kcgzl', {WID:id});
        	
        	$.bhPaperPileDialog.show({
        		content: kcgzlViewTpl.render({}),
        		title: "查看",
        		ready: function($header, $body, $footer){
        			kcgzlView.initialize(data.rows[0]);
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
	        	"page": "kcgzl",
	        	"action": "kcgzl",
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
            var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'kcgzl', "search");
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
                action: 'kcgzl',
                height:null,
                customColumns: [{
                    colIndex: '0',
                    type: 'checkbox'
                }, {
                   
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