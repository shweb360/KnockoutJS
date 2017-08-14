/**
* 模块名：共通脚本
* 程序名: 通用方法common.js
**/

var com = {};
com.vm = {};
$(':input').keydown(function (e) {
    if (e.keyCode == 32) {
        return false;
    }
});
com.validatorForm = function (tab) {
    $("#" + tab + " .valid_message").each(function (index, domEle) {
        $(domEle).remove();
    });
    var isPass = true;
    var jdom;
    $("#" + tab + " :input").each(function(index, domEle) {
        var must = $(domEle).attr("must");
        if (must) {
            if (!domEle.value && domEle.value.replace(/\s+/g, "") == "") {
                isPass = false;
                com.showValidMessage(domEle);
  
            }
        }
        var maxLength = $(domEle).attr("maxlength");
        if (maxLength) {
            if (maxLength < domEle.value.length) {
                isPass = false;
                com.showValidMessage(domEle);
            }
        }
        var minlength=$(domEle).attr("minlength");
        if (minlength) {
            if (minlength > domEle.value.length) {
                isPass = false;
                com.showValidMessage(domEle);
            }
        }
        if ($(domEle).attr("ismobile")) {
            if (domEle.value && (!/(^1[3|5|8][0-9]{9}$)/.test(domEle.value))) {
                isPass = false;
                com.showValidMessage(domEle);
            }
        }
        if ($(domEle).attr("isemail")) {
            if (domEle.value && (!/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(domEle.value))) {
                isPass = false;
                com.showValidMessage(domEle);
            }
        }
        if ($(domEle).attr("equalto")) {
            if (domEle.value != $("#" + $(domEle).attr("equalto")).val()) {
                isPass = false;
                com.showValidMessage(domEle);
            }
        }
    });
    $("#" + tab + " textarea").each(function(index, domEle) {
        if ($(domEle).attr("must") == "true") {
            if (domEle.value == "") {
                isPass = false;
                com.showValidMessage(domEle);             
            }
        }
        var maxLength = $(domEle).attr("length");
        if (maxLength) {
            if (maxLength < domEle.value.length) {
                isPass = false;
                com.showValidMessage(domEle);
            }

        }
    });
    $("#" + tab + " select").each(function (index, domEle) {
        if ($(domEle).attr("must") == "true") {
            if (domEle.selectedIndex == 0) {
                isPass = false;
                com.showValidMessage(domEle);

            }
        }
        
    });
    return isPass;

}
com.openwin = function (url) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "camnpr");
    document.body.appendChild(a);
    a.click();
}
com.showValidMessage = function (obj,mess) {
    var jdom = $(obj);
    var validMsg;
    var validBox = jdom.parent().find(".valid_message");
    if (mess) {
        validMsg = mess;
    } else {
        validMsg = jdom.attr("data-error");
    }
    if (validBox[0]) {
        validBox.text(validMsg);
    } else {
        jdom.parent().append("<div class='valid_message'>" + validMsg + "<div>");
        jdom.addClass("error");
    }
}
com.addValidtofrom=function(tab){
    $("#" + tab + " :input").each(function (index, domEle) {
        if (domEle.type == "text" || domEle.type == "password" || domEle.type == "file" || domEle.type == "select") {
            $(domEle).on({
                focus: function (event) {
                    $(this).parent().find('.valid_message').remove();
                    $(this).removeClass("error");
                },
                blur: function (event) {

                },
                change: function (event) {
                    $(this).parent().find('.valid_message').remove();
                    $(this).removeClass("error");
                }
            });
        }       
    });
    $("#" + tab + " textarea").each(function (index, domEle) {
        $(domEle).on({
            focus: function (event) {
                $(this).parent().find('.valid_message').remove();
                $(this).removeClass("error");
            },
            blur: function (event) {

            },
            change: function (event) {
                $(this).parent().find('.valid_message').remove();
                $(this).removeClass("error");
            }
        });
    });
    $("#" + tab + " select").each(function (index, domEle) {
        $(domEle).on({
            focus: function (event) {
                $(this).parent().find('.valid_message').remove();
                $(this).removeClass("error");
            },
            blur: function (event) {

            },
            change: function (event) {
                $(this).parent().find('.valid_message').remove();
                $(this).removeClass("error");
            }
        });
    });
}
com.ClearTableElements = function (tab) {
    $("#" + tab + " .valid_message").each(function (index, domEle) {
        $(domEle).remove();
    });
    var textInput = document.getElementById(tab).getElementsByTagName('input');

    for (var i = 0; i < textInput.length; i++) {
        var obj = textInput[i];
        if (obj.type == 'text' || obj.type == 'hidden' || obj.type == 'password') {
            obj.value = "";
        }

    }
    var textarea = document.getElementById(tab).getElementsByTagName('textarea');
    //alert(textarea.length);
    for (var i = 0; i < textarea.length; i++) {
        textarea[i].value = "";

    }
    var selectAll = document.getElementById(tab).getElementsByTagName('select');
    for (var i = 0; i < selectAll.length; i++) {
        selectAll[i].selectedIndex = 0;
    }
}


com.getWebUrl = function () {
    //return "http://localhost:53525/";
    return '';
}
/**
* url增加时间戳解决缓存问题
*参数：url
*/
com.convertURL = function (url) {
    var timstamp = (new Date()).valueOf();
    if (url.indexOf("?") >= 0) {
        url = url + "&t=" + timstamp;
    } else {
        url = url + "?t=" + timstamp;
    }
    return url;
};

/**
* 增加日期1天
*参数：date:yyyy-mm-dd
*/
com.addDay = function (date) {
    //slice返回一个数组
    var str = date.slice(5) + "- " + date.slice(0, 4);
    var d = new Date(str);
    var d3 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    var month = returnMonth(d3.getMonth());
    var day = d3.getDate();
    day = day < 10 ? "0" + day : day;
    var str2 = d3.getFullYear() + "-" + month + "-" + day;
    return str2;
};

/**
* 返回月份
*参数：num：int型参数，其他返回空
*/
function returnMonth(num) {
    var str = "";
    switch (num) {
        case 0: str = "01"; break;
        case 1: str = "02"; break;
        case 2: str = "03"; break;
        case 3: str = "04"; break;
        case 4: str = "05"; break;
        case 5: str = "06"; break;
        case 6: str = "07"; break;
        case 7: str = "08"; break;
        case 8: str = "09"; break;
        case 9: str = "10"; break;
        case 10: str = "11"; break;
        case 11: str = "12"; break;
    }
    return str;
}


/**
* 格式化bool类型
*参数：value：bool类型，返回“是”，“否”
*/
com.formatBool = function (value) {
    return value == true ? "是" : "否";
};

/**
* 判断浏览器
*/
com.getOs = function () {
    if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE 7.0";
    }
    if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE 8.0";
    }
    if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE 9.0";
    }
    if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE 10.0";
    }
    if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE 11.0";
    }
    if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
        return "Safari";
    }
    if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
        return "Camino";
    }
    if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
        return "Gecko";
    }
    return "MSIE 10.0";
};

/**
* 格式化下拉框数据源
*参数：sourse：数据格式为json { "value": "", "text": "==请选择=="}
*/
com.formartComBoxData = function (sourse) {
    var arr = [];
    arr.push({ "value": "", "text": "==请选择==" });
    $.each(sourse, function (i, n) {
        arr.push({ "value": n.value + '', "text": n.text });
    });
    return arr;
};

/**
* 日期比较
*参数：a：yyyy-mm-dd
*参数：b：yyyy-mm-dd
*/
com.dateCompare = function (a, b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes >= lktimes) {
        //alert('开始时间大于结束时间，请检查');
        return false;
    }
    else
        return true;

};

/**
* 日期比较yyyy-mm-dd HH:mm:ss
* @param beginTime 开始时间
* @param endTime 结束时间
*/
com.dateTimeCp = function (beginTime, endTime) {
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        return false;
    } else if (a > 0) {
        return true;
    } else if (a == 0) {
        //alert("时间相等!");
        return false;
    }
    return false;
};

com.getEditHtml = function (obj) {
    var parentquery = parent.$;
    if (parent.parent) {
        parentquery = parent.parent.$;
    }
    var html = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    alert(html);
    if (obj) {
        html = obj;
    }
    var menuDate = parentquery("#menuDate").data("menuDate");
    var editHtml = '';
    //debugger;
    for (var i = 0; i < menuDate.length; i++) {
        if (menuDate[i].IconClass == 1 && menuDate[i].URL.indexOf(html) > 0) {
            editHtml += menuDate[i].Description;
        }
    }
    return editHtml;
}

/**
* 格式化时间,格式化为日期
* @param value 时间格式
*/
com.formatDate = function (value) {
    return utils.formatDate(value, 'yyyy-MM-dd');
};

/**
* 格式化时间,格式化为时间
* @param value 时间格式
*/
com.formatTime = function (value) {
    return utils.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
};

com.formatHourTime = function (value) {
    return utils.formatDate(value, 'hh:mm:ss');
};


/**
* 格式化金额
* @param value double类型
*/
com.formatMoney = function (value) {
    var sign = value < 0 ? '-' : '';
    return sign + utils.formatNumber(Math.abs(value), '#,##0.00');
};

/**
 * 获取url传递的参数
 * 
 */
com.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

com.initAceUploadFiles = function (formId, modalId, callback, query) {
    var q = $;
    if (query) {
        q = query;
    }
    var $form = q('#' + formId);
    //you can have multiple files, or a file input with "multiple" attribute
    var file_input = $form.find('input[type=file]');
    var upload_in_progress = false;

    file_input.ace_file_input({
        style: 'well',
        btn_choose: '请把文件拖拽至框中或点击选择文件',
        btn_change: null,
        droppable: true,
        thumbnail: 'large',

        maxSize: 110000,//bytes
        allowExt: ["jpeg", "jpg", "png", "gif"],
        allowMime: ["image/jpg", "image/jpeg", "image/png", "image/gif"],

        before_remove: function () {
            if (upload_in_progress)
                return false;//if we are in the middle of uploading a file, don't allow resetting file input
            return true;
        },

        preview_error: function (filename, code) {
            //code = 1 means file load error
            //code = 2 image load error (possibly file is not an image)
            //code = 3 preview failed
        }
    })
    file_input.on('file.error.ace', function (ev, info) {
        if (info.error_count['ext'] || info.error_count['mime']) alert('Invalid file type! Please select an image!');
        if (info.error_count['size']) alert('Invalid file size! Maximum 100KB');


    });


    var ie_timeout = null;//a time for old browsers uploading via iframe

    $form.on('submit', function (e) {
        e.preventDefault();

        var files = file_input.data('ace_input_files');
        if (!files || files.length == 0) return false;//no files selected

        var deferred;
        if ("FormData" in window) {

            formData_object = new FormData();//create empty FormData object

            //serialize our form (which excludes file inputs)
            $.each($form.serializeArray(), function (i, item) {
                //add them one by one to our FormData
                formData_object.append(item.name, item.value);
            });
            //and then add files
            $form.find('input[type=file]').each(function () {
                var field_name = q(this).attr('name');
                //for fields with "multiple" file support, field name should be something like `myfile[]`

                var files = q(this).data('ace_input_files');
                if (files && files.length > 0) {
                    for (var f = 0; f < files.length; f++) {
                        formData_object.append(field_name, files[f]);
                    }
                }
            });


            upload_in_progress = true;
            //file_input.ace_file_input('loading', true);

            deferred = com.ajax({
                url: $form.attr('action'),
                type: 'post',
                processData: false,//important
                contentType: false,//'text/html;charset=utf-8'
                dataType: 'json',
                data: formData_object,
                success: function (d) {
                    if (d.type > 0) {
                        if (callback) callback();
                        file_input.ace_file_input('reset_input');
                        q("#" + modalId).modal('hide');
                    }
                    else {
                        com.message("error", d.message);
                    }
                }
            })

        }
        else {
            //for older browsers that don't support FormData and uploading files via ajax
            //we use an iframe to upload the form(file) without leaving the page

            deferred = new $.Deferred //create a custom deferred object

            var temporary_iframe_id = 'temporary-iframe-' + (new Date()).getTime() + '-' + (parseInt(Math.random() * 1000));
            var temp_iframe =
                    q('<iframe id="' + temporary_iframe_id + '" name="' + temporary_iframe_id + '" \
								frameborder="0" width="0" height="0" src="about:blank"\
								style="position:absolute; z-index:-1; visibility: hidden;"></iframe>')
                    .insertAfter($form)

            $form.append('<input type="hidden" name="temporary-iframe-id" value="' + temporary_iframe_id + '" />');

            temp_iframe.data('deferrer', deferred);
            //we save the deferred object to the iframe and in our server side response
            //we use "temporary-iframe-id" to access iframe and its deferred object

            $form.attr({
                method: 'POST',
                enctype: 'multipart/form-data',
                target: temporary_iframe_id //important
            });

            upload_in_progress = true;
            //file_input.ace_file_input('loading', true);//display an overlay with loading icon
            $form.get(0).submit();


            //if we don't receive a response after 30 seconds, let's declare it as failed!
            ie_timeout = setTimeout(function () {
                ie_timeout = null;
                temp_iframe.attr('src', 'about:blank').remove();
                deferred.reject({ 'status': 'fail', 'message': 'Timeout!' });
            }, 30000);
        }


        ////////////////////////////
        //deferred callbacks, triggered by both ajax and iframe solution
        try {
            deferred
            .done(function (result) {//success
                //format of `result` is optional and sent by server
                //in this example, it's an array of multiple results for multiple uploaded files
                //var message = '';
                //for (var i = 0; i < result.length; i++) {
                //    if (result[i].status == 'OK') {
                //        message += "File successfully saved. Thumbnail is: " + result[i].url
                //    }
                //    else {
                //        message += "File not saved. " + result.message;
                //    }
                //    message += "\n";
                //}
                //alert(message);
            })
            .fail(function (result) {//failure

                if (callback) callback();
                file_input.ace_file_input('reset_input');
                q("#" + modalId).modal('hide');
                //debugger;
                //alert(result.statusText);
            })
            .always(function () {//called on both success and failure
                if (ie_timeout) clearTimeout(ie_timeout)
                ie_timeout = null;
                upload_in_progress = false;
                //file_input.ace_file_input('loading', false);
            });

            deferred.promise();
        } catch (e) {

        }
    })
}
/**
* 格式化checkbox
* @param value string类型 true/false
*/
com.formatCheckbox = function (value) {
    var checked = (value || 'false').toString() == 'true';
    return utils.formatString('<img value={0} src="~/Content/images/{1}"/>', checked, checked ? "checkmark.gif" : "checknomark.gif");
};

/**
* bootstrap模态框
* opts参数，html带#的模板Id，如‘#edit-temp’
*/
com.modaldialog = function (opts) {
    var query = parent.$;


    var win = query('#win');
    if (query.isFunction(opts.html))
        opts.html = utils.functionComment(opts.html);
    else if (/^\#.*\-template$/.test(opts.html))
        opts.html = $(opts.html).html();
    win.empty();
    win.html(opts.html);


    ko.applyBindings(new opts.viewModel(win), win.find(".modal-dialog")[0]);

    return win;

}

/**
* 弹messagee
* @param type success/error/warning/information/confirm
* @param message 消息内容
* @param callback 回调方法
*/
com.message = function (type, message, callbackevent) {

    switch (type) {
        case "success":
            message = '<div style="font-size:14px;">' + message + '<div>';//<i class="icon-ok-sign green"></i>
            $.gritter.add({
                //title: 'Success',
                text: message,
                class_name: 'gritter-success gritter-center',
                time: '2000'
            });
            break;
        case "info":
            message = '<div style="font-size:14px;">' + message + '<div>';
            $.gritter.add({
                title: '提示',
                text: message,
                class_name: 'gritter-info',
                //time: '3000'
            });
            break;
        case "error":
            message = '<div style="font-size:14px;">' + message + '<div>';
            bootbox.dialog({
                message: message,
                title: "错误",
                buttons: {
                    main: {
                        label: "知道了",
                        className: "btn-primary"
                    }
                }
            });
            break;
        case "warning":
            message = '<div style="font-size:14px;">' + message + '<div>';//<i class="icon-warning-sign bigger-150"></i>
            bootbox.dialog({
                message: message,
                title: '警告',
                buttons: {
                    main: {
                        label: "知道了",
                        className: "btn-primary"
                    }
                }
            });
            break;
        case "confirm":
            message = '<div style="font-size:14px;">' + message + '<div>';//<i class="icon-question-sign bigger-150"></i>
            bootbox.dialog({
                message: message,
                title: '提示',
                buttons: {
                    OK: {
                        label: "确定",
                        className: "btn-primary",
                        callback: function () {
                            callbackevent(true);
                            return true;
                        }
                    },
                    Cancel: {
                        label: "取消",
                        className: "btn-default",
                        callback: function () {
                            //callback;
                            return true;
                        }
                    }
                 
                }
            });
            break;
          
    }

    return null;
};

/**
* EasyUI DataGrid根据字段动态合并单元格
* @param tableID 要合并table的id
* @param fldList 要合并的列,用逗号分隔(例如："name,department,office");
*/
com.mergeCells = function (tableId, fldList) {
    var arr = fldList.split(",");
    var dg = $('#' + tableId);
    var fldName;
    var rowCount = dg.datagrid("getRows").length;
    var span;
    var perValue = '';
    var curValue = '';
    var length = arr.length - 1;
    for (i = length; i >= 0; i--) {
        fldName = arr[i];
        perValue = "";
        span = 1;
        for (row = 0; row <= rowCount; row++) {
            if (row == rowCount) {
                curValue = "";
            }
            else {
                curValue = dg.datagrid("getRows")[row][fldName];
            }
            if (perValue == curValue) {
                span += 1;
            }
            else {
                var index = row - span;
                dg.datagrid('mergeCells', {
                    index: index,
                    field: fldName,
                    rowspan: span,
                    colspan: null
                });
                span = 1;
                perValue = curValue;
            }
        }
    }
};


/**
* 根据条件判断是否需要弹消息框
* @param condition true/false
* @param type success/error/warning/information/confirm
* @param message 消息内容
* @param callback 回调方法
*/
com.messageif = function (condition, type, message, callback) {
    if (condition)
        com.message(type, message, callback);
};


/**
* ajax请求
*/
com.ajax = function (options) {
    options = $.extend({
        showLoading: true
    }, options);
    //if (com.controllUrl()!="/") {
    //    options.url = com.controllUrl() + options.url;
    //}
   
    var ajaxDefaults = {
        type: 'POST',
        dataType: 'json',
        //contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        error: function (e) {
            var msg = e.responseText;
            var ret = msg.match(/^{\"Message\":\"(.*)\",\"ExceptionMessage\":\"(.*)\",\"ExceptionType\":.*/);
            if (ret != null) {
                msg = (ret[1] + ret[2]).replace(/\\"/g, '"').replace(/\\r\\n/g, '<br/>').replace(/dbo\./g, '');
            }
            else {
                try { msg = $(msg).text() || msg; }
                catch (ex) { }
            }
            if (msg.indexOf("<html>") > 0) {
                window.location.href = "/Login";
            } else {
                com.message('error', msg);
            }
        }
    };

    if (options.showLoading) {
        ajaxDefaults.beforeSend = $.showLoading;
        ajaxDefaults.complete = $.hideLoading;
    }

    $.ajax($.extend(ajaxDefaults, options));
};


com.query = function (element) {
    var query = $;
    if ($(document).find(element).length == 0 && element != document) {
        if ($(parent.document).find(element)) {
            query = parent.$;
        }
    }
    return query;
};

/**
* 校验表单
* @param context 上下文，document
*/
com.formValidate = function (context) {
    context = context || document;
    var query = com.query(context);
    if (query.fn.validatebox) {
        var box = query(".validatebox-text", context);
        if (box.length) {
            box.validatebox("validate");
            box.trigger("focus");
            box.trigger("blur");
            var valid = $(".validatebox-invalid:first", context).focus();
            return valid.length == 0;
        }
    }
    return true;
};






/**
* 增加只读属性
* @param type 类型
*/
com.readOnlyHandler = function (type) {
    //readonly
    _readOnlyHandles = {};
    _readOnlyHandles.defaults = _readOnlyHandles.input = function (obj, b) {
        b ? obj.addClass("readonly").attr("readonly", true) : obj.removeClass("readonly").removeAttr("readonly");
    };
    _readOnlyHandles.combo = function (obj, b) {
        var combo = obj.data("combo").combo;
        _readOnlyHandles.defaults(combo.find(".combo-text"), b);
        if (b) {
            combo.unbind(".combo");
            combo.find(".combo-arrow,.combo-text").unbind(".combo");
            obj.data("combo").panel.unbind(".combo");
        }
    };
    _readOnlyHandles.spinner = function (obj, b) {
        _readOnlyHandles.defaults(obj, b);
        if (b) {
            obj.data("spinner").spinner.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
        }
    };
    return _readOnlyHandles[type || "defaults"];
};

/**
* 加载css
* @param url css地址
*/
com.loadCss = function (url, doc, reload) {
    var links = doc.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++)
        if (links[i].href.indexOf(url) > -1) {
            if (reload)
                links[i].parentNode.removeChild(links[i]);
            else
                return;
        }
    var container = doc.getElementsByTagName("head")[0];
    var css = doc.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.media = "screen";
    css.href = url;
    container.appendChild(css);
};

/**
* 导出
* @param opt opt
*/
com.exporter = function (opt) {
    var self = this;

    var defaultOptions = {
        action: "/home/download",
        dataGetter: "api",
        dataAction: "",
        dataParams: {},
        titles: [[]],
        fileType: 'xls',
        compressType: 'none'
    };

    this.paging = function (page, rows) {
        self.params.dataParams.page = page;
        self.params.dataParams.rows = rows;
        return self;
    };

    this.compress = function () {
        self.params.compressType = 'zip';
        return self;
    };

    this.title = function (filed, title) {
        self.params.titles[filed] = title;
        return self;
    };

    this.download = function (suffix) {
        self.params.fileType = suffix || "xls";
        self.params.dataParams = JSON.stringify(self.params.dataParams);
        self.params.titles = JSON.stringify(self.params.titles);

        //创建iframe
        var downloadHelper = $('<iframe style="display:none;" id="downloadHelper"></iframe>').appendTo('body')[0];
        var doc = downloadHelper.contentWindow.document;
        if (doc) {
            doc.open();
            doc.write(''); //微软为doc.clear();
            doc.writeln(utils.formatString("<html><body><form id='downloadForm' name='downloadForm' method='post' action='{0}'>", self.params.action));
            for (var key in self.params) doc.writeln(utils.formatString("<input type='hidden' name='{0}' value='{1}'>", key, self.params[key]));
            doc.writeln('<\/form><\/body><\/html>');
            doc.close();
            var form = doc.forms[0];
            if (form) {
                form.submit();
            }
        }
    };

    initFromGrid = function (grid) {
        var options = grid.$element().datagrid('options');
        if (grid.treegrid)
            options.url = options.url || grid.treegrid('options').url;

        var titles = [[]], length = Math.max(options.frozenColumns.length, options.columns.length);
        for (var i = 0; i < length; i++)
            titles[i] = (options.frozenColumns[i] || []).concat(options.columns[i] || []);
        self.params = $.extend(true, {}, defaultOptions, {
            dataAction: options.url,
            dataParams: options.queryParams,
            titles: titles
        });
    };

    if (opt.$element)
        initFromGrid(opt);
    else
        self.params = $.extend(true, {}, defaultOptions, opt);

    return self;
};


com.cookie = $.cookie;

/**
* 获取设置
* @param name name
* @param defaults defaults
*/
com.getSetting = function (name, defaults) {
    if (!parent.wrapper) return defaults;
    try {
        return parent.wrapper.settings[name] || defaults;
    }
    catch (e) {
        return defaults;
    }
};