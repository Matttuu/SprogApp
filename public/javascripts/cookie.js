

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

// Hvis der allerede er en cookie som hedder userPoints, brug værdien fra den til deadline
if (document.cookie && document.cookie.match('userPoints')) {
    // få deadline fra cookien
    var deadline = document.cookie.match(/(^|;)userPoints=([^;]+)/)[2];
}

// ellers, sæt en deadline fra nu og
// gem som cookie med givet navn
else {

    
    // Lave en deadline i '10' minutter fra dette tidspunkt.
    var timeInMinutes = 10;
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
    expirationGMT = deadline.toGMTString();

    // Gem i deadline i en cookie
    document.cookie = 'userPoints= ' + deadline + '; expires=' + expirationGMT + '; path=/; domain=localhost';
    
}
initializeClock('clockdiv', deadline);