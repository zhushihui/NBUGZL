define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./ecfpBS');

    var viewConfig = {
        //分配界面初始化
        initialize: function() {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'ecfptj', 'form');
            $("#emapForm").emapForm({
                data: mode,
                model: 'h',
                root:WIS_EMAP_SERV.getContextPath()
            });
            var modecopy = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'fpzmbjm', 'form');
            $("#copyForm").emapForm({
                data: modecopy,
                model: 'h',
                root:WIS_EMAP_SERV.getContextPath()
            });
            this.eventMap = {
                '[data-action=save]': this.save,
				"[data-action=manual]": this.actionManual,
				"[data-action=copy]": this.actionCopy
            };
        },
        actionManual :function() {
        	alert("manual");
        },
        actionCopy : function() {
        	alert("copy");
        }
        ,
        //分配保存
        save: function(){
        	//获取界面参数
        	var formData = $("#emapForm").emapForm("getValue");
        	var otherData = JSON.parse($('#d_param').val());  
        	//分配是手工输入还是导入分配模板
        	if($('#check_one').prop("checked")){//手工输入
        		if( $("#emapForm").emapValidate('validate') ){
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
//            		  BH_UTILS.bhDialogSuccess({
//                            title:'操作提示',
//                            content:'是否进行二次分配',
//                            buttons:[{text:'确认',className:'bh-btn-success',callback:function(){
            			
            			//计算D1-D6
//            			formData.D1 = otherData.D1==null?0:bs.popupGetScore(otherData.D1)*bs.popupGetScore(formData.D1_1);
//            			formData.D2 = otherData.D2==null?0:bs.popupGetScore(otherData.D2)*bs.popupGetScore(formData.D2_1);
//            			formData.D3 = otherData.D3==null?0:bs.popupGetScore(otherData.D3)*bs.popupGetScore(formData.D3_1);
//            			formData.D4 = otherData.D4==null?0:bs.popupGetScore(otherData.D4)*bs.popupGetScore(formData.D4_1);
//            			formData.D5 = otherData.D5==null?0:bs.popupGetScore(otherData.D5)*bs.popupGetScore(formData.D5_1);
//            			formData.D6 = otherData.D6==null?0:bs.popupGetScore(otherData.D6)*bs.popupGetScore(formData.D6_1);
            			//转换D1-D6的分数为小数
            			formData.D1 = bs.popupGetScore(formData.D1_1);
            			formData.D2 = bs.popupGetScore(formData.D2_1);
            			formData.D3 = bs.popupGetScore(formData.D3_1);
            			formData.D4 = bs.popupGetScore(formData.D4_1);
            			formData.D5 = bs.popupGetScore(formData.D5_1);
            			formData.D6 = bs.popupGetScore(formData.D6_1);
            			
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
            			//不修改了，tw_id设为空-----------------
            			var fourData = {'D1':formData.D1_1,'D2':formData.D2_1,'D3':formData.D3_1,'D4':formData.D4_1,
            					'D5':formData.D5_1,'D6':formData.D6_1,'TW_ID':''};
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
//                    					BH_UTILS.bhDialogSuccess({
//                                            title:'操作提示',
//                                            content:'二次分配成功',
//                                            callback:function(){
//                                            }
//                                        });
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
            			
//                            }},{text:'取消',className:'bh-btn-warning',callback:function(){                        	
//                            }}]
//                        });
            			
            		}
            	}
        	}else{//模板复制
        		if( $("#copyForm").emapValidate('validate') ){
        			var moderData = $("#copyForm").emapForm("getValue");
        			//获取模板比例之和
        			var firstData ={'KCID':moderData.KCID};
        			BH_UTILS.doAjax('../modules/ecfp/fpmbzpdblzh.do', firstData).done(function(data){
        				if(data.code == "0"){//模板比例之和对比
        					var sumData = data.datas.fpmbzpdblzh.rows[0];
        					//对比比例之和是否为1，用于判断
        					var resultData = bs.popupModelDialogDanger(sumData,otherData);
        					//部分删除旧教师信息
                			var oneData = {'CWID':formData.CWID,'TW_ID':formData.TW_ID};
                			//修改旧教师信息
                			var twoData = {'D1':resultData.D1,'D2':resultData.D2,'D3':resultData.D3,'D4':resultData.D4,
                					'D5':resultData.D5,'D6':resultData.D6,'TW_ID':formData.TW_ID};
                			//全删旧教师信息
                			var threeData = {'CWID':formData.CWID};
                			//创建新教师信息
                			var fourData = {'YEAR':formData.YEAR,'TERM':formData.TERM,'CWID':formData.CWID,
                					'JX0404ID':formData.JX0404ID,'XSFLID':formData.XSFLID,
                					'D1':otherData.D1,'D2':otherData.D2,'D3':otherData.D3,'D4':otherData.D4,
                					'D5':otherData.D5,'D6':otherData.D6,'KCID':moderData.KCID};
                			//更新教师工作量D
                			var fiveData = {'CWID':formData.CWID};
                			//修改已分配课程状态
                			var sixData = {'CWID':formData.CWID};
                			//参数格式转换
                			var sendParam1 = JSON.stringify(oneData);
                			var sendParam2 = JSON.stringify(twoData);
                			var sendParam3 = JSON.stringify(threeData);
                			var sendParam4 = JSON.stringify(fourData);
                			var sendParam5 = JSON.stringify(fiveData);
                			var sendParam6 = JSON.stringify(sixData);
                			//参数存入参数组中
                			var param1 = {'scjjsxx':sendParam1,'xgjjsxx':sendParam2,'cjxjsxx':sendParam4,'gxjsgzld':sendParam5,'xgyfpkczt':sendParam6};
                			var param2 = {'qsjjsxx':sendParam3,'cjxjsxx':sendParam4,'gxjsgzld':sendParam5,'xgyfpkczt':sendParam6};
        					if(resultData.isAll){//删除部分旧教师信息,调用二次分配模板动作流
        						BH_UTILS.doAjax('../modules/ecfp/ecfpmbdzl.do', param1).done(function(data){
                    				if(data.code == "0"){
                    					$('#emapdatatable').emapdatatable('reload');
                    					$.bhPaperPileDialog.hide();//关闭当前弹窗
                    				}else{
                    					BH_UTILS.bhDialogDanger({
                    						title:'操作提示',
                    						content:'二次分配模板修改动作失败',
                    						buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]
                    					});
                    				}
                    			});
        					}else{//删除全部旧教师信息,调用二次分配模板全删动作流
        						BH_UTILS.doAjax('../modules/ecfp/ecfpmbqsdzl.do', param2).done(function(data){
                    				if(data.code == "0"){
                    					$('#emapdatatable').emapdatatable('reload');
                    					$.bhPaperPileDialog.hide();//关闭当前弹窗
                    				}else{
                    					BH_UTILS.bhDialogDanger({
                    						title:'操作提示',
                    						content:'二次分配模板全删动作失败',
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
        	
        	
        }
    };
    return viewConfig;
});
