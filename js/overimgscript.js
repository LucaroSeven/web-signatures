var signatures = document.querySelector("#signatures");
var signatureCanvas = document.querySelector("#signature-pad");
var ctx = signatureCanvas.getContext("2d");
var savebtn = document.querySelector("#save-btn");
var clearbtn = document.querySelector("#clear-btn");
var rotatebtn = document.querySelector("#rotate-btn");

var signaturePad = new SignaturePad(signatureCanvas, {
    // backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0,0,255)'
  });

  
  savebtn.addEventListener('click', function (event) {
    if(signaturePad.isEmpty())
        return

    var img = document.createElement("img");
    img.src = signaturePad.toDataURL('image/png');
    signatures.append(img);
    signaturePad.clear();
    ctx.drawImage(background, 0, 0);
  });
  
  clearbtn.addEventListener('click', function (event) {
    signaturePad.clear();
    ctx.drawImage(background, 0, 0);
  });

  var background = new Image();
  background.src ="/img/4.png";


  background.onload = function(){
    ctx.drawImage(background, 0, 0);
}

function resizeCanvas() {
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    signatureCanvas.width = signatureCanvas.offsetWidth * ratio;
    signatureCanvas.height = signatureCanvas.offsetHeight * ratio;
    signatureCanvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();


function drawRotated(degrees){
    ctx.clearRect(0,0,signatureCanvas.width,signatureCanvas.height);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    ctx.save();

    // move to the center of the canvas
    ctx.translate(signatureCanvas.width/2,signatureCanvas.height/2);

    // rotate the canvas to the specified degrees
    ctx.rotate(-degrees*Math.PI/180);
    signaturePad.clear();

    // draw the image
    // since the context is rotated, the image will be rotated also
    ctx.drawImage(background,(-background.width/2)-10,(-background.width/2)-290);

    // we’re done with the rotating so restore the unrotated context
    ctx.restore();
}

rotatebtn.onclick = () => drawRotated(90);