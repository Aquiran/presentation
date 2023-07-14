var startTime = 0;
var combo = 0;
let miss = false;
let hpnum = 400;
var maximum = 0;
var missnum = 0;

window.addEventListener('keydown', e => {
    let track = e.key.toUpperCase();
    if (document.getElementById(`trackBtn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'rgba(155, 220, 248, 1)';
        isJudge(track);
    }
});

document.addEventListener('keyup', event => {
    if (event.code === 'Space' ) {
      start()
    }
  })

window.addEventListener('keyup', e => {
    let track = e.key.toUpperCase();
    if (document.getElementById(`trackBtn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'rgba(155, 220, 248, 0.5)';
    }
});

function start() {
    document.getElementById('start').style.display = 'none';
    setTimeout(() => {
        var audio = new Audio('songs/FIESTA.flac');
        audio.play();
    }, 1300);
    setTimeout(() => {
        document.getElementById("clear").style.opacity = "1"
    }, 57000);

    startTime = Math.floor(new Date().getTime() / 100);

    setInterval(() => {
        let nowTime = Math.floor(new Date().getTime() / 100);
        for (let i = 0; i < song.note.length; i++) {
            if (startTime + song.note[i].time == nowTime && !song.note[i].noted) {
                song.note[i].noted = true;
                var test = document.createElement('div');
                test.classList.add('tile');
                test.classList.add(`t${i}`)
                document.getElementById(`track${song.note[i].track}`).appendChild(test);
                setTimeout(() => {
                    document.getElementsByClassName(`t${i}`)[0].style.display = "none";
                    setTimeout(() => {
                        if (!miss) {
                            combo = 0;
                            missnum = missnum + 1;
                            hpnum = hpnum - 20;
                            document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                            document.getElementById('hpbar1').style.width = `${hpnum}px`;
                            document.getElementById(`track${track}`).style.backgroundColor = 'red';
                            setTimeout(() => {
                                document.getElementById(`track${track}`).style.backgroundColor = 'rgba(155, 220, 248, 0.5)';
                            }, 100);
                        }
                        document.getElementsByClassName(`t${i}`)[0]?.remove();
                    }, 100);
                }, 1000);
            }
        }
    }, 1);
}

function isJudge(track) {
    let nowTime = Math.floor(new Date().getTime() / 100);
    for (let i = 0; i < song.note.length; i++) {
        if (song.note[i].track === track) {
            if (nowTime + 4 >= startTime + song.note[i].time + 10 && startTime + song.note[i].time + 10 >= nowTime && !song.note[i].played) {
                miss = true;
                if (nowTime + 1 >= startTime + song.note[i].time + 10 && startTime + song.note[i].time + 10 >= nowTime) {
                    combo += 1;
                    song.note[i].played = true;
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementById(`track${track}`).style.backgroundImage = 'linear-gradient(to bottom, rgba(155, 220, 248, 0),rgba(155, 220, 248, 1))';
                    document.getElementsByClassName(`t${i}`)[0]?.remove();
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.backgroundImage = '';
                        setTimeout(() => {
                            miss = false;
                        }, 500);
                    }, 100);
                } else {
                    combo = 0;
                    missnum += 1;
                    hpnum = hpnum - 20
                    document.getElementById('hpbar1').style.width = `${hpnum}px`
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementsByClassName(`t${i}`)[0].remove();
                    document.getElementById(`track${track}`).style.backgroundImage = 'linear-gradient(to bottom, rgba(255,0,0,0), rgba(255,0,0,1))';
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.backgroundImage = '';
                    }, 100);
                }
            }
        }
    }
}

function stop() {
    if (hpnum == 0) {
        window.location = "end.html"
    }
}

setInterval(() => {
    stop()
}, 1);

function max() {
    if (combo > maximum) {
        maximum += 1;
        document.getElementById("max").innerHTML = `Max COMBO : ${maximum}`;
    }
}

setInterval(() => {
    max()
}, 1);

function misso() {
        document.getElementById("misscombo").innerHTML = `MISS : ${missnum}`;
    }


setInterval(() => {
    misso()
}, 1);