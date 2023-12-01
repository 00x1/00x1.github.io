const countdown = () => {
    const countDate = new Date("Feb 30, 2024 00:00:00").getTime();

    const currentTime = new Date().getTime();
    const gap = countDate - currentTime;

    const millisecond = 1;
    const second = millisecond * 1000;
    const minutes = second * 60;
    const hour = minutes * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinutes = Math.floor((gap % hour) / minutes);
    const textSecond = Math.floor((gap % minutes) / second);

    document.querySelector('.days').innerText = textDay + "d";
    document.querySelector('.hours').innerText = textHour + "h";
    document.querySelector('.minutes').innerText = textMinutes + "m";
    document.querySelector('.seconds').innerText = textSecond + "s";
};

setInterval(countdown, 1000);
