define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./fpmbBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'fpmb', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h'
            });
            
            this.eventMap = {
                '[data-action=saveEdit]': this.save 
            };
        },
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		var formData = $("#emapForm").emapForm("getValue");
        		var otherData = JSON.parse($('#d_param').val());  
        		//修改界面时
        		if(otherData.JG0101ID == formData.JG0101ID){//旧教师与当前选择教师相同时，无需判断教师是否重复
        			var result = false;
        			var result1 = bs.popupDialogDanger(formData.D1,'D1');
        			var result2 = bs.popupDialogDanger(formData.D2,'D2');
        			var result3 = bs.popupDialogDanger(formData.D3,'D3');
        			var result4 = bs.popupDialogDanger(formData.D4,'D4');
        			var result5 = bs.popupDialogDanger(formData.D5,'D5');
        			var result6 = bs.popupDialogDanger(formData.D6,'D6');
        			if(result1 && result2 && result3 && result4 && result5 && result6){
        				result = true;
        			}
        			if(result){//所有参数输入都合理
        				//比例分数转换成小数
						formData.D1 = bs.popupGetScore(formData.D1);
						formData.D2 = bs.popupGetScore(formData.D2);
						formData.D3 = bs.popupGetScore(formData.D3);
						formData.D4 = bs.popupGetScore(formData.D4);
						formData.D5 = bs.popupGetScore(formData.D5);
						formData.D6 = bs.popupGetScore(formData.D6);
						//修改保存
						bs.edit(formData).done(function(data){
							$('#emapdatatable').emapdatatable('reload');
							$.bhPaperPileDialog.close();//关闭当前弹窗
						});
        				//修改界面获取比例之和
//        				var secondData ={'KCID':formData.KCID,'JG0101ID':otherData.JG0101ID};
//        				BH_UTILS.doAjax('../modules/fpmb/fpmbzxgpdblzh.do', secondData).done(function(data){
//        					if(data.code == "0"){//模板比例之和对比
//        						var sumData = data.datas.fpmbzxgpdblzh.rows[0];
//        						//根据模板比例之和判断输入比例是否超限制
//        						var sumResult = false;
//        						var sumResult1 = bs.popupSumDialogDanger(formData.D1,'D1',sumData.D1);
//        						var sumResult2 = bs.popupSumDialogDanger(formData.D2,'D2',sumData.D2);
//        						var sumResult3 = bs.popupSumDialogDanger(formData.D3,'D3',sumData.D3);
//        						var sumResult4 = bs.popupSumDialogDanger(formData.D4,'D4',sumData.D4);
//        						var sumResult5 = bs.popupSumDialogDanger(formData.D5,'D5',sumData.D5);
//        						var sumResult6 = bs.popupSumDialogDanger(formData.D6,'D6',sumData.D6);
//        						if(sumResult1 && sumResult2 && sumResult3 && sumResult4 && sumResult5 && sumResult6){
//        							sumResult = true;
//        						}
//        						if(sumResult){//创建模板比例与已有模板比例之和不大于1
//        							
//        						}
//        					}else{
//        						BH_UTILS.bhDialogDanger({
//        							title:'操作提示',
//        							content:'模板比例之和查询出错',
//        							buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
//        						});
//        					}
//        				});
        			}
        		}else{//旧教师与当前选择教师不同时，无需判断教师是否重复
        			//判断模板教师是否重复
        			var oneData ={'KCID':formData.KCID,'JG0101ID':formData.JG0101ID};
        			BH_UTILS.doAjax('../modules/fpmb/fpmbzsfyjs.do', oneData).done(function(data){
        				if(data.code == "0" && data.datas.fpmbzsfyjs.rows.length == "0"){
        					var result = false;
        					var result1 = bs.popupDialogDanger(formData.D1,'D1');
        					var result2 = bs.popupDialogDanger(formData.D2,'D2');
        					var result3 = bs.popupDialogDanger(formData.D3,'D3');
        					var result4 = bs.popupDialogDanger(formData.D4,'D4');
        					var result5 = bs.popupDialogDanger(formData.D5,'D5');
        					var result6 = bs.popupDialogDanger(formData.D6,'D6');
        					if(result1 && result2 && result3 && result4 && result5 && result6){
        						result = true;
        					}
        					if(result){//所有参数输入都合理
        						//比例分数转换成小数
								formData.D1 = bs.popupGetScore(formData.D1);
								formData.D2 = bs.popupGetScore(formData.D2);
								formData.D3 = bs.popupGetScore(formData.D3);
								formData.D4 = bs.popupGetScore(formData.D4);
								formData.D5 = bs.popupGetScore(formData.D5);
								formData.D6 = bs.popupGetScore(formData.D6);
								//修改保存
								bs.edit(formData).done(function(data){
									$('#emapdatatable').emapdatatable('reload');
									$.bhPaperPileDialog.close();//关闭当前弹窗
								});
        						//修改界面获取比例之和
//        						var secondData ={'KCID':formData.KCID,'JG0101ID':otherData.JG0101ID};
//        						BH_UTILS.doAjax('../modules/fpmb/fpmbzxgpdblzh.do', secondData).done(function(data){
//        							if(data.code == "0"){//模板比例之和对比
//        								var sumData = data.datas.fpmbzxgpdblzh.rows[0];
//        								//根据模板比例之和判断输入比例是否超限制
//        								var sumResult = false;
//        								var sumResult1 = bs.popupSumDialogDanger(formData.D1,'D1',sumData.D1);
//        								var sumResult2 = bs.popupSumDialogDanger(formData.D2,'D2',sumData.D2);
//        								var sumResult3 = bs.popupSumDialogDanger(formData.D3,'D3',sumData.D3);
//        								var sumResult4 = bs.popupSumDialogDanger(formData.D4,'D4',sumData.D4);
//        								var sumResult5 = bs.popupSumDialogDanger(formData.D5,'D5',sumData.D5);
//        								var sumResult6 = bs.popupSumDialogDanger(formData.D6,'D6',sumData.D6);
//        								if(sumResult1 && sumResult2 && sumResult3 && sumResult4 && sumResult5 && sumResult6){
//        									sumResult = true;
//        								}
//        								if(sumResult){//创建模板比例与已有模板比例之和不大于1
//        									
//        								}
//        							}else{
//        								BH_UTILS.bhDialogDanger({
//        									title:'操作提示',
//        									content:'模板比例之和查询出错',
//        									buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
//        								});
//        							}
//        						});
        					}
        				}else{
        					BH_UTILS.bhDialogDanger({
        						title:'操作提示',
        						content:'模板教师已存在，无法创建',
        						buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
        					});
        				}
        			});
        		}
        		
        	}
        }

    };
    return viewConfig;
});