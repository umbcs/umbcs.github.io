window.onload = window.onresize = function() {
    var s = getWidth("page-content");
    if(s > 1650){
        var wrapperWidth = getWidth("wrapper");
        setWidthMargin("sidebar", ((s - wrapperWidth) / 2));
    }else{
        setHeightSidebar();
    }
};

function getWidth(className){
    var c = document.getElementsByClassName(className)[0];
    var style = c.currentStyle || window.getComputedStyle(c);
    var w = style.width;
    var p = style.paddingLeft;
    return parseInt(w.substring(0, (w.length - 2))) 
        + parseInt(p.substring(0, (p.length - 2))) * 2;
}

function setHeightSidebar(){
    var c = document.getElementsByClassName("sidebar")[0];
    c.parentElement.style.minHeight = "520px";
}

function setWidthMargin(className, num){
    var c = document.getElementsByClassName(className)[0];
    c.style.width = num + "px";
    c.style.marginLeft = "-" + (num + 5) + "px";
}

function openMenu(num){
    var s = document.getElementsByClassName("sidebar")[0];
    var c = document.getElementsByClassName("wrap-table")[0].children[num];
    var st = c.currentStyle || window.getComputedStyle(c);
    var l = st.left;
    if(l == "0px"){
        s.style.left = "-630px";
        c.style.left = "630px";
    }else{
        c.style.left = "0px";
        s.style.left = "-600px";
    }
}