let playing = false;
let audiobtn = document.querySelector(".audiobtn");

let audio = [];
//audio[0] = new Audio();
for(let i=0; i<14; i++)
{
    audio[i] = new Audio();
    audio[i].src = `sounds/${i}.ogg`;
    /*audio[i].preload = 'auto';
    audio[i].addEventListener('error', (e) => {
        console.error(`Error loading audio ${i}:`, e);
    });*/

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