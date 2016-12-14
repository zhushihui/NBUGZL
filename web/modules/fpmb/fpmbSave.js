define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./fpmbBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'fpmbdtxz', 'form');
            $("#emapForm").emapForm({
                data: mode, 
                model: 'h'
            });
            
            this.eventMap = {
                '[data-action=save]': this.save 
            };
        },
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		var formData = $("#emapForm").emapForm("getValue");
        		var jg0101List = formData.JG0101ID.split(',');
        		//新增界面时,判断模板教师是否重复
        		var jgSize = 0;
        		for(var i=0;i<jg0101List.length;i++){
        			var oneData ={'KCID':formData.KCID,'JG0101ID':jg0101List[i]};
        			BH_UTILS.doAjax('../modules/fpmb/fpmbzsfyjs.do', oneData).done(function(data){
        				if(data.code == "0" && data.datas.fpmbzsfyjs.rows.length == "0"){
        					jgSize++;
        					//所有老师都没有重复时，判断比例是否合理
        					if(jgSize == jg0101List.length){
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
        							//新增界面获取比例之和
        							var firstData ={'KCID':formData.KCID};
        							BH_UTILS.doAjax('../modules/fpmb/fpmbzpdblzh.do', firstData).done(function(data){
        								if(data.code == "0"){//模板比例之和对比
        									var sumData = data.datas.fpmbzpdblzh.rows[0];
        									//根据模板比例之和判断输入比例是否超限制,加入教师人数的参数
        									var sumResult = false;
        									var sumResult1 = bs.popupSaveDialogDanger(formData.D1,'D1',sumData.D1,jg0101List.length);
        									var sumResult2 = bs.popupSaveDialogDanger(formData.D2,'D2',sumData.D2,jg0101List.length);
        									var sumResult3 = bs.popupSaveDialogDanger(formData.D3,'D3',sumData.D3,jg0101List.length);
        									var sumResult4 = bs.popupSaveDialogDanger(formData.D4,'D4',sumData.D4,jg0101List.length);
        									var sumResult5 = bs.popupSaveDialogDanger(formData.D5,'D5',sumData.D5,jg0101List.length);
        									var sumResult6 = bs.popupSaveDialogDanger(formData.D6,'D6',sumData.D6,jg0101List.length);
        									if(sumResult1 && sumResult2 && sumResult3 && sumResult4 && sumResult5 && sumResult6){
        										sumResult = true;
        									}
        									if(sumResult){//创建模板比例与已有模板比例之和不大于1
        										//比例分数转换成小数
        										formData.D1 = bs.popupGetScore(formData.D1);
        										formData.D2 = bs.popupGetScore(formData.D2);
        										formData.D3 = bs.popupGetScore(formData.D3);
        										formData.D4 = bs.popupGetScore(formData.D4);
        										formData.D5 = bs.popupGetScore(formData.D5);
        										formData.D6 = bs.popupGetScore(formData.D6);
        										//多条数据格式整理
        										var resultData = new Array(); 
        										for(var j=0;j<jg0101List.length;j++){
        											var firstData ={'KCID':formData.KCID,'JG0101ID':jg0101List[j],'D1':formData.D1,'D2':formData.D2
        													,'D3':formData.D3,'D4':formData.D4,'D5':formData.D5,'D6':formData.D6};
        											resultData[j] = firstData;
        										}
        										//参数格式转换
        				            			var resultParam = JSON.stringify(resultData); 
        				            			//参数存入参数组中
        				            			var param = {'modelList':resultParam};
        										//使用多条数据新增动作流
        										BH_UTILS.doAjax('../modules/fpmb/fpmbxjdzl.do', param).done(function(data){
        				            				if(data.code == "0"){
//        				                    					BH_UTILS.bhDialogSuccess({
//        				                                            title:'操作提示',
//        				                                            content:'二次分配成功',
//        				                                            callback:function(){
//        				                                            }
//        				                                        });
        				            					$('#emapdatatable').emapdatatable('reload');
        				            					$.bhPaperPileDialog.hide();//关闭当前弹窗
        				            				}else{
        				            					BH_UTILS.bhDialogDanger({
        				            						title:'操作提示',
        				            						content:'分配模板新增失败',
        				            						buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
        				            					});
        				            				}
        				            			});
        									}
        								}else{
        									BH_UTILS.bhDialogDanger({
        										title:'操作提示',
        										content:'模板比例之和查询出错',
        										buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
        									});
        								}
        							});
        						}
        					}
        				}else{ 
        					BH_UTILS.bhDialogDanger({
        						title:'操作提示',
        						content:'模板中已存在选择的老师'+data.datas.fpmbzsfyjs.rows[0].JG0101ID_DISPLAY+'，无法创建',
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