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



