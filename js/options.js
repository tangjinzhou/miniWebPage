$(function() {
    var updataPanel = function(title, url, css) {

    };
    $('.cursor').on('click', function() {
        BootstrapDialog.show({
            title: '规则',
            message: '标题: <input type="text" class="form-control rule-title" placeholder="输入规则标题"><br/>' +
                '链接: <input type="text" class="form-control rule-url" placeholder="输入包含链接"><br/>' +
                '样式: <textarea class="form-control rule-css" style="min-height: 200px" placeholder="输入符合css规范的样式..."></textarea>',

            buttons: [{
                label: '取消',
                action: function(dialogRef) {
                    dialogRef.close();
                }
            }, {
                label: '确定',
                cssClass: 'btn-primary',
                action: function(dialogRef) {
                    var title = $.trim(dialogRef.getModalBody().find('.rule-title').val());
                    var url = $.trim(dialogRef.getModalBody().find('.rule-url').val());
                    var css = $.trim(dialogRef.getModalBody().find('.rule-css').val());
                    if (title == '' || url == '' || css == '') {
                        alert('有选项未填写');
                    } else {
                        updataPanel(title, url, css);
                        dialogRef.close();
                    }
                }
            }]
        });
    })


});
