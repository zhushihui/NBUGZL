﻿define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./jysjBS');
	var jysjSave = require('./jysjSave');
	var jysjView = require('./jysjView');

	var viewConfig = {
		initialize : function() {
			var view = utils.loadCompiledPage('jysj');
			this.$rootElement.html(view.render({}), true);
			this.pushSubView([ jysjSave ]);
			this.initView();

			this.eventMap = {
				"[data-action=add]" : this.actionAdd,
				"[data-action=edit]" : this.actionEdit,
				"[data-action=detail]" : this.actionDetail,
				// "[data-action=delete]": this.actionDelete,
				"[data-action=export]" : this.actionExport,
				"[data-action=import]" : this.actionImport,
				"[data-action=custom-column]" : this.actionCustomColumn,
				"[data-action=checkpass]" : this.actionCheckpass
			};
		},

		initView : function() {
			this._initAdvanceQuery();
			this._initTable();
		},

		actionCheckpass : function() {
			BH_UTILS.bhDialogSuccess({
				title : '操作提示',
				content : '是否通过审核',
				buttons : [ {
					text : '确认',
					className : 'bh-btn-success',
					callback : function() {
						bs.checkpass().done(function(data) {
						});

						BH_UTILS.bhDialogSuccess({
							title : '操作提示',
							content : '审核通过',
							callback : function() {
								$('#emapdatatable').emapdatatable('reload');
							}
						});
						
					}
				}, {
					text : '取消',
					className : 'bh-btn-warning',
					callback : function() {
					}
				} ]
			});
		},

		actionAdd : function() {
			var jysjNewTpl = utils.loadCompiledPage('jysjSave');
			$.bhPaperPileDialog.show({
				content : jysjNewTpl.render({}),
				title : "新建",
				ready : function($header, $body, $footer) {
					jysjSave.initialize();
				}
			});
		},

		actionEdit : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var jysjEditTpl = utils.loadCompiledPage('jysjSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'jysjdr', {
				CWID : id
			});

			$.bhPaperPileDialog.show({
				content : jysjEditTpl.render({}),
				title : "编辑",
				ready : function($header, $body, $footer) {
					jysjSave.initialize();

					$("#emapForm").emapForm("setValue", data.rows[0]);

				}
			});
		},

		actionDetail : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var jysjViewTpl = utils.loadCompiledPage('jysjSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'jysjdr', {
				WID : id
			});

			$.bhPaperPileDialog.show({
				content : jysjViewTpl.render({}),
				title : "查看",
				ready : function($header, $body, $footer) {
					jysjView.initialize(data.rows[0]);
				}
			});
		},

		actionDelete : function() {
			var row = $("#emapdatatable").emapdatatable("checkedRecords");
			if (row.length > 0) {
				var params = row.map(function(el) {
					// return {XSBH:el.XSBH, XXX:el.XXX}; //模型主键
				});
				bs.del(params).done(function(data) {
					alert("数据删除成功");
					$('#emapdatatable').emapdatatable('reload');
				});
			}
		},

		actionExport : function() {
			bs.exportData({}).done(function(data) {
			});
		},

		actionImport : function() {
			bs.importData().done(function(data) {
				var data1 = WIS_EMAP_SERV.getData(bs.api.pageModel, 'NBU_IMPORT_FLAG_QUERY');
				if(data1.rows[0].DRZT == 1){
					BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'禁止导入，请联系学校管理员。',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
					}else{
						var params = {
								"analyse" : "NBUGZL.src.com.wisedu.emap.nbugzl.service.TeacherImportAnalyse",
								"save" : "NBUGZL.src.com.wisedu.emap.nbugzl.service.ActionFlowImportSave"
						};
						$.emapImport({
							"contextPath" : contextPath,
							"app" : "nbugzl",
							"module" : "modules",
							"params" : params,
							"page" : "jysj",
							"action" : "jysjdrdzl",
							"tplUrl" : "modules/jysj/JY_DATA_IMPORT.xls",
							"preCallback" : function() {
							},
							"closeCallback" : function() {
								$('#emapdatatable').emapdatatable('reload');
							},
						});
					}
				});
		},

		actionCustomColumn : function() {
			$('#emapdatatable').emapdatatable('selectToShowColumns');
		},

		_initAdvanceQuery : function() {
			var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'jysjdr',
					"search");
			var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
				data : searchData,
				contextPath : contextPath,
				schema : true
			});
			$query.on('search', this._searchCallback);
		},

		_searchCallback : function(e, data, opts) {
			$('#emapdatatable').emapdatatable('reloadFirstPage', {
				querySetting : data
			});
		},

		_initTable : function() {
			var tableOptions = {
				pagePath : bs.api.pageModel,
				action : 'jysjdr',
				height : null,
				pageSize:50,
				customColumns : [
				// {
				// colIndex : '0',
				// type : 'checkbox'
				// },
				{
					colIndex : '0',
					type : 'tpl',
					column : {
						text : '操作',
						align : 'center',
						cellsAlign : 'center',
						cellsRenderer : function(row, column, value, rowData) {
							if(pageMeta.params.roleId=='20161020132326593'){
							return '<a href="javascript:void(0)" data-action="edit" data-x-wid='
									+ rowData.CWID + '>' + '编辑' + '</a>';
							}else{
								return '无';
							}
						}
					}
				} ]
			};
			$('#emapdatatable').emapdatatable(tableOptions);
		}
	};

	return viewConfig;
});
