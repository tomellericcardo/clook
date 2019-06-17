// Home page
var home = {

    // Initialization
    init: function() {
        home.install_sw();
        home.init_new();
        home.interval = [];
        for (var i = 0; i < clooks_list.length; i++)
            home.init_clook(i);
    },

    // Service worker installation
    install_sw: function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    },

    // New clook button initialization
    init_new: function() {
        document.querySelector('#new').addEventListener('click', function() {
            window.location.href = '/clooks/new';
        });
    },

    // Clook initialization
    init_clook: function(i) {
        if (clooks_list[i].started) home.run_clook(i, false);
        else document.querySelectorAll('.timer')[i].style.background = clooks_list[i].color;
    },

    // Run clook
    run_clook: function(i, vibration) {
        var started = new Date(clooks_list[i].started)
        var elapsed = Date.now() - started;
        var sector = (elapsed * 100) / clooks_list[i].duration;
        if (sector >= 100) {
            if (vibration) navigator.vibrate([200, 100, 200]);
            document.querySelectorAll('.timer')[i].style.background = 'var(--primary-color)';
            clearInterval(home.interval[i]);
        } else {
            home.update_timer(i, sector);
            home.interval[i] = setTimeout(function() {
                home.run_clook(i, true);
            }, 1000);
        }
    },

    // Update timer
    update_timer: function(i, sector) {
        var background = 'conic-gradient(';
        background += 'var(--primary-color) ' + sector + '%, ';
        background += clooks_list[i].color + ' ' + (sector + .2) + '%)';
        document.querySelectorAll('.timer')[i].style.background = background;
    }

};


// Initialize when page is ready
document.addEventListener('DOMContentLoaded', home.init());
