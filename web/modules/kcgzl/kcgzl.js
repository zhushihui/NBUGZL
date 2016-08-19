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
				"[data-action=custom-column]": this.actionCustomColumn,
				"[data-action=reckon]": this.actionReckon
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
        
        actionReckon: function(){
        	BH_UTILS.bhDialogSuccess({
                title:'操作提示',
                content:'是否进行工作量计算',
                buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
                	//工作量计算动作流 
                	$('#jqxLoader').css({'visibility' : 'visible','display' : 'block'});////打开等待界面
                	bs.reckon({}).done(function(data){
                		$('#jqxLoader').css({'visibility' : 'hidden','display' : 'none'});//关闭等待界面
                		if(data.code == "0"){
                			BH_UTILS.bhDialogSuccess({
                                title:'操作提示',
                                content:'工作量计算成功',
                                callback:function(){
                                }
                            });
                			$('#emapdatatable').emapdatatable('reload');//刷新列表
                			$.bhPaperPileDialog.hide();//关闭当前弹窗
                		}else{
                			BH_UTILS.bhDialogDanger({
                                title:'操作提示',
                                content:'工作量计算失败,请确认K、C等参数是否输入!',
                                buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                            });
                		}
        			});
                }},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
                }}]
            });
        	
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