angular.module("kinderGartenApp")
    .constant("progressListPageCount", 5)
    .controller("tableViewCtrl", function ($scope, progressListPageCount) {
        'use strict';
        var zoomClass = null

        $scope.isZoom = false
        $scope.pageSize = progressListPageCount

        $scope.tableViewclose = () => history.go(-1)
        $scope.setZoomClass = status => {
            status == true ? $scope.pageSize = 13 : $scope.pageSize = progressListPageCount;
            $scope.isZoom = status;
        };
    })
    .controller("homeworkDetailCtrl", function ($scope) {
        $scope.getStatus = status => {
            switch (status) {
                case -1:
                return '未提交';
                break;

                case 0:
                return '未批改';
                break;

                case 1:
                return '已批改';
                break;
            }
        }

        $scope.getIcons = status => {
            switch (status) {
                case -1:
                return '#icon-weitijiao1';
                break;

                case 0:
                return '#icon-weipigai';
                break;

                case 1:
                return '#icon-yipigai32';
                break;
            }
        }
    })
    .controller("createHomeworkListCtrl", function ($scope) {
        $scope.enterHoverCard = event => {
            $(event.target).addClass("_onHover").removeClass("_onLeave")
        }
        $scope.leaveHoverCard = event => {
            $(event.target).addClass("_onLeave").removeClass("_onHover")
        }
    })