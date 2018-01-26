define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./ecfpBS');

    var viewConfig = {
        //修改界面初始化
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'ecfpxg', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h',
                root:WIS_EMAP_SERV.getContextPath()
            });
            
            this.eventMap = {
                '[data-action=saveEdit]': this.save
            };
        },
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		//获取界面参数
        		var formData = $("#emapForm").emapForm("getValue");
        		//判断参数是否合理
        		var result = false;
        		var result1 = bs.popupDialogDanger(formData.D1_1,'D1');
        		var result2 = bs.popupDialogDanger(formData.D2_1,'D2');
        		var result3 = bs.popupDialogDanger(formData.D3_1,'D3');
        		var result4 = bs.popupDialogDanger(formData.D4_1,'D4');
        		var result5 = bs.popupDialogDanger(formData.D5_1,'D5');
        		var result6 = bs.popupDialogDanger(formData.D6_1,'D6');
        		if(result1 && result2 && result3 && result4 && result5 && result6){
        			result = true;
        		}
        		if(result){//所有参数输入都合理
        			//转换D1-D6的比例
        			formData.D1_1 = bs.popupGetScore(formData.D1_1);
        			formData.D2_1 = bs.popupGetScore(formData.D2_1);
        			formData.D3_1 = bs.popupGetScore(formData.D3_1);
        			formData.D4_1 = bs.popupGetScore(formData.D4_1);
        			formData.D5_1 = bs.popupGetScore(formData.D5_1);
        			formData.D6_1 = bs.popupGetScore(formData.D6_1);
        			//修改旧教师信息
        			var oneData = {'D1':formData.D1_1,'D2':formData.D2_1,'D3':formData.D3_1,'D4':formData.D4_1,
        					'D5':formData.D5_1,'D6':formData.D6_1,'TW_ID':formData.TW_ID};
        			//更新教师工作总量D
        			var twoData = {'CWID':formData.CWID};
        			//修改已分配课程状态
        			var threeData = {'CWID':formData.CWID};
        			//参数格式转换
        			var sendParam1 = JSON.stringify(oneData);
        			var sendParam2 = JSON.stringify(twoData);
        			var sendParam3 = JSON.stringify(threeData);
        			//参数存入参数组中
        			var param = {'xgjsgzbl':sendParam1,'gxgzld':sendParam2,'xgyfpkczt':sendParam3};
        			//使用二次分配工作流
        			BH_UTILS.doAjax('../modules/ecfp/ecfpdtxgdzl.do', param).done(function(data){
        				if(data.code == "0"){
//                					BH_UTILS.bhDialogSuccess({
//                                        title:'操作提示',
//                                        content:'二次分配成功',
//                                        callback:function(){
//                                        }
//                                    });       					
        					$.bhPaperPileDialog.hide();//关闭当前弹窗
        					$('#emapdatatable').emapdatatable('reload');
        					//回退到有搜索数据的列表中
        					var search = $('#emapAdvancedQuery').emapAdvancedQuery('getValue');
        		            $('#emapdatatable').emapdatatable('reload', {
        		                querySetting: search
        		            });
        				}else{
        					BH_UTILS.bhDialogDanger({
        						title:'操作提示',
        						content:'修改失败',
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
