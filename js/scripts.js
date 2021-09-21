var canvas = document.querySelector("canvas");
var savebtn = document.querySelector("#save-btn");
var clearbtn = document.querySelector("#clear-btn")
var signatures = document.querySelector("#signatures");

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: "rgb(255,255,255)"
});

savebtn.onclick = function(){
    if(signaturePad.isEmpty())
        return

    var img = document.createElement("img");
    img.src = signaturePad.toDataURL();
    signatures.append(img);
    signaturePad.clear();
}

clearbtn.onclick = ()=>signaturePad.clear();

function resizeCanvas() {
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();