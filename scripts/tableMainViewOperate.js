angular.module("kinderGartenApp")
    .controller('tableMainViewOperate', function ($scope, $ocLazyLoad, $rootScope) {

        setTableViewMainHeight = () =>{
            var heading = document.getElementById('tableHeading'),
                eleMain = document.getElementById('tableViewMain')

            heading !== null ? eleMain.style.height = 'calc(100% - 6vh - 1px)' : eleMain.style.height = '100%';
        }

        getActionCurrent = () => {
            var $location = location.href
            
            if ($location.indexOf('expectationHomework') != -1) {

                $scope.thisTitle = '待提交作业　EXPECTATION HOMEWORK'
                $scope.thisStatus = 'expectation'

            } else if ($location.indexOf('homeworkProgress') != -1) {

                $scope.thisTitle = '作业进度　WORK PROGRESS'
                $scope.thisStatus = 'progress'

            } else if ($location.indexOf('correctedHomework') != -1) {

                $scope.thisTitle = '已批改作业　CORRECTED HOMEWORK'
                $scope.thisStatus = 'corrected'

            } else if ($location.indexOf('unPublishHomework') != -1) {

                $scope.thisTitle = '未发布作业　UNPUBLISH HOMEWORK'
                $scope.thisStatus = 'unPublish'

            }
        }

        $scope.popLeftPanel = () => {
            var ele = document.getElementById('leftPanel'),
                start = 0;
                during = 18

            var _run = () => {
                ele.style.willChange = "transform"
                start++
                var move = Tween.Linear(start, 0, 8.5, during);
                ele.style.transform = "translateX(-" + move + "vw)"
                if (start <= during) requestAnimationFrame(_run);

                setTimeout(() => {
                    ele.style.willChange = "auto"
                }, 2000)
            };
            _run();
        }

        $scope.popRightPanel = () => {
            var ele = document.getElementById('rightPanel'),
                start = 0;
                during = 18

            var _run = () => {
                ele.style.willChange = "transform"
                start++
                var move = Tween.Linear(start, 0, 12.5, during);
                ele.style.transform = "translateX(" + move + "vw)"
                if (start <= during) requestAnimationFrame(_run);
            };
            _run();
        }

        $rootScope.$on("popLeftPanel", function () {
            $scope.popLeftPanel()
        })
        $rootScope.$on("popRightPanel", function () {
            $scope.popRightPanel()
        })

        setTableViewMainHeight()
        setTimeout(() => {
            getActionCurrent()
        }, 1)
})