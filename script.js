const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.classList.add(savedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.classList.add('dark');
  }
}


let playing = false;
let audiobtn = document.querySelector(".audiobtn");

let audio = [];
for(let i=0; i<14; i++)
{
    audio[i] = new Audio();
    audio[i].loop = true;
    audio[i].src = `sounds/${i}.ogg`;
}

audiobtn.addEventListener('click', () => {
    if(!playing){
        playing = true;
        for(let i=0; i<14; i++)
        {
            let id = i+1;
            let currentvol = document.getElementById(id).value;
            changevol(currentvol,id);
        }
        audiobtn.innerHTML = `<i class="bi bi-stop-circle-fill"></i>`;
    } else {
        playing = false;
        for(let i=0; i<14; i++)
            {
                audio[i].pause();
            }
        audiobtn.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
    }
});

function changevol(currentvol, id) {
    if(playing)
    {
        if(currentvol==0)
            audio[id-1].pause();
        else{
            if(audio[id-1].paused)
                audio[id-1].play();
            audio[id-1].volume = currentvol;
        }
    }
}

const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };

const btn = document.getElementById('btn');
btn.onclick = toggleDarkMode;


//custom audio
let url = ""
let urlbox = document.querySelector("#url-link");
let urlsub = document.querySelector("#url-submit");
urlsub.addEventListener('click', ()=>{
    let url = (urlbox.value).split("=");
    customSetup(url[1]);
    console.log(url[1]);
});
var player;
let customPlaying = false;
let custAudioBtn = document.querySelector(".cust-audiobtn");
let custVolume = document.querySelector("#custom-vol");
function customSetup(url){
    if (customPlaying) {
        player.stopVideo();
        customPlaying = false;
        custAudioBtn.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
    }
    
    if (player) {
        player.loadVideoById(url);
    } else {
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '0',
                width: '0',
                videoId: url,
                playerVars: {
                'playsinline': 1
                },
                events: {
                'onReady': onPlayerReady,
                }
            });
        }
    }
    onYouTubeIframeAPIReady();
}    

function onPlayerReady(){
    player.setVolume(custVolume.value);
    custAudioBtn.addEventListener('click', () => {
        if(!customPlaying){
            customPlaying = true;
            player.playVideo();
            custAudioBtn.innerHTML = `<i class="bi bi-stop-circle-fill"></i>`;
        } else {
            customPlaying = false;
            player.stopVideo();
            custAudioBtn.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
        }
    });
    custVolume.addEventListener('change', ()=>{
    player.setVolume(custVolume.value);
    });
}