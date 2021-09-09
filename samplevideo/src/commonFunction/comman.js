export const HHMMSS = (sec) =>{
    let sec_num = parseInt(sec, 10);    
    let hours  = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    let Ohours = hours + '';
    let Ominutes = minutes + '';
    let Oseconds = seconds + '';
    if (hours < 10) {
        Ohours = "0" + hours;
    }
    if (minutes < 10) {
        Ominutes = "0" + minutes;
    }
    if (seconds < 10) {
        Oseconds = "0" + seconds;
    }
    var time = Ohours + ':' + Ominutes + ':' + Oseconds;
    return time;
}