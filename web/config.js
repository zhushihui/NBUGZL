define(function(require, exports, module) {

	var config = { 

		/*
			业务线开发模式，转测时置false
		 */
		"DEBUG_MODE": true,

		/*
			资源服务器地址
		 */
		"RESOURCE_SERVER": "http://res.wisedu.com",

		/*
		 * 主题 blue purple
		 */
		"THEME": "purple",

		/*
			服务器端生成配置API(API_BASE_PATH目录下)
			@example "/config.do" ./mock/serverconfig.json
		 */
		"SERVER_CONFIG_API": "",

		/*
			APP默认路由
		 */
		'APP_ENTRY': "",

		/*
		 	APP标题
		 */
		"APP_TITLE": "宁波大学本科教学工作量计算管理平台",

		/*
			应用底部说明文本
		 */
		"FOOTER_TEXT": "",

		/*
			需要展示的模块
		 */
		"MODULES": [
		 {            title:"学院部门管理",            route:"xybmgl"         }         ,
         {            title:"教师管理",            route:"jsgl"         }         ,{            title:"参数设置",            route:"cssz"         }         ,{            title:"课程工作量",            route:"kcgzl"         }         ,{            title:"二次分配",            route:"ecfp"         }         ,{            title:"参数查询",            route:"cscx"         }         ,{            title:"教师个人工作量明细",            route:"jsgrgzlmx"         }         ,{            title:"教师个人工作量汇总",            route:"jsgrgzlhz"         }         ,{            title:"学院年度工作量汇总",            route:"xyndgzlhz"         }         ,{            title:"教研建设及学生指导数据",            route:"jysj"         }         ,{            title:"分配模板",            route:"fpmb"         }         //placeHolder_module
		],

		/*
			头部配置
		 */
		"HEADER": {
			"dropMenu": [{
				"text": "角色1",
				"active": true
			}],
			"logo": "./public/images/logo.png",
			"icons": ["icon-apps"],
			"userImage": "./public/images/user.png",
			"userInfo": {
				"image": "./public/images/user.png",
				"info": [
					"工号:" + pageMeta.params.userId,
					"姓名:" + pageMeta.params.userName,
					"角色:" + pageMeta.params.roleId
//					"学校 部门",
//					"邮箱",
//					"电话"
				],
				"logoutHref": "javascript:void(0);"
			}
		}
	};

	return config;

});