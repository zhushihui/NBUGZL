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
        	var twid = $(e.target).attr("data-x-wid");
        	var ecfpEditTpl = utils.loadCompiledPage('ecfpSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'ecfp', {TW_ID:twid});
        	//数据整理
        	var dataTwo = {YEAR:data.rows[0].YEAR,TERM:data.rows[0].TERM,JG0101ID:data.rows[0].JG0101ID,
        			CWID:data.rows[0].CWID,JX0404ID:data.rows[0].JX0404ID,XSFLID:data.rows[0].XSFLID,
        			TW_ID:data.rows[0].TW_ID,D1_1:'0',D2_1:'0',D3_1:'0',D4_1:'0',D5_1:'0',D6_1:'0'};
        	var dataThree ={D1:data.rows[0].D1_1,D2:data.rows[0].D2_1,D3:data.rows[0].D3_1,D4:data.rows[0].D4_1,D5:data.rows[0].D5_1,D6:data.rows[0].D6_1};
        	$.bhPaperPileDialog.show({
        		content: ecfpEditTpl.render({}),
        		title: "添加教师",
        		ready: function($header, $body, $footer){
        			ecfpSave.initialize();	
        			$("#emapForm").emapForm("setValue", dataTwo);
        			//主列表教师的工作量比例
        			$("#d_param").val(JSON.stringify(dataThree));
        			//设置工作量比例是否可修改
        			if(dataThree.D1 == "0"){
        				$('input[name="D1_1"]').attr("disabled","true"); 
        			}
        			if(dataThree.D2 == "0"){
        				$('input[name="D2_1"]').attr("disabled","true"); 
        			}
        			if(dataThree.D3 == "0"){
        				$('input[name="D3_1"]').attr("disabled","true"); 
        			}
        			if(dataThree.D4 == "0"){
        				$('input[name="D4_1"]').attr("disabled","true"); 
        			}
        			if(dataThree.D5 == "0"){
        				$('input[name="D5_1"]').attr("disabled","true"); 
        			}
        			if(dataThree.D6 == "0"){
        				$('input[name="D6_1"]').attr("disabled","true"); 
        			}
        			
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
                        	return '<a href="javascript:void(0)" data-action="edit"  data-x-wid=' + rowData.TW_ID  +'>' + '分配' + '</a>';
                        }
                    }
                }]
            };
            $('#emapdatatable').emapdatatable(tableOptions);
        }
	};

	return viewConfig;
});