function getCurrentAcceleration() {
    app.accelerometer.getCurrentAcceleration(function(acceleration) {
        console.log(acceleration.xAxis) //获取当前设备x轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
    }, function(err) {
        console.log(err);
    })
}