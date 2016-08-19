define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./ecfpBS');

    var viewConfig = {
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'ecfp', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h',
                root:WIS_EMAP_SERV.getContextPath()
            });
            
            this.eventMap = {
                '[data-action=save]': this.save
            };
        },
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		var formData = $("#emapForm").emapForm("getValue");
        		if( formData.D1_1>1){
//        			alert("D1比例只能小于等于1");
        			BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'D1比例只能小于等于1',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
        		}else if(formData.D2_1>1){
        			BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'D2比例只能小于等于1',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
        		}else if(formData.D3_1>1){
        			BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'D3比例只能小于等于1',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
        		}else if(formData.D4_1>1){
        			BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'D4比例只能小于等于1',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
        		}else if(formData.D5_1>1){
        			BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'D5比例只能小于等于1',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
        		}else if(formData.D6_1>1){
        			BH_UTILS.bhDialogDanger({
                        title:'操作提示',
                        content:'D6比例只能小于等于1',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    });
        		}else{
        			BH_UTILS.bhDialogSuccess({
                        title:'操作提示',
                        content:'是否进行二次分配',
                        buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
                        	var otherData = JSON.parse($('#d_param').val());  
                			//计算D1-D6
                			formData.D1 = otherData.D1==null?0:otherData.D1*formData.D1_1;
                			formData.D2 = otherData.D2==null?0:otherData.D2*formData.D2_1;
                			formData.D3 = otherData.D3==null?0:otherData.D3*formData.D3_1;
                			formData.D4 = otherData.D4==null?0:otherData.D4*formData.D4_1;
                			formData.D5 = otherData.D5==null?0:otherData.D5*formData.D5_1;
                			formData.D6 = otherData.D6==null?0:otherData.D6*formData.D6_1;
                			//使用二次分配工作流
                			bs.save(formData).done(function(data){
                				if(data.code == "0"){
                					BH_UTILS.bhDialogSuccess({
                                        title:'操作提示',
                                        content:'二次分配成功',
                                        callback:function(){
                                        }
                                    });
                					$('#emapdatatable').emapdatatable('reload');
                					$.bhPaperPileDialog.hide();//关闭当前弹窗
                				}else{
                					BH_UTILS.bhDialogDanger({
                                        title:'操作提示',
                                        content:'二次分配失败',
                                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                                    });
                				}
                			});
                        }},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
                        }}]
                    });
        		}
        	}
        }

    };
    return viewConfig;
});