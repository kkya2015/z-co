var gulp = require('gulp'), //基础库
    concat = require('gulp-concat'), //合并文件
    connect = require('gulp-connect'),
    less = require('gulp-less'), //less解析
    minifycss = require('gulp-minify-css'), //css压缩
    jshint = require('gulp-jshint'), //js检查
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    clean = require('gulp-clean'), //清空文件夹
    del = require('del'),
    open = require('gulp-open'),
    livereload = require('gulp-livereload'), //livereload
    paths = {
        root: './',
        bak: 'src/bak/',
        dist: {
            root: 'examples/dist/',
            styles: 'examples/dist/css/',
            scripts: 'examples/dist/js/'
        },
        co: {
            root: 'co/',
            styles: 'co/css/',
            scripts: 'co/'
        },
        source: {
            root: 'src/co-modules/',
            styles: 'src/co-modules/less/',
            scripts: 'src/co-modules/js/',
            emu: 'src/co-modules/emu/',
            examples: 'src/examples/'
        },
        examples: {
            root: 'examples/',
            index: 'examples/contains.html'
        }
    },
    native = {
        filename: 'native',
        jsFiles: [
            'src/co-modules/js/native.js',
            'src/co-modules/js/native/app.js',
            'src/co-modules/js/native/component.js',
            'src/co-modules/js/native/window.js',
            'src/co-modules/js/native/view.js',
            'src/co-modules/js/native/accelerometer.js',
            'src/co-modules/js/native/actionSheet.js',
            'src/co-modules/js/native/audio.js',
            'src/co-modules/js/native/camera.js',
            'src/co-modules/js/native/contacts.js',
            'src/co-modules/js/native/database.js',
            'src/co-modules/js/native/device.js',
            'src/co-modules/js/native/downloader.js',
            'src/co-modules/js/native/eventListener.js',
            'src/co-modules/js/native/gallery.js',
            'src/co-modules/js/native/geolocation.js',
            'src/co-modules/js/native/httpManager.js',
            'src/co-modules/js/native/log.js',
            'src/co-modules/js/native/message.js',
            'src/co-modules/js/native/networkinfo.js',
            'src/co-modules/js/native/os.js',
            'src/co-modules/js/native/popover.js',
            'src/co-modules/js/native/progress.js',
            'src/co-modules/js/native/properties.js',
            'src/co-modules/js/native/screen.js',
            'src/co-modules/js/native/socketManager.js',
            'src/co-modules/js/native/storage.js',
            'src/co-modules/js/native/zip.js',
            'src/co-modules/js/native/require.js',
            'src/co-modules/js/native/plugin/tabMark.js',
            'src/co-modules/js/debug.js',
            'src/co-modules/js/debug/device.js',
            'src/co-modules/js/debug/os.js',
            'src/co-modules/js/debug/app.js',
            'src/co-modules/js/debug/dom.js',
            'src/co-modules/js/debug/window.js',
            'src/co-modules/js/debug/http.js',
            'src/co-modules/js/debug/storage.js',
            'src/co-modules/js/debug/screen.js',
            'src/co-modules/js/debug/audio.js',
            'src/co-modules/js/debug/tabMark.js',
            'src/co-modules/js/debug/event.js'
        ]
    },
    co = {
        filename: 'co',
        jsFiles: [
            'src/co-modules/js/libs/iscroll.js',
            'src/co-modules/js/zepto.extend.js',
            'src/co-modules/js/$extend.js',
            'src/co-modules/js/co.js',
            'src/co-modules/js/widgets/slider/slider.js',
            'src/co-modules/js/widgets/slider/touch.js',
            'src/co-modules/js/widgets/slider/guide.js',
            'src/co-modules/js/widgets/slider/multiview.js',
            'src/co-modules/js/widgets/slider/gestures.js',
            'src/co-modules/js/widgets/accordion.js',
            'src/co-modules/js/widgets/accordionList.js',
            'src/co-modules/js/widgets/fullpage.js',
            'src/co-modules/js/widgets/input.js',
            'src/co-modules/js/widgets/lazyloadimage.js',
            'src/co-modules/js/widgets/navigator.js',
            'src/co-modules/js/widgets/photobrowser.js',
            'src/co-modules/js/widgets/refresh.js',
            'src/co-modules/js/widgets/searchbar.js',
            'src/co-modules/js/widgets/swipelist.js',
            'src/co-modules/js/widgets/swipepage.js',
            'src/co-modules/js/widgets/switch.js',
            'src/co-modules/js/widgets/tabs.js'
        ]
    },
    emu = {
        filename: 'contains',
        jsFiles: [
            'src/co-modules/emu/contains.js',
            'src/co-modules/emu/window.js',
            'src/co-modules/emu/request.js',
            'src/co-modules/emu/app.js',
            'src/co-modules/emu/tabMark.js',
            'src/co-modules/emu/event.js'
        ]
    },
    dom = {
        filename: 'dom-bak',
        jsFiles: [
            'src/co-modules/js/base/dom/dom.js',
            'src/co-modules/js/base/dom/plugins/event.js',
            'src/co-modules/js/base/dom/plugins/ajax.js',
            'src/co-modules/js/base/dom/plugins/fx.js',
            'src/co-modules/js/base/dom/plugins/fx_methods.js',
            'src/co-modules/js/base/dom/plugins/data.js',
            'src/co-modules/js/base/dom/plugins/highlight.js',
            'src/co-modules/js/base/dom/plugins/detect.js',
            'src/co-modules/js/base/dom/plugins/touch.js',
            'src/co-modules/js/base/dom/plugins/matchMedia.js',
            'src/co-modules/js/base/dom/plugins/$extend.js',
            'src/co-modules/js/base/dom/plugins/ex-ortchange.js',
            'src/co-modules/js/base/dom/plugins/$fn_extend.js'
        ]
    },
    zepto = {
        filename: 'dom',
        jsFiles: [
            'src/co-modules/js/base/zepto/zepto.js',
            'src/co-modules/js/base/zepto/plugins/event.js',
            'src/co-modules/js/base/zepto/plugins/ajax.js',
            'src/co-modules/js/base/zepto/plugins/fx.js',
            'src/co-modules/js/base/zepto/plugins/fx_methods.js',
            'src/co-modules/js/base/zepto/plugins/data.js',
            'src/co-modules/js/base/zepto/plugins/highlight.js',
            'src/co-modules/js/base/zepto/plugins/detect.js',
            'src/co-modules/js/base/zepto/plugins/touch.js',
            'src/co-modules/js/base/zepto/plugins/matchMedia.js',
            'src/co-modules/js/base/zepto/plugins/ex-ortchange.js'
        ]
    },
    banner = {
        header: [
            '/**',
            ' * Released on: <%= date.year %>-<%= date.month %>-<%= date.day %>',
            ' * =====================================================',
            ' * <%= name %> v1.0.0 (http://docs.369cloud.com/engine/jssdk/JS-SDK)',
            ' * =====================================================',
            ' */',
            ''
        ].join('\n'),
        footer: [
            '/**',
            ' * Released on: <%= date.year %>-<%= date.month %>-<%= date.day %>',
            ' */',
            ''
        ].join('\n')
    },
    date = {
        year: new Date().getFullYear(),
        month: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' ')[new Date().getMonth()],
        day: new Date().getDate()
    };

// 清空co
gulp.task('cleanCo', function(cb) {
    return del([paths.co.root]);
});

//co脚本处理
gulp.task('co-native', function(cb) {
    gulp.src(native.jsFiles) //要合并的文件
        .pipe(concat(native.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(header(banner.header, {
            date: date,
            name: 'Native'
        }))
        .pipe(gulp.dest(paths.bak + date.year + date.month + date.day))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(uglify())
        .pipe(header(banner.header, {
            date: date,
            name: 'Native'
        }))
        .pipe(gulp.dest(paths.co.scripts))
        .on('finish', function() {
            cb();
        });
});

//co脚本处理
gulp.task('co-scripts', function(cb) {
    gulp.src(co.jsFiles) //要合并的文件
        .pipe(concat(co.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(header(banner.header, {
            date: date,
            name: 'Co'
        }))
        .pipe(gulp.dest(paths.bak + date.year + date.month + date.day))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(uglify())
        .pipe(header(banner.header, {
            date: date,
            name: 'Co'
        }))
        .pipe(gulp.dest(paths.co.scripts))
        .on('finish', function() {
            cb();
        });
});

//dom处理
gulp.task('co-dom', function(cb) {
    gulp.src(dom.jsFiles) //要合并的文件
        .pipe(concat(dom.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(header(banner.header, {
            date: date,
            name: 'DOM'
        }))
        .pipe(gulp.dest(paths.bak + date.year + date.month + date.day))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(uglify())
        .pipe(header(banner.header, {
            date: date,
            name: 'DOM'
        }))
        .pipe(gulp.dest(paths.co.scripts))
        .on('finish', function() {
            cb();
        });
});

//dom处理
gulp.task('co-zepto', function(cb) {
    gulp.src(zepto.jsFiles) //要合并的文件
        .pipe(concat(zepto.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(header(banner.header, {
            date: date,
            name: 'Dom'
        }))
        .pipe(gulp.dest(paths.bak + date.year + date.month + date.day))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(uglify())
        .pipe(header(banner.header, {
            date: date,
            name: 'Dom'
        }))
        .pipe(gulp.dest(paths.co.scripts))
        .on('finish', function() {
            cb();
        });
});

// co样式处理
gulp.task('co-css', function(cb) {
    gulp.src('src/co-modules/less/co.less')
        .pipe(less())
        .pipe(gulp.dest(paths.bak + date.year + date.month + date.day))
        .pipe(minifycss({
            advanced: false,
            aggressiveMerging: false,
        }))
        .pipe(header(banner.header, {
            date: date,
            name: 'Co'
        }))
        .pipe(gulp.dest(paths.co.styles))
        .on('finish', function() {
            cb();
        });
});

//co字体处理
gulp.task('co-font', function(cb) {
    gulp.src(paths.source.root + 'fonts/*.*')
        .pipe(gulp.dest(paths.co.root + 'fonts/'))
        .on('finish', function() {
            cb();
        });
});

//co处理
gulp.task('build-co', gulp.series('cleanCo', 'co-native', 'co-scripts', 'co-zepto', 'co-css', 'co-font'));

// 清空dist样式
gulp.task('cleanDist', function(cb) {
    return del([paths.dist.root]);
});

// dist样式处理
gulp.task('dist-css', function(cb) {
    gulp.src('src/co-modules/less/co.less')
        .pipe(less())
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(livereload())
        .on('end', function() {
            cb();
        });
});


//dist字体处理错误: 没有找到进程 "node.exe"。
gulp.task('dist-font', function(cb) {
    gulp.src(paths.source.root + 'fonts/*.*')
        .pipe(gulp.dest(paths.dist.root + 'fonts/'))
        .on('finish', function() {
            cb();
        });
});

// 样式处理
gulp.task('dist-styles', gulp.series('dist-css', 'dist-font'));


// js处理
gulp.task('dist-co', function(cb) {
    gulp.src(co.jsFiles) //要合并的文件
        .pipe(concat(co.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(livereload())
        .on('end', function() {
            cb();
        });
});

// dom处理
gulp.task('dist-dom', function(cb) {
    gulp.src(dom.jsFiles) //要合并的文件
        .pipe(concat(dom.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(livereload())
        .on('end', function() {
            cb();
        });
});

// dom处理
gulp.task('dist-zepto', function(cb) {
    gulp.src(zepto.jsFiles) //要合并的文件
        .pipe(concat(zepto.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(livereload())
        .on('end', function() {
            cb();
        });
});

// js处理
gulp.task('dist-native', function(cb) {
    gulp.src(native.jsFiles) //要合并的文件
        .pipe(concat(native.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(livereload())
        .on('end', function() {
            cb();
        });
});


// 清空图片、样式、js
gulp.task('cleanExamples', function(cb) {
    return del([paths.examples.root]);
});

//examples处理
gulp.task('examples', function(cb) {
    gulp.src(paths.source.examples + '**/*.*')
        .pipe(gulp.dest(paths.examples.root))
        .on('end', function() {
            cb();
        });
});

// emu处理
gulp.task('build-emu', function(cb) {
    gulp.src(emu.jsFiles)
        .pipe(concat(emu.filename + ".js")) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(header(banner.header, {
            date: date,
            name: 'Emu'
        }))
        .pipe(gulp.dest(paths.bak + date.year + date.month + date.day))
        // .pipe(uglify())
        .pipe(header(banner.header, {
            date: date,
            name: 'Emu'
        }))
        .pipe(gulp.dest(paths.examples.root))
        .on('end', function() {
            cb();
        });
});

gulp.task('build-examples', gulp.series('cleanExamples', 'examples'));

gulp.task('dist-js', gulp.series('dist-co', 'dist-zepto', 'dist-native'));

gulp.task('build-dist', gulp.series('dist-styles', 'dist-js'));

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('build', gulp.series('build-co', 'build-examples', 'build-dist', 'build-emu'));


/* =================================
    Watch
================================= */

gulp.task('watch', function(cb) {
    var server = livereload();
    livereload.listen();
    var watcher = gulp.watch(paths.source.examples + '**/*.*');
    watcher.on('change', function(file) {
        console.log("file.path--" + file);
        var ex = file.indexOf('examples');
        // console.log("ex--"+ex);
        var next = file.substr(ex + 9).lastIndexOf('\\');
        // console.log("next--"+next);
        var destPaht = paths.examples.root;
        // console.log("destPaht--"+destPaht);
        if (next != -1) {
            destPaht = destPaht + file.substring(ex + 9, ex + 9 + next) + '/';
        }
        console.log(destPaht);
        gulp.src(file)
            .pipe(gulp.dest(destPaht))
            .pipe(livereload());
    })
    gulp.watch(paths.source.styles + '*.less', gulp.series('dist-css'));
    gulp.watch(paths.source.scripts + '**/*.*', gulp.series('dist-js'));
    gulp.watch(paths.source.emu + '**/*.*', gulp.series('build-emu'));
    cb();
});



gulp.task('connect', function(cb) {
    connect.server({
        root: [paths.root],
        port: '3002'
    });
    cb();
});

gulp.task('open', function(cb) {
    gulp.src(paths.examples.index).pipe(open('', {
        url: 'http://localhost:3002/' + paths.examples.index
    }));
    cb();
});

gulp.task('default', gulp.series('build', 'connect', 'open', 'watch'));