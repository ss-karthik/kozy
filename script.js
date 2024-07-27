let playing = false;
let audiobtn = document.querySelector(".audiobtn");

let audio = [];
//audio[0] = new Audio();
for(let i=0; i<14; i++)
{
    audio[i] = new Audio();
    audio[i].src = `sounds/${i}.ogg`;
}

audiobtn.addEventListener('click', () => {
    if(!playing){
        playing = true;
        for(let i=0; i<14; i++)
        {
            audio[i].volume = 0;
            audio[i].play();
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
    audio[id-1].volume = currentvol;
}