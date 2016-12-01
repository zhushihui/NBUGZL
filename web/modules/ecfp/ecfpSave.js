define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./ecfpBS');

    var viewConfig = {
        //分配界面初始化
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
        popupDialogDanger : function(od) {
        	var p = {
        			title:'操作提示',
                    content:od+'比例只能小于等于1',
                    buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
        	return p;
        },
        //分配保存
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		//获取界面参数
        		var formData = $("#emapForm").emapForm("getValue");
        		if( formData.D1_1>1){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D1')
        			);
        		}else if(formData.D2_1>1){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D2')
        			);
        		}else if(formData.D3_1>1){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D3')	
        			);
        		}else if(formData.D4_1>1){
					 BH_UTILS.bhDialogDanger(
						this.popupDialogDanger('D4')
					 );
        		}else if(formData.D5_1>1){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D5')
        			);
        		}else if(formData.D6_1>1){
        			BH_UTILS.bhDialogDanger(
        				this.popupDialogDanger('D6')
        			);
        		}else{
//        			BH_UTILS.bhDialogSuccess({
//                        title:'操作提示',
//                        content:'是否进行二次分配',
//                        buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
                        	var otherData = JSON.parse($('#d_param').val());  
                			//计算D1-D6
                			formData.D1 = otherData.D1==null?0:otherData.D1*formData.D1_1;
                			formData.D2 = otherData.D2==null?0:otherData.D2*formData.D2_1;
                			formData.D3 = otherData.D3==null?0:otherData.D3*formData.D3_1;
                			formData.D4 = otherData.D4==null?0:otherData.D4*formData.D4_1;
                			formData.D5 = otherData.D5==null?0:otherData.D5*formData.D5_1;
                			formData.D6 = otherData.D6==null?0:otherData.D6*formData.D6_1;
                			//判断是否有教师
                			var firstData ={};
                			firstData['CWID'] = formData.CWID;
                			firstData['JG0101ID'] = formData.XM;
                			firstData['FATHERID'] = formData.TW_ID;
                			if(formData.D1_1 == 0){
                				firstData['D1'] = 0;
                			}
                			if(formData.D2_1 == 0){
                				firstData['D2'] = 0;
                			}
                			if(formData.D3_1 == 0){
                				firstData['D3'] = 0;
                			}
                			if(formData.D4_1 == 0){
                				firstData['D4'] = 0;
                			}
                			if(formData.D5_1 == 0){
                				firstData['D5'] = 0;
                			}
                			if(formData.D6_1 == 0){
                				firstData['D6'] = 0;
                			}
                			//判断父ID是否相同
                			var firstDataTwo ={'FATHERID':formData.TW_ID};
                			//新建教师工作量,注意JG0101ID为分配界面选择的教工ID对应字段XM
                			var secondData ={'YEAR':formData.YEAR,'TERM':formData.TERM,'JG0101ID':formData.XM,'CWID':formData.CWID,
                					'JX0404ID':formData.JX0404ID,'XSFLID':formData.XSFLID,'D1':formData.D1,'D2':formData.D2,'D3':formData.D3,
                					'D4':formData.D4,'D5':formData.D5,'D6':formData.D6,'FATHERID':formData.TW_ID};
                			//修改教师工作量,TW_ID从动作流的第二步判断父ID是否相同中获取TW_ID
                			var thirdData = {'D1':formData.D1,'D2':formData.D2,'D3':formData.D3,'D4':formData.D4,
                					'D5':formData.D5,'D6':formData.D6};
                			//修改旧教师工作量
                			var fourData = {'D1':formData.D1_1,'D2':formData.D2_1,'D3':formData.D3_1,'D4':formData.D4_1,
                					'D5':formData.D5_1,'D6':formData.D6_1,'TW_ID':formData.TW_ID};
                			//转换教师工作量
                			var fiveData = {'CWID':formData.CWID};
                			//更新教师D
                			var sixData = {'CWID':formData.CWID};
                			//修改已分配课程状态
                			var sevenData = {'CWID':formData.CWID};
                			//参数格式转换
                			var sendParam1 = JSON.stringify(firstData);
                			var sendParam1_1 = JSON.stringify(firstDataTwo);
                			var sendParam2 = JSON.stringify(secondData);
                			var sendParam3 = JSON.stringify(thirdData);
                			var sendParam4 = JSON.stringify(fourData);
                			var sendParam5 = JSON.stringify(fiveData);
                			var sendParam6 = JSON.stringify(sixData);
                			var sendParam7 = JSON.stringify(sevenData);
                			//参数存入参数组中
                			var param = {'pdsfyjs':sendParam1,'pdfidsfxt':sendParam1_1,'xjjsgzl':sendParam2,'xgjsgzl':sendParam3,
                					'xgjjsgzl':sendParam4,'zhjsgzl':sendParam5,'gxjsgzld':sendParam6,'xgyfpkczt':sendParam7};
                			//使用二次分配工作流
                			BH_UTILS.doAjax('../modules/ecfp/ecfpdzl.do', param).done(function(data){
                				if(data.code == "0"){
//                					BH_UTILS.bhDialogSuccess({
//                                        title:'操作提示',
//                                        content:'二次分配成功',
//                                        callback:function(){
//                                        }
//                                    });
                					$('#emapdatatable').emapdatatable('reload');
                					$.bhPaperPileDialog.hide();//关闭当前弹窗
                				}else{
                					BH_UTILS.bhDialogDanger({
                                        title:'操作提示',
                                        content:'拆分失败',
                                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                                    });
                				}
                			});
//                        }},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
//                        }}]
//                    });
        		}
        	}
        }
    };
    return viewConfig;
});
