angular.module("dataRequestFactory", [])
    .factory("dataRequestFactorySet", function ($http) {
    	  transformRequest = (obj) => {  
            var str = [];  
            for(var x in obj){  
                str.push(encodeURIComponent(x) + "=" + encodeURIComponent(obj[x]));  
            }  
            return str.join("&");  
        }

        var urlArrayList = {
            "workUrl": "/homeworkCenterController_2!findHomeworkByTime.do",  // 作业列表接口
				    "classUrl": "/scourselist!findHealerClassid.do",  // 班级列表接口
				    "studentUrl": "/homepage!classStudentList.do",  // 学生列表接口
				    "workStuStatus": "/homeworkCenterController!getHomeWorkStudent.do", // 作业学生信息接口
				    "workClassStatus": "/homeworkCenterController!getHomeWorkStudent.do", // 作业班级信息接口
				    "courseUrl": "/homeworkCenterController!selectHomeworkCourse.do", // 科目信息接口
				    "courseClassUrl": "/homeworkController_2!getTeachClass.do", // 科目班级信息接口
				    "workTypeUrl": "/homeworkCenterController!selecthomeworktype.do", // 作业类型接口
				    "createHomeworkUrl": "/homeworkCenterController!createHomework.do", // 创建作业接口 
				    "uploadUrl": "/upload!uploadInit.do", // 上传文件接口
				    "testPaperUrl": "/exampaper!selectpapers.do", // 试卷接口
				    "previewUrl": "/exampaper!previewPaper_map.do" // 试卷预览地址
        }
        return {
            getHomeworkList: () => { /* 作业列表获取 ********************************************/
                return  (
	                	$http({
	                		  url: urlArrayList.workUrl,
	                		  method: 'POST',
	                		  data: {
		                		  	iscomplete: -1,
						                fixNums : 200,
						                nowItems : 0,
						                condition: 'wsj',
						                createtime: ''
	                		  },
	                		  headers:{'Content-Type': 'application/x-www-form-urlencoded'},
						            transformRequest
						        })
						        .error(error => {
						            alert(error)
						        })
                )
            },
            getClassesList: () => { /* 班级列表获取 ********************************************/
                return (
                    $http({
						            url: urlArrayList.classUrl,
						            method: 'POST'
						        })
						        .error(error => {
						            alert(error)
						        })
                )
            },
            getStuList: classid => { /* 学生列表获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.studentUrl,
		                    method: 'POST',
		                    data: {
		                    	classid: classid
		                    },
		                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		                    transformRequest
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getHomeworkStatus: (homeworkid, gradeid, classid, correcting, iscomplete) => { /* 作业状态列表获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.workStuStatus,
		                    method: 'POST',
		                    data: {
		                    	homeworkid: homeworkid,
		                    	gradeid: gradeid,
		                    	classid: classid,
		                    	correcting: correcting,
		                    	iscomplete: iscomplete
		                    },
		                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		                    transformRequest
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getCourseList: () => { /* 科目信息获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.courseUrl,
		                    method: 'POST',
		                    data: ''
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getCourseClassList: courseId => { /* 科目班级信息获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.courseClassUrl,
		                    method: 'POST',
		                    data: {
		                    	course_id: courseId
		                    },
		                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		                    transformRequest
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getWorkType: () => { /* 作业类型获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.workTypeUrl,
		                    method: 'POST',
		                    data: ''
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getUploadResources: () => { /* 上传文件信息获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.uploadUrl,
		                    method: 'POST',
		                    data: {"fileGroupId":"attachment"},
		                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		                    transformRequest
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getTestPaper: () => { /* 作业类型获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.testPaperUrl,
		                    method: 'POST',
		                    data: ''
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getPreviewPaper: (examPaperId) => { /* 试卷题目获取 ********************************************/
		            return (
		                $http({
		                    url: urlArrayList.previewUrl,
		                    method: 'POST',
		                    data: {
		                    	examPaperId: examPaperId,
		                    	gradename: 123
		                    },
		                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		                    transformRequest
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            },
            getCreateHomework: (courseid, decs, info_decs, homeworktype, files, classid, gradeid, homeworkid) => { /* 创建作业获取 ********************************/
		            return (
		                $http({
		                    url: urlArrayList.createHomeworkUrl,
		                    method: 'POST',
		                    data: {
		                    	courseid:courseid,
													decs:decs,
													info_decs:info_decs,
													homeworktype:homeworktype,
													files:files,
													classid:classid,
													gradeid:gradeid,
													homeworkid:homeworkid
		                    },
		                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		                    transformRequest
		                })
		                .error(error => {
						            alert(error)
						        })
		            )
            }
        }
    })