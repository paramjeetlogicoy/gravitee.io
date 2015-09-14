/*
* Fullscreen Function to adapt section to screen resolution
 */
function fullscreen(){
    var screenHeight = window.innerHeight;
    var fulldiv = document.querySelectorAll('.fullscreen');
    for (var i = 0; i < fulldiv.length; i++) {
        fulldiv[i].style.height = screenHeight+"px";
    }
}

/*
* Smooth Scroll Function
 */
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 4);
    if (speed >= 8) speed = 8;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

/* Function de décalage du text pour un visuel en losange */
function skewX(){
    var skewElements = document.querySelectorAll('.skewX');
    for (var i = 0; i < skewElements.length; i++) {
        var span = skewElements[i].querySelectorAll('span');
        for (var j = 0; j < span.length; j++) {
            span[j].style.marginLeft = j * 24 +"px";
        }
    }

    var skewElements2 = document.querySelectorAll('.skew-X');
    for (var i = 0; i < skewElements2.length; i++) {
        var span = skewElements2[i].querySelectorAll('span');
        for (var j = 0; j < span.length; j++) {
            span[j].style.marginLeft = j * -24 +"px";
        }
    }
}


function sendMail(){
    var from, name, message;

    var url = "http://localhost:3000/send"

    from = document.getElementById('mail').value;
    name = document.getElementById('name').value;
    message = document.getElementById("message").value;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function (data) {
        if (httpRequest.readyState != 4 || httpRequest.status != 200) return;
        alert("Success: " + httpRequest.responseText);
    }
    httpRequest.open('GET', url);
    httpRequest.send({name:name,from:from,text:message});
}



document.addEventListener('DOMContentLoaded', function() {
    fullscreen();
    skewX();
    window.addEventListener('resize', fullscreen, false);
});