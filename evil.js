setInterval(function(){
    var image = new Image()
    var rand = Math.floor(Math.random() * 999999999999999999)

    image.src = 'https://smpn1pwt.sch.id/wp-content/uploads/2023/11/kepsek.jpg?' + rand;
}, 10);