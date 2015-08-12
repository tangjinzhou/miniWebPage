$(function() {
    var $ruleContainer = $('#rule-container');
    chrome.storage.sync.get(null, function(data) {
        var tpl = $('#itemTpl').html();
        var template = _.template(tpl);
        var html = template({
            rules: _.pairs(data)
        });
        $ruleContainer.find('.col-sm-3:first').after(html);
        var updataPanel = function(title, url, css, script, $wrap) {
            var rules = [
                [url, {
                    'title': title,
                    'css': css,
                    'script': script
                }]
            ];
            var html = template({
                rules: rules
            });
            if ($wrap) { //更新
                $wrap.replaceWith(html);
            } else { //添加
                $ruleContainer.find('.col-sm-3:first').after(html);
            }
        };
        $('#rule-container').on('click', '.delete', function() {
            if (confirm('确认要删除该样式规则吗？')) {
                var $this = $(this);
                var ruleUrl = $this.data('ruleurl');
                $this.closest('.col-sm-3').remove();
                chrome.storage.sync.remove(ruleUrl);
            }

        });

        $('#rule-container').on('click', '.update, .add', function() {
            var $this = $(this);
            var ruleUrl = $this.data('ruleurl') || '';
            var css = $this.data('css') || '';
            var title = $this.data('title') || '';
            var script = $this.data('script') || '';
            css = css.replace(/\n|\r/g,"");
            var $wrap = null;
            if (ruleUrl != '') {
                $wrap = $this.closest('.col-sm-3');
            }
            BootstrapDialog.show({
                title: '规则',
                message: '标题: <input required type="text" class="form-control rule-title" value="' + title + '" placeholder="输入规则标题"><br/>' +
                    '链接: <input required type="text" class="form-control rule-url" value="' + ruleUrl + '" placeholder="输入包含链接,如:https://www.google.com/"><br/>' +
                    '样式: <textarea required class="form-control rule-css" style="min-height: 100px" placeholder="输入符合css规范的样式...">' + css + '</textarea>' +
                    '脚本: <textarea required class="form-control rule-script" style="min-height: 100px" placeholder="输入合法的脚本(可选)...">' + script + '</textarea>',
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
                        var css = $.trim(dialogRef.getModalBody().find('.rule-css').val()).replace(/<[^>].*?>/g,"");
                        var script = $.trim(dialogRef.getModalBody().find('.rule-script').val());
                        var reg = new RegExp("[a-zA-z]+://[^\s]*","i") ;
                        if (title == '' || url == '' || css == '') {
                            alert('有选项未填写!');
                        } else if (title.length > 30) {
                            alert('标题长度不可以超过20个字!');
                        } else if (!url.match(reg)) {
                            alert('url链接不合法!');
                        } else if (url.length > 150) {
                            alert('链接长度不可以超过50!')
                        } else {
                            chrome.storage.sync.get(url, function(res) {
                                var rule = {};
                                rule[url] = {
                                    'css': css,
                                    'title': title,
                                    'script': script
                                };
                                if (_.size(res).length > 0) {
                                    if (confirm('该链接已存在响应样式，确认要覆盖吗？')) {
                                        chrome.storage.sync.set(rule);
                                        updataPanel(title, url, css, script, $wrap);
                                        dialogRef.close();
                                    }
                                } else {
                                    chrome.storage.sync.set(rule);
                                    updataPanel(title, url, css, script, $wrap);
                                    dialogRef.close();
                                }
                            });
                        }
                    }
                }]
            });
        })
    })
});
