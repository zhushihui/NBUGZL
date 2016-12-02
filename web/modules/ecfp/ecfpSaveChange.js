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
                '[data-action=saveChange]': this.change
            };
        },
        //修改保存
        popupDialogDanger : function(od,nd) {
        	var p = {
        			title:'操作提示',
                    content:od+'比例不能大于' + nd,
                    buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
        	return p;
        },
        
        change: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		//获取界面参数
        		var formData = $("#emapForm").emapForm("getValue");
        		var otherData = JSON.parse($('#d_param').val()); 
        		if( formData.D1_1>otherData.D1){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D1',otherData.D1)
        			);
        		}else if(formData.D2_1>otherData.D2){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D2',otherData.D2)
        			);
        		}else if(formData.D3_1>otherData.D3){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D3',otherData.D3)
        			);
        		}else if(formData.D4_1>otherData.D4){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D4',otherData.D4)
        			);
        		}else if(formData.D5_1>otherData.D5){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D5',otherData.D5)
        			);
        		}else if(formData.D6_1>otherData.D6){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D6',otherData.D6)
        			);
        		}else{
        			BH_UTILS.bhDialogSuccess({
                        title:'操作提示',
                        content:'是否进行分配比例修改',
                        buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
                			//计算D1-D6
                			formData.D1 = otherData.D1-formData.D1_1;
                			formData.D2 = otherData.D2-formData.D2_1;
                			formData.D3 = otherData.D3-formData.D3_1;
                			formData.D4 = otherData.D4-formData.D4_1;
                			formData.D5 = otherData.D5-formData.D5_1;
                			formData.D6 = otherData.D6-formData.D6_1;
                			//修改父工作比例
                			var firstData ={'D1':formData.D1,'D2':formData.D2,'D3':formData.D3,'D4':formData.D4,
                					'D5':formData.D5,'D6':formData.D6,'TW_ID':formData.FATHERID};
                			//修改子工作比例
                			var secondData ={'D1':formData.D1_1,'D2':formData.D2_1,'D3':formData.D3_1,'D4':formData.D4_1,
                					'D5':formData.D5_1,'D6':formData.D6_1,'TW_ID':formData.TW_ID};
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
                    					BH_UTILS.bhDialogSuccess({
                                            title:'操作提示',
                                            content:'分配比例修改成功',
                                            callback:function(){
                                            }
                                        });
                    					$('#emapdatatable').emapdatatable('reload');
                    					$.bhPaperPileDialog.hide();//关闭当前弹窗
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
                    					BH_UTILS.bhDialogSuccess({
                                            title:'操作提示',
                                            content:'分配比例修改成功',
                                            callback:function(){
                                            }
                                        });
                    					$('#emapdatatable').emapdatatable('reload');
                    					$.bhPaperPileDialog.hide();//关闭当前弹窗
                    				}else{
                    					BH_UTILS.bhDialogDanger({
                                            title:'操作提示',
                                            content:'分配比例修改失败',
                                            buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                                        });
                    				}
                    			});
                			}
                        }},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
                        }}]
                    });
        		}
        	}
        }

    };
    return viewConfig;
});
