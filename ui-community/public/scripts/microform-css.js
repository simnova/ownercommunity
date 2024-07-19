// get iFrames
frames = document.getElementsByTagName("iframe");
// for each frame set css properties
for (let i = 0; i < frames.length; i++) {
  frames[i].style.borderRadius = "6px";
  frames[i].style.height = "30px";
  frames[i].style.border = "1px solid #d5d0da";
  frames[i].style.paddingLeft = "10px";
}
