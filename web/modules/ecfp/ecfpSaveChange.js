define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./ecfpBS');

    var viewConfig = {
        //回退界面初始化
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'ecfpxg', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h',
                root:WIS_EMAP_SERV.getContextPath()
            });
            
            this.eventMap = {
                '[data-action=saveChange]': this.change
            };
        },
        change: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		//获取界面参数
        		var formData = $("#emapForm").emapForm("getValue");
        		var otherData = JSON.parse($('#d_param').val()); 
        		//判断参数是否合理
        		var result = false;
        		var result1 = bs.popupEditDialogDanger(formData.D1_1,'D1',otherData.D1);
        		var result2 = bs.popupEditDialogDanger(formData.D2_1,'D2',otherData.D2);
        		var result3 = bs.popupEditDialogDanger(formData.D3_1,'D3',otherData.D3);
        		var result4 = bs.popupEditDialogDanger(formData.D4_1,'D4',otherData.D4);
        		var result5 = bs.popupEditDialogDanger(formData.D5_1,'D5',otherData.D5);
        		var result6 = bs.popupEditDialogDanger(formData.D6_1,'D6',otherData.D6);
        		if(result1 && result2 && result3 && result4 && result5 && result6){
        			result = true;
        		}
        		if(result){//所有参数输入都合理
//        			BH_UTILS.bhDialogSuccess({
//        				title:'操作提示',
//        				content:'是否进行分配比例修改',
//        				buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
        					//计算D1-D6
        					formData.D1 = bs.popupGetScore(otherData.D1)-bs.popupGetScore(formData.D1_1);
        					formData.D2 = bs.popupGetScore(otherData.D2)-bs.popupGetScore(formData.D2_1);
        					formData.D3 = bs.popupGetScore(otherData.D3)-bs.popupGetScore(formData.D3_1);
        					formData.D4 = bs.popupGetScore(otherData.D4)-bs.popupGetScore(formData.D4_1);
        					formData.D5 = bs.popupGetScore(otherData.D5)-bs.popupGetScore(formData.D5_1);
        					formData.D6 = bs.popupGetScore(otherData.D6)-bs.popupGetScore(formData.D6_1);
        					//修改父工作比例
        					var firstData ={'D1':formData.D1,'D2':formData.D2,'D3':formData.D3,'D4':formData.D4,
        							'D5':formData.D5,'D6':formData.D6,'TW_ID':formData.FATHERID};
        					//修改子工作比例
        					var secondData ={'D1':bs.popupGetScore(formData.D1_1),'D2':bs.popupGetScore(formData.D2_1),'D3':bs.popupGetScore(formData.D3_1),
        							'D4':bs.popupGetScore(formData.D4_1),'D5':bs.popupGetScore(formData.D5_1),'D6':bs.popupGetScore(formData.D6_1),'TW_ID':formData.TW_ID};
        					//删除子工作比例
        					var thirdData = {'TW_ID':formData.TW_ID};
        					//更新教师工作量D
        					var fourData = {'CWID':formData.CWID};
        					//转换教师工作比例
        					var fiveData = {'CWID':formData.CWID};
        					//参数格式转换
        					var sendParam1 = JSON.stringify(firstData);
        					var sendParam2 = JSON.stringify(secondData);
        					var sendParam3 = JSON.stringify(thirdData);
        					var sendParam4 = JSON.stringify(fourData);
        					var sendParam5 = JSON.stringify(fiveData);
        					//参数存入参数组中
        					//二次分配修改删除工作流的参数组
        					var param = {'xgfgzbl':sendParam1,'sczgzbl':sendParam3,'zhjsgzbl':sendParam5,'gxgzld':sendParam4};
        					//二次分配修改工作流的参数组
        					var param2 = {'xgfgzbl':sendParam1,'xgzgzbl':sendParam2,'zhjsgzbl':sendParam5,'gxgzld':sendParam4};
        					//判断是否所有比例都为0
        					if(formData.D1_1 == 0 && formData.D2_1 == 0 && formData.D3_1 == 0 && formData.D4_1 == 0 && formData.D5_1 == 0 && formData.D6_1 == 0){
        						//使用二次分配修改删除工作流
        						BH_UTILS.doAjax('../modules/ecfp/ecfpxgscdzl.do', param).done(function(data){
        							if(data.code == "0"){
//        								BH_UTILS.bhDialogSuccess({
//        									title:'操作提示',
//        									content:'分配比例修改成功',
//        									callback:function(){
//        									}
//        								});
        								$.bhPaperPileDialog.hide();//关闭当前弹窗
        								$('#emapdatatable').emapdatatable('reload');
        							}else{
        								BH_UTILS.bhDialogDanger({
        									title:'操作提示',
        									content:'分配比例修改失败',
        									buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
        								});
        							}
        						});
        					}else{
        						//使用二次分配修改工作流
        						BH_UTILS.doAjax('../modules/ecfp/ecfpxgdzl.do', param2).done(function(data){
        							if(data.code == "0"){
//        								BH_UTILS.bhDialogSuccess({
//        									title:'操作提示',
//        									content:'分配比例修改成功',
//        									callback:function(){
//        									}
//        								});
        								$.bhPaperPileDialog.hide();//关闭当前弹窗
        								$('#emapdatatable').emapdatatable('reload');
        							}else{
        								BH_UTILS.bhDialogDanger({
        									title:'操作提示',
        									content:'分配比例修改失败',
        									buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
        								});
        							}
        						});
        					}
//        				}},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
//        				}}]
//        			});
        		}
        	}
        }

    };
    return viewConfig;
});