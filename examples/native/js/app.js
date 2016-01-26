var view = app.currentView();
domReady(function(require) {
    $('.button').button(function(btn, vet) {
        var text = btn.innerHTML;
        if (text == '添加侧滑抽屉效果') {
            app.addSlideDrawer('set.html', 'left', 200);
            app.openLeftSlideDrawer();
        } else if (text == '弹出单按钮对话框') {
            app.alert('弹出单按钮对话框')
        } else if (text == '弹出多按钮对话框') {
            view.confirm('弹出默认多按钮对话框', function() {
                view.confirm('弹出带title多按钮对话框', 'title', function() {
                    view.confirm('弹出带title,btnCaptions多按钮对话框', 'title', ['按钮1', '按钮2', '按钮3'], function() {
                        view.confirm({
                            message: 'JSON参数弹出默认多按钮对话框',
                            title: 'JSON',
                            btnCaptions: ['按钮1', '按钮2', '按钮3'],
                            callback: function() {
                                view.confirm('弹出无回调函数多按钮对话框')
                            }
                        })
                    })
                })
            });
        } else if (text == '弹出多按钮prompt对话框') {
            view.prompt('弹出默认多按钮prompt对话框', function() {
                view.prompt('弹出带title多按钮prompt对话框', 'title', function() {
                    view.prompt('弹出带title,btnCaptions多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], function() {
                        view.prompt('弹出带title,btnCaptions,inputValue多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], 'inputValue', function() {
                            view.prompt('弹出带title,btnCaptions,inputValue,inputTpye多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], 'inputValue', 'text', function() {
                                view.prompt({
                                    message: 'JSON参数弹出默认多按钮prompt对话框',
                                    title: 'JSON',
                                    btnCaptions: ['按钮1', '按钮2', '按钮3'],
                                    inputValue: 'inputValue',
                                    inputTpye: 'text',
                                    callback: function() {
                                        view.prompt('弹出无回调函数多按钮prompt对话框')
                                    }
                                })
                            })
                        })
                    })
                })
            })
        } else if (text == '获取当前窗口的宽度') {
            alert(view.getWidth());
        } else if (text == '获取当前窗口的高度') {
            alert(view.getHeight());
        }
    });
    $('.ui-nav-bar-right').button(function() {
        setDocTarget('doc/app.html', 'App Doc')
        var win = app.createWindow();
        win.open('doc.html')
    })

});