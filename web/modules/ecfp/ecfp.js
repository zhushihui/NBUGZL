define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./ecfpBS');
	var ecfpSave = require('./ecfpSave');
	var ecfpChange = require('./ecfpSaveChange');
	var ecfpEdit = require('./ecfpEdit');//js界面创建
	var ecfpView = require('./ecfpView');
	var ecfpJc = require('./ecfpJc');

	var viewConfig = {
		initialize: function() {
			var view = utils.loadCompiledPage('ecfp');
            this.$rootElement.html(view.render({}), true);
            this.pushSubView([ecfpSave,ecfpChange,ecfpEdit]);//js界面添加
            this.pushSubView([ecfpJc]);
            this.initView();

			this.eventMap = {
//				"[data-action=add]": this.actionAdd,
				"[data-action=allot]": this.actionAllot,
				"[data-action=change]": this.actionChange,
//				"[data-action=detail]": this.actionDetail,
				"[data-action=edit]": this.actionEdit,
				"[data-action=delete]": this.actionDelete,
				"[data-action=export]": this.actionExport,
//				"[data-action=import]": this.actionImport,
				"[data-action=custom-column]": this.actionCustomColumn,
				"[data-action=getType]": this.getType,
//				"[data-action=copy]": this.actionCopy
				"[data-action=jc]" : this.actionJc
				
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
        
        actionJc:function() {
         	var ecfpJcTpl = utils.loadCompiledPage('ecfpJc');
             	$.bhPaperPileDialog.show({
             		content: ecfpJcTpl.render({}),
//             		title: "检查",
             		ready: function($header, $body, $footer){
             			ecfpJc.initialize();    		          			
                 	}
                 });
        },
        
        getType :function() {
        	alert("manual");
        },
//        actionCopy : function() {
//        	alert("copy");
//        }
//        ,
        //打开分配添加界面
        actionAllot: function(e){
        	var twid = $(e.target).attr("data-x-wid");
        	var ecfpEditTpl = utils.loadCompiledPage('ecfpSave');
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'ecfptj', {TW_ID:twid});
        	//数据整理
        	dataTwo = {YEAR:data.rows[0].YEAR,TERM:data.rows[0].TERM,JG0101ID:data.rows[0].JG0101ID,
        			CWID:data.rows[0].CWID,JX0404ID:data.rows[0].JX0404ID,XSFLID:data.rows[0].XSFLID,
        			TW_ID:data.rows[0].TW_ID,D1_1:data.rows[0].D1_1,D2_1:data.rows[0].D2_1,D3_1:data.rows[0].D3_1,
        			D4_1:data.rows[0].D4_1,D5_1:data.rows[0].D5_1,D6_1:data.rows[0].D6_1,FATHERID:data.rows[0].FATHERID};
        	dataThree ={D1:data.rows[0].D1_1,D2:data.rows[0].D2_1,D3:data.rows[0].D3_1,D4:data.rows[0].D4_1,D5:data.rows[0].D5_1,D6:data.rows[0].D6_1};
        	$.bhPaperPileDialog.show({
        		content: ecfpEditTpl.render({}),
        		title: "添加分配教师",
        		ready: function($header, $body, $footer){
        			ecfpSave.initialize();	
        			$("#emapForm").emapForm("setValue", dataTwo);
        			//主列表教师的工作量比例
        			$("#d_param").val(JSON.stringify(dataThree));
        			//设置工作量比例是否可修改
//        			if(dataThree.D1 == "0"){
//        				$('input[name="D1_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D2 == "0"){
//        				$('input[name="D2_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D3 == "0"){
//        				$('input[name="D3_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D4 == "0"){
//        				$('input[name="D4_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D5 == "0"){
//        				$('input[name="D5_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D6 == "0"){
//        				$('input[name="D6_1"]').attr("disabled","true"); 
//        			}
            	}
            });
        },
        //打开回退界面
        actionChange: function(e){
        	var twid = $(e.target).attr("data-x-wid");
        	var ecfpChangeTpl = utils.loadCompiledPage('ecfpSaveChange');//html界面创建
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'ecfpxg', {TW_ID:twid});
        	//数据整理 
        	dataTwo = {YEAR:data.rows[0].YEAR,TERM:data.rows[0].TERM,JG0101ID:data.rows[0].JG0101ID,
        			CWID:data.rows[0].CWID,JX0404ID:data.rows[0].JX0404ID,XSFLID:data.rows[0].XSFLID, 
        			TW_ID:data.rows[0].TW_ID,D1_1:data.rows[0].D1_1,D2_1:data.rows[0].D2_1,D3_1:data.rows[0].D3_1,
        			D4_1:data.rows[0].D4_1,D5_1:data.rows[0].D5_1,D6_1:data.rows[0].D6_1,FATHERID:data.rows[0].FATHERID};
        	dataThree ={D1:data.rows[0].D1_1,D2:data.rows[0].D2_1,D3:data.rows[0].D3_1,D4:data.rows[0].D4_1,D5:data.rows[0].D5_1,D6:data.rows[0].D6_1};
        	$.bhPaperPileDialog.show({
        		content: ecfpChangeTpl.render({}),
        		title: "回退教师比例",
        		ready: function($header, $body, $footer){
        			ecfpChange.initialize();	//js界面初始化方法
        			$("#emapForm").emapForm("setValue", dataTwo);
        			//主列表教师的工作量比例
        			$("#d_param").val(JSON.stringify(dataThree));
        			//设置工作量比例是否可修改
//        			if(dataThree.D1 == "0"){
//        				$('input[name="D1_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D2 == "0"){
//        				$('input[name="D2_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D3 == "0"){
//        				$('input[name="D3_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D4 == "0"){
//        				$('input[name="D4_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D5 == "0"){
//        				$('input[name="D5_1"]').attr("disabled","true"); 
//        			}
//        			if(dataThree.D6 == "0"){
//        				$('input[name="D6_1"]').attr("disabled","true"); 
//        			}
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
        //修改界面
        actionEdit: function(e){
        	var twid = $(e.target).attr("data-x-wid");
        	var ecfpEditTpl = utils.loadCompiledPage('ecfpEdit');//html界面创建
        	var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'ecfpxg', {TW_ID:twid});
        	//数据整理
        	dataTwo = {YEAR:data.rows[0].YEAR,TERM:data.rows[0].TERM,JG0101ID:data.rows[0].JG0101ID,
        			CWID:data.rows[0].CWID,JX0404ID:data.rows[0].JX0404ID,XSFLID:data.rows[0].XSFLID,
        			TW_ID:data.rows[0].TW_ID,D1_1:data.rows[0].D1_1,D2_1:data.rows[0].D2_1,D3_1:data.rows[0].D3_1,
        			D4_1:data.rows[0].D4_1,D5_1:data.rows[0].D5_1,D6_1:data.rows[0].D6_1,FATHERID:data.rows[0].FATHERID};
        	$.bhPaperPileDialog.show({
        		content: ecfpEditTpl.render({}),
        		title: "修改教师比例",
        		ready: function($header, $body, $footer){
        			ecfpEdit.initialize();	//js界面初始化方法
        			$("#emapForm").emapForm("setValue", dataTwo);
        			
            	}
            });
        },
        //删除功能
        actionDelete: function(e){
        	var twid = $(e.target).attr("data-x-wid");
        	var cwid = $(e.target).attr("data-x-cwid");
        	var xsflid = $(e.target).attr("data-x-xsflid");
        	var oneData ={'CWID':cwid,'XSFLID':xsflid};
        	var twoData ={'FATHERID':twid};
        	BH_UTILS.doAjax('../modules/ecfp/fpsczsfkcwysj.do', oneData).done(function(data){
				if(data.code == "0"){//是否课程唯一数据
					var countData = data.datas.fpsczsfkcwysj.rows[0];
					if(countData.YEAR >1){
						//是否为父数据
						BH_UTILS.doAjax('../modules/ecfp/fpsczsffsj.do', twoData).done(function(data){
							if(data.code == "0"){//是否为父数据
								var countData = data.datas.fpsczsffsj.rows[0];
								if(countData.YEAR == 0){//不为父数据
									//删除动作
									var params = {TW_ID:twid};	//删除主键
						        	bs.del(params).done(function(data){
//						        		alert("数据删除成功");
						        		$('#emapdatatable').emapdatatable('reload');
						        	});
								}else{
									BH_UTILS.bhDialogDanger({
				                        title:'操作提示',
				                        content:'此数据已分配子数据，无法删除',
				                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
				                    });
								}
							}else{
								BH_UTILS.bhDialogDanger({
			                        title:'操作提示',
			                        content:'是否为父数据查询出错',
			                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
			                    });
							}
						});
					}else{
						BH_UTILS.bhDialogDanger({
	                        title:'操作提示',
	                        content:'此为当前课程唯一数据，无法删除',
	                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
	                    });
					}
				}else{
					BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'是否课程唯一数据查询出错',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
				}
			});
        },
//        
        actionExport: function(){
        	bs.exportData({}).done(function(data){
        	});
        },
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
            $('#emapdatatable').emapdatatable('reloadFirstPage', {
                querySetting: data
            });
        },

        _initTable: function() {
            var tableOptions = {
                pagePath: bs.api.pageModel,
                action: 'ecfp',
                height: null,
                pageSize:50,
//                autoRowHeight: true,
//                altRows: true,
//                columnsResize: true,
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
                        width: '120',
                        cellsAlign: 'center',
                        cellsRenderer: function(row, column, value, rowData) {
                        	if(rowData.FATHERID !=null){
//                        		return '<a href="javascript:void(0)" data-action="change"  data-x-wid=' + rowData.TW_ID  +'>' + '回退' + '</a>';
                        		return '<a href="javascript:void(0)" data-action="edit"  data-x-wid=' + rowData.TW_ID  +'>' + '修改' + '</a>' +
                        		' | <a href="javascript:void(0)" data-action="delete"  data-x-wid="' + rowData.TW_ID  +'" data-x-cwid="' + rowData.CWID  +'" data-x-xsflid=' + rowData.XSFLID  +'>' + '删除' + '</a>' ;
                        	}else{
                        		return '<a href="javascript:void(0)" data-action="allot"  data-x-wid=' + rowData.TW_ID  +'>' + '添加' + '</a>' +
                        		' | <a href="javascript:void(0)" data-action="edit"  data-x-wid=' + rowData.TW_ID  +'>' + '修改' + '</a>' +
                        		' | <a href="javascript:void(0)" data-action="delete"  data-x-wid="' + rowData.TW_ID  +'" data-x-cwid="' + rowData.CWID  +'" data-x-xsflid=' + rowData.XSFLID +'>' + '删除' + '</a>' ;
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
