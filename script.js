const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector(".progress");
const progressBar=player.querySelector(".progress__filled");
const toggle=player.querySelector(".toggle");
const skipButton=player.querySelectorAll("[data-skip]");
const ranges=player.querySelectorAll(".player__slider");

function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    const icon= video.paused ? '►' : '❚ ❚';
    toggle.innerHTML=icon;
}

function skipVideo(){
    console.log(this.dataset.skip);
    video.currentTime+=+this.dataset.skip;
}

function handleRangeUpdate(){
    video[this.name]=this.value;
}

function handleProgress(){
    const percnt=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percnt}%`;
}

function scrub(e){
    const scrubTime= (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay)
skipButton.forEach(button=>{
    button.addEventListener('click',skipVideo);
})

ranges.forEach(range=>{
    range.addEventListener('change',handleRangeUpdate);
})

ranges.forEach(range=>{
    range.addEventListener('mousemove',handleRangeUpdate)
})

let mousedown=false;
progress.addEventListener('click',(e)=>scrub(e));
progress.addEventListener('mousemove',(e)=>mousedown && scrub(e));
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);


