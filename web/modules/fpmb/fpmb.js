define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./fpmbBS');
	var fpmbSave = require('./fpmbSave');
	var fpmbEdit = require('./fpmbEdit');
	var fpmbView = require('./fpmbView');

	var viewConfig = {
		initialize: function() {
			var view = utils.loadCompiledPage('fpmb');
            this.$rootElement.html(view.render({}), true);
            this.pushSubView([fpmbSave,fpmbEdit]);
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
        	var fpmbNewTpl = utils.loadCompiledPage('fpmbSave');
        	var data ={D1:0,D2:0,D3:0,D4:0,D5:0,D6:0};
        	var datatwo = {type:'add'};
        	$.bhPaperPileDialog.show({
        		content: fpmbNewTpl.render({}),
        		title: "新建",
        		ready: function($header, $body, $footer){
        			fpmbSave.initialize();
        			$("#emapForm").emapForm("setValue", data);
        			$("#d_param").val(JSON.stringify(datatwo));
            	}
            });
        },
        
 	   actionEdit: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var fpmbEditTpl = utils.loadCompiledPage('fpmbEdit');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'fpmb', {DT_ID:id});
        	var datatwo = {KCID:data.rows[0].KCID,JG0101ID:data.rows[0].JG0101ID};
        	$.bhPaperPileDialog.show({
        		content: fpmbEditTpl.render({}),
        		title: "编辑",
        		ready: function($header, $body, $footer){
        			fpmbEdit.initialize(); //js界面初始化
        			$("#emapForm").emapForm("setValue", data.rows[0]);
        			$("#d_param").val(JSON.stringify(datatwo));
            	}
            });
        },
        
        actionDetail: function(e){
        	var id = $(e.target).attr("data-x-wid");
        	var fpmbViewTpl = utils.loadCompiledPage('fpmbSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'fpmb', {WID:id});
        	
        	$.bhPaperPileDialog.show({
        		content: fpmbViewTpl.render({}),
        		title: "查看",
        		ready: function($header, $body, $footer){
        			fpmbView.initialize(data.rows[0]);
            	}
            });
        },
        
        actionDelete: function(e){
        	BH_UTILS.bhDialogDanger({
        		title:'操作提示',
        		content:'是否进行删除',
        		buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
        			var dt_id = $(e.target).attr("data-x-wid");
//    		var row = $("#emapdatatable").emapdatatable("checkedRecords");
//    		if(row.length > 0){
//    			var params = row.map(function(el){
//    				return {DT_ID:el.DT_ID};	//模型主键
//    			});
    			var params = {DT_ID:dt_id};
    			bs.del(params).done(function(data){
//    				alert("数据删除成功");
    				$('#emapdatatable').emapdatatable('reload');
    			});
//    		}
        	
        }},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
        		}}]
        	});
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
	        	"page": "fpmb",
	        	"action": "fpmb",
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
            var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'fpmb', "search");
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
                action: 'fpmb',
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
                            return '<a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.DT_ID + '>' + '编辑' + '</a>' + 
                            ' | <a href="javascript:void(0)" data-action="delete"  data-x-wid=' + rowData.DT_ID + '>' + '删除' + '</a>' ;
                        }
                    }
                }]
            };
            $('#emapdatatable').emapdatatable(tableOptions);
        }
	};

	return viewConfig;
});