angular.module("kinderGartenApp")
    .constant("usernameActiveClass", "active")
    .controller("homeworkCtrl", function ($scope, $rootScope, $location, $filter, dataRequestFactorySet, usernameActiveClass) {
        'use strict';
        let selectedWorkName = null,
            selectedClassName = null,
            rangeArr = [],
            i = null,
            j = null

        $scope.ajax = {};
        $scope.selectedPage = 1
        $scope.classId = null
        $scope.gradeId = null
        $scope.totalStu = 0
        $scope.expectation = 0
        $scope.currentStu = 0
        
        /* 请求作业数据 *********************************************************************/
        dataRequestFactorySet.getHomeworkList().then(res => {
            $scope.ajax.homeworkInfo = res.data.lists
            console.log($scope.ajax.homeworkInfo)

            $scope.selectWorkName = (newName, index) => {
                $scope.workName = $scope.ajax.homeworkInfo[index].createtime
                selectedWorkName = newName
                $scope.selectedPage = 1
            }

            /* 请求班级数据 *********************************************************************/
            dataRequestFactorySet.getClassesList().then(res => {
                $scope.newHomeworkInfo = []
                $scope.ajax.classList = res.data.classId

                $scope.setClassId = (newClassName, newClassId, newGradeId) => {
                    $scope.className = newClassName
                    selectedClassName = newClassName
                    $scope.classId = newClassId
                    $scope.gradeId = newGradeId

                    for (i = 0; i < $scope.ajax.homeworkInfo.length; i += 1) {
                        rangeArr = $scope.ajax.homeworkInfo[i].homeworkRange.split('-')
                        for(j = 0; j < rangeArr.length; j += 1) {
                            if ($scope.className === rangeArr[j]) {
                                var x = $scope.ajax.homeworkInfo[i]
                            }
                        }
                        $scope.newHomeworkInfo[i] = x
                    }

                    /* 请求学生数据 *********************************************************************/
                    dataRequestFactorySet.getStuList(newClassId).then(res => {
                        $scope.totalStu = res.data.rows.length
                    })
                }
            })
            $scope.setHomeworkId = (newHomeworkId, newHomeworkRange, correct, submit) => {
                $scope.homeworkId = newHomeworkId

                if ($scope.gradeId === null && $scope.classId === null) {
                    $rootScope.$emit("popLeftPanel", {})
                } else {
                    $rootScope.$emit("popRightPanel", {})

                    /* 请求作业状态数据 *********************************************************************/
                    dataRequestFactorySet.getHomeworkStatus($scope.homeworkId, $scope.gradeId, $scope.classId, correct, submit).then(res => {
                        $scope.ajax.workStatusList = res.data.list
                        $scope.ajax.workStatusList ? $scope.currentStu = $scope.ajax.workStatusList.length : $scope.currentStu = 0
                        $scope.expectation = (1 - $scope.currentStu / $scope.totalStu) * 100
                        $scope.corrected = $scope.currentStu / $scope.totalStu * 100
                        $scope.expectationStyle = {
                            'transform': 'translateX(-' + ($scope.currentStu / $scope.totalStu * 100) + '%)' 
                        }
                        $scope.correctedStyle = {
                            'transform': 'translateX(-' + ((1 - $scope.currentStu / $scope.totalStu) * 100) + '%)' 
                        }
                    })
                }
            }
        })

        $scope.selectPage = newPage => $scope.selectedPage = newPage
        $scope.nameFilterFn = list => selectedWorkName == null || list.createtime == selectedWorkName
        $scope.getWorkNameClass = name => selectedWorkName == name ? usernameActiveClass : ""
        $scope.getClassNameClass = className => selectedClassName == className ? usernameActiveClass : ""
        $scope.getPageClass = page => $scope.selectedPage == page ? usernameActiveClass : ""
    })
    .controller("createHomeworkCtrl", function ($scope, $rootScope, dataRequestFactorySet, usernameActiveClass) {
        let i = null,
            k = 0,
            j = 0,
            courseId = null,
            gradeId = null,
            classId = null

        $scope.ajax = {};
        $scope.courseClassArray = null
        $scope.month = new Date().getMonth() + 1
        $scope.date = $scope.startDate = new Date().getDate()
        $scope.overDate = new Date().getDate() + 7
        $scope.selectedCourseName = null
        $scope.selectedCourseGrade = null
        $scope.selectedWorkType = null
        $scope.selectedWorkValue = null
        $scope.selectedMainTitle = null
        $scope.selectMainTitle = null
        $scope.viewMainTitle = null
        $scope.classArray = []
        $scope.classIdArray = []
        $scope.classIdStr = null
        $scope.mandateNum = 1
        $scope.isRelation = false
        $scope.selectedPage = 1
        $scope.pageSize = 7
        $scope.ajax.testPaper = []
        $scope.examPaperId = null
        $scope.homeworkid = ''
        $scope.workDetailArray = []

        /* 请求学科列表数据 *********************************************************************/
        dataRequestFactorySet.getCourseList().then(res => {
            $scope.ajax.course = res.data.list

            $scope.selectCourseName = (newCourse, newValue, newId) => {
                $scope.selectedCourseName = newCourse
                courseId = newValue

                /* 请求本学科班级数据 *********************************************************************/
                dataRequestFactorySet.getCourseClassList(newValue).then(res => {
                    $scope.ajax.courseGrade = res.data.data

                    $scope.selectCourseGrade = (newGrade, status, newId) => {

                        for (i = 0; i < $scope.ajax.courseGrade.length; i += 1) {
                            $scope.courseClassArray = $scope.ajax.courseGrade[i].classList
                        }

                        $scope.selectedCourseGrade = newGrade
                        $scope.classShow = status
                        gradeId = newId
                    }

                    $scope.isChecked = name => $scope.classArray.indexOf(name) >= 0
                    $scope.updateSelection = ($event, name, newId) => {
                        var checkbox = $event.target,
                            checked = checkbox.checked

                        if (checked) {
                            $scope.classArray.push(name)
                            $scope.classIdArray.push(newId)
                        } else {  
                            var idx = $scope.classArray.indexOf(name),
                                idx_2 = $scope.classIdArray.indexOf(newId)
                            $scope.classArray.splice(idx,1)
                            $scope.classIdArray.splice(idx_2,1)
                        }

                        $scope.classIdStr = $scope.classIdArray.join(',')
                    }
                })

                /* 请求试卷信息数据 *********************************************************************/
                dataRequestFactorySet.getTestPaper().then(res => {
                    for (i = 0; i < res.data.rows.length; i += 1) {
                        if ($scope.selectedCourseName === res.data.rows[i].coursename) {
                            $scope.ajax.testPaper[j] = res.data.rows[i]
                            j += 1
                        }
                    }

                    $scope.viewTestPaper = (newExamPaperId, status, newTitle) => {
                        dataRequestFactorySet.getPreviewPaper(newExamPaperId).then(res => {
                            $scope.ajax.questionList = res.data.Bank
                            console.log(typeof res.data.Bank[0].title)
                        })
                        $scope.viewMainTitle = newTitle
                        $scope.isPaperView = status
                    }

                    $scope.selectedPage = 1
                    $scope.setPaperName = (newTitle, newPaperId) => {
                        $scope.selectMainTitle = newTitle
                        $scope.isRelation = false
                        $scope.isPaperView = false
                        $scope.examPaperId = newPaperId
                    }
                })
            }
        })

        /* 请求作业类型数据 *********************************************************************/
        dataRequestFactorySet.getWorkType().then(res => {
            $scope.ajax.workType = res.data.list

            $scope.selectWorkType = (newType, newValue) => {
                $scope.selectedWorkType = newType
                $scope.selectedWorkValue = newValue
            }
        })

        $scope.addMandate = () => $scope.mandateNum >= 5 ? $scope.mandateNum += 0 : $scope.mandateNum += 1
        $scope.removeMandate = () => $scope.mandateNum > 1 ? $scope.mandateNum -= 1 : $scope.mandateNum -= 0;
        $scope.getCourseClass = courseName => $scope.selectedCourseName == courseName ? usernameActiveClass : ""
        $scope.getCourseGradeClass = courseGrade => $scope.selectedCourseGrade == courseGrade ? usernameActiveClass : ""
        $scope.getWorkTypeClass = workType => $scope.selectedWorkType == workType ? usernameActiveClass : ""
        $scope.openRelation = status => {
            $scope.isRelation = status
            $scope.isPaperView = false
        }
        $scope.nameFilterFn = list => $scope.selectedMainTitle == null || list.mainTitle == $scope.selectedMainTitle
        $scope.selectPage = newPage => $scope.selectedPage = newPage
        $scope.getPageClass = page => $scope.selectedPage == page ? usernameActiveClass : ""

        /* 创建作业数据 *********************************************************************/
        $scope.createHomework = (mandate, htmlcontent) => {
            if ($scope.homeworkid === '') {
                if (courseId != null && mandate != (null || '') && htmlcontent != (null || '') && $scope.selectedWorkValue != null && $scope.examPaperId != null && $scope.classIdStr != (null || '') && gradeId != null) {
                    swal({ 
                        title: "确认添加作业", 
                        text: "添加后科目、班级、要求将不能修改", 
                        type: "warning",
                        showCancelButton: true, 
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定添加！", 
                        closeOnConfirm: false
                    },
                    function(){
                        swal("添加成功!", "可以在右侧预览您已经创建的作业", "success");
                        var workDetail = {}

                        dataRequestFactorySet.getCreateHomework(courseId, mandate, htmlcontent, $scope.selectedWorkValue, $scope.examPaperId, $scope.classIdStr, gradeId, '').then(res => {
                            workDetail.workType = res.data.data[0].homeworktypename
                            workDetail.decs = res.data.data[0].decs
                            workDetail.oktypename = res.data.data[0].oktypename
                            $scope.homeworkid = res.data.data[0].homeworkid
                        })
                        $scope.workDetailArray.push(workDetail)
                    });
                } else {
                    swal("添加失败!", "尚有信息未填写完整", "error");
                }
            } else {
                if (htmlcontent != (null || '') && $scope.selectedWorkValue != null && $scope.examPaperId != null) {
                    swal("添加成功!", "可以在右侧预览您已经创建的作业", "success");
                    var workDetail = {}

                    dataRequestFactorySet.getCreateHomework(courseId, mandate, htmlcontent, $scope.selectedWorkValue, $scope.examPaperId, $scope.classIdStr, gradeId, $scope.homeworkid).then(res => {
                        workDetail.workType = res.data.data[0].homeworktypename
                        workDetail.decs = res.data.data[0].decs
                        workDetail.oktypename = res.data.data[0].oktypename
                    })
                    $scope.workDetailArray.push(workDetail)
                } else {
                    swal("添加失败!", "尚有信息未填写完整", "error");
                }
            }
        }

        $scope.getHoverCard = status => $scope.isHover = status
    })