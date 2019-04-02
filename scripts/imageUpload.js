angular.module("kinderGartenApp")
    .controller('imageUpload', function($scope, $http) {
        var $imageList = $('#imageList'),
            $fileList = $('#fileList')
        //初始化通知型上传资源的uploader
        function initTzUpload(){
            formData = {};//上传服务器上需要上传的参数
            formData.file_group_id = "attachment";
            formData.file_can_search =1;//0不被检索 1可被检索 
            formData.删除标识=0;
            formData.审核标识=0;
            formData.资源类型='教学课件/项目';
            formData.学科=$("#courseid").attr("relText");
            formData.资源检索类型=1;//老师
            formData.login_user_name = $("#userName").val();
            getuploaderHeader();
            if(uploader){
                $imageList.empty();
                uploader.reset();
            }

            //初始化Web Uploader
            uploader = WebUploader.create({
                swf : swf,  // swf文件路径
                server : server,  // 文件接收服务端。
                pick: {  // 选择文件的按钮。可选。内部根据当前运行是创建，可能是input元素，也可能是flash.
                    id: '#filePicker',
                    label: '<img src="/jsp/teacher/homework/version_2.0/img/photo_icon.png"/>'
                },
                accept:{
                    title: '允许上传的文件类型',
                    extensions: 'jpg,jpeg,png,gif,bmp,JPG,JPEG,PNG,GIF,BMP'
                },
                fileNumLimit : 3,  //文件上传限制
                chunked : true,  // 分片相关
                chunkSize:chunkSize,  // 失败后重试次数
                chunkRetry : 0,
                threads : 1,  // 多线程上传的线程数
                duplicate : true,
                prepareNextFile : true,
                auto : true,  // 自动上传
                resize : false,  // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                sendAsBinary : true,  // 使用二进制发送数据  这个不要修改
                paste: '#uploader',  // 指定监听paste事件的容器
                disableGlobalDnd: true,  // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                headers : headers,  // 使用head传递 重要的参数
                formData : formData   // 使用表单传递普通参数
            });

            //当有文件列队进来的时候
            uploader.on("fileQueued",function(file){
                var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                    '<span class="_close">x</span>' +
                    '</div>'
                ),
                $img = $li.find('img');
                $imageList.append( $li );
                // 创建缩略图
                // 如果为非图片文件，可以不用调用此方法。
                // thumbnailWidth x thumbnailHeight 为 100 x 100
                uploader.makeThumb( file, function( error, src ) {
                    if ( error ) {
                        $img.replaceWith('<span>不能预览</span>');
                        return;
                    }
                    $img.attr( 'src', src );
                }, 100, 100);
            });
            // 文件上传过程中创建进度条实时显示。
            uploader.on( 'uploadProgress', function( file, percentage ) {
                var $li = $( '#'+file.id ),
                $percent = $li.find('.progress .progress-bar');
                // 避免重复创建
                if ( !$percent.length ) {
                    $percent = $('<div class="progress progress-striped active">' +
                        '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                        '</div>' + '</div>').appendTo( $li ).find('.progress-bar');
                }
                $percent.css( 'width', percentage * 100 + '%' );
            });

            //上传成功
            uploader.on('uploadSuccess', function(file,response) {
                if(response.error_code==0){
                    var files = $("#TzFiles").val();
                    if(files.length==0){
                        $("#TzFiles").val(response.file_id);
                    }else{
                        $("#TzFiles").val(files+","+response.file_id);
                    }
                    $("#" + file.id + " ._close").bind("click", function () {
                      delHomeworkinfoResource('response.file_id', $(this).parent())
                    });
                }else{
                    var $li = $( '#'+file.id ),
                    $error = $li.find('div.error');
                    // 避免重复创建
                    if ( !$error.length ) {
                        $error = $('<div class="error_pic"></div>').appendTo( $li );
                    }
                    $error.text('上传失败');
                    console.log(response);
                }
            });
            //上传失败
            uploader.on('uploadError', function(file, reason) {
                var $li = $( '#'+file.id ),
                $error = $li.find('div.error');
                // 避免重复创建
                if ( !$error.length ) {
                    $error = $('<div class="error_pic"></div>').appendTo( $li );
                }
                $error.text('上传失败');
                console.log(reason);
            });
            //上传完成成
            uploader.on('uploadComplete', function(file) {
                $('#' + file.id).find('.progress').fadeOut();
                if($imageList.children().length==3){
                    $(".webuploader-container").hide()
                }
            });
        }

        function initCtUpload(){
            var formData={};
            formData.file_group_id = "attachment";
            formData.file_can_search =1;//0不被检索 1可被检索 
            formData.删除标识=0;
            formData.审核标识=0;
            formData.资源类型='教学课件/项目';
            formData.学科=$("#courseid").attr("relText");
            formData.资源检索类型=1;//老师
            formData.login_user_name = $("#userName").val();
            getuploaderHeader();
            if(uploader){
                $fileList.empty();
                $(".btns").show();
                uploader.reset();
            }

            //初始化Web Uploader
            uploader = WebUploader.create({
                swf : swf,
                server : server,
                pick: {
                    id: '#filePicker',
                    label: '选择文件'
                },
                accept:{
                    title: '允许上传的文件类型',
                    extensions: 'txt,doc,docx,ppt,TXT,DOC,DOCX,PPT'
                },
                fileNumLimit : 1,
                chunked : true,
                chunkSize:chunkSize,
                chunkRetry : 0,
                threads : 1,
                duplicate : true,
                prepareNextFile : true,
                auto : true,
                resize : false,
                sendAsBinary : true,
                paste: '#uploader_ct',
                disableGlobalDnd: true,
                headers : headers,
                formData : formData
            });
            //当有文件列队进来的时候
            uploader.on("fileQueued",function(file){
                var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<div class="info">' + file.name + '</div>' +
                    '</div>'
                );

                $fileList.empty().append( $li );
                $(".btns").hide();
            });
            // 文件上传过程中创建进度条实时显示。
            uploader.on( 'uploadProgress', function( file, percentage ) {
                var $li = $( '#'+file.id ),
                $percent = $li.find('.progress .progress-bar');
                // 避免重复创建
                if ( !$percent.length ) {
                    $percent = $('<div class="progress progress-striped active">' +
                        '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                        '</div>' +
                    '</div>').appendTo( $li ).find('.progress-bar');
                }
                $percent.css( 'width', percentage * 100 + '%' );
            });

            //上传成功
            uploader.on('uploadSuccess', function(file,response) {
                if(response.error_code==0){
                    Dialog.alert("上传成功",function(){
                        $("#CtFiles").val(response.file_id);
                        $("#"+file.id).find("div.info").attr("ondblclick","delHomeworkinfoResource(\'"+response.file_id+"\',this)");
                    });
                }
            });
            //上传失败
            uploader.on('uploadError', function(file, reason) {
                var $li = $( '#'+file.id );
                var $error = $li.find("div span")
                // 避免重复创建
                if ( !$error.length ) {
                    $('<span>上传失败,<a style="color:#db3f32;">点击重新上传</a></span>').appendTo( $li );
                }
                $("#"+file.id).find("div.info").attr("ondblclick","removeFile(this)");
                console.log(reason);
            });
            //上传完成成
            uploader.on('uploadComplete', function(file) {
                $('#' + file.id).find('.progress').fadeOut();
            });
        }

        //获得上传资源信息的头部信息
        function getuploaderHeader(){
            /**
             * 通过后台方法获取：swf文件路径，server文件接收服务端，chunkSize文件分片
             * headers {Object}可以扩展此对象来控制上传头部
             **/
            $.ajax({
                "url" : "/upload!uploadInit.do",
                "async" : false,
                "dataType" : "json",
                "type" : "post",
                "data":{"fileGroupId":"attachment"},
                "success" : function(result) {
                    swf = result.swf;
                    server = result.server;
                    chunkSize = result.chunkSize;
                    headers = result.headers;
                    formData.cid = result.loginId;
                }
            });
        }

        function previewHomeworkInfo(fileId,homeworktype) {
            if("0e7e71f6-3b37-4486-82b7-20df6280080a"==homeworktype){
                //通知
                var content = '<div style="font-size:16px;padding:10px 10px;">';
                if(fileId.indexOf(",")!=-1){
                    //多个资源
                    var fileIdArr = fileId.split(",");
                    for (var i = 0; i < fileIdArr.length; i++) {
                        content += '<img src="/file!showImg.do?fileId='+fileIdArr[i]+'" alt="图片" style="width:100%;margin-top:10px;"/>';
                    }
                }else{
                    content += '<img src="/file!showImg.do?fileId='+fileId+'" alt="图片" style="width:100%;margin-top:10px;"/>';
                }
                content +='</div>';
                layer.open({
                    type:1,
                    title:'图片大图',
                    area:['900px','600px'],
                    scrollbar: false,
                    shadeClose:true,
                    content: content
                });
            } else if ("909b0d1c-ce08-45a1-a2af-c554bb00a904"==homeworktype){
                //传统
                window.open("/jsp/teacher/homework/preview.jsp?fileId="+fileId,'_blank');
            } else if ("df645a77-6495-4e3b-9b9d-98171fc0f1a7"==homeworktype){
                //测试
                var mothords = '/exampaper!PreviewPaper.do?examPaperId='+fileId;
                window.open(mothords,'_blank');
            }
        }

        //删除上传的资源并且更新fileid
        function delHomeworkinfoResource(fileid, obj){
            var homeworktype=$("input:radio[name=homeworktype]").filter("[checked]").val();
            if("0e7e71f6-3b37-4486-82b7-20df6280080a"==homeworktype){
                //通知
                var res =  $("#TzFiles").val();
                if(res.indexOf(",")==-1){
                    //没有逗号，只有一个值
                    $("#TzFiles").val("");
                    $(obj).remove();
                }else{
                    var resArr = res.split(",");
                    //console.log(resArr.indexOf(fileid)+"--查询");
                    var index = resArr.indexOf(fileid);
                    resArr.splice(index,1);
                    $("#TzFiles").val(resArr.toString());
                    //console.log($("#TzFiles").val());
                    $(obj).remove();
                }
            }else if("909b0d1c-ce08-45a1-a2af-c554bb00a904"==homeworktype){
                var res =  $("#CtFiles").val();
                $("#CtFiles").val("");
                $(obj).remove();
            }else{
                var res =  $("#CsFiles").val();
                $("#CsFiles").val("");
                $(obj).remove();
            }
        }

        previewHomeworkInfo()
        initTzUpload()
        getuploaderHeader()
    });