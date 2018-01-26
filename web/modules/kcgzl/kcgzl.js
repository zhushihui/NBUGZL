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
				"[data-action=export]": this.actionExport,
//				"[data-action=import]": this.actionImport,
				"[data-action=change]": this.actionChange,
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
      //单条课程工作量计算
        actionChange: function(e){
        	//获取关键ID
        	var cwid = $(e.target).attr("data-x-cwid");
        	var testData ={'CWID':cwid,pageNumber:1};
        	//单条数据是否二次分配
        	BH_UTILS.doAjax('../modules/kcgzl/dtzsfecfp.do', testData).done(function(data){
				if(data.code == "0"){//单条数据是否二次分配
					var countData = data.datas.dtzsfecfp.rows[0];
					if(countData != null && countData .ISFP == 0){//没有二次分配
						//更新课程D1D6
						var oneData ={'CWID':cwid};
						//更新课程D5
						var twoData ={'CWID':cwid};
						//更新课程D
						var threeData ={'CWID':cwid};
						//更新教师D1D6
						var fourData ={'CWID':cwid};
						//更新教师D
						var fiveData ={'CWID':cwid};
						//参数格式转换
						var sendParam1 = JSON.stringify(oneData);
						var sendParam2 = JSON.stringify(twoData);
						var sendParam3 = JSON.stringify(threeData);
						var sendParam4 = JSON.stringify(fourData);
						var sendParam5 = JSON.stringify(fiveData);
						//参数存入参数组中
						var param = {'dtgxkcd1d6':sendParam1,'dtgxkcd5':sendParam2,'dtgxkcd':sendParam3,'dtgxjsd1d6':sendParam4,'dtgxjsd':sendParam5};
						//调用工作量单条计算工作流
						BH_UTILS.doAjax('../modules/kcgzl/gzldtjsdzl.do', param).done(function(data){
							if(data.code == "0"){
								$.bhPaperPileDialog.hide();//关闭当前弹窗
								BH_UTILS.bhDialogSuccess({
									title:'操作提示',
									content:'单条数据工作量计算成功',
									callback:function(){
									}
								}); 
								//回退到有搜索数据的列表中
								var search = $('#emapAdvancedQuery').emapAdvancedQuery('getValue');
								$('#emapdatatable').emapdatatable('reload', {
									querySetting: search
								});
							}else{
								BH_UTILS.bhDialogDanger({
									title:'操作提示',
									content:'单条数据工作量计算失败',
									buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
								});
							}
						});
					}else{
						BH_UTILS.bhDialogDanger({
	                        title:'操作提示',
	                        content:'此单条数据已二次分配，无法计算工作量',
	                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
	                    });
					}
				}else{
					BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'单条数据是否二次分配查询出错',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
				}
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
        //课程工作量批量计算
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
            $('#emapdatatable').emapdatatable('reloadFirstPage', {
                querySetting: data
            });
        },

        _initTable: function() {
            var tableOptions = {
                pagePath: bs.api.pageModel,
                action: 'kcgzl',
                height:null,
                pageSize:50,
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
                        	//学院管理员或学校管理员才可以单条工作量计算
                        	/*if(pageMeta.params.roleId =='20161020132326593' || pageMeta.params.roleId =='20161020131636264' ){
                        		return '<a href="javascript:void(0)" data-action="change" data-x-cwid=' + rowData.CWID + '>' + '计算' + '</a>'; 
                        	}else{
                        		return '';
                        	}*/
                        	return '<a href="javascript:void(0)" data-action="change" data-x-cwid=' + rowData.CWID + '>' + '计算' + '</a>'; 
                        }
                    }
                }]
            };
            $('#emapdatatable').emapdatatable(tableOptions);
        }
	};

	return viewConfig;
});