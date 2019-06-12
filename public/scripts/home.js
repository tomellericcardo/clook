// Home page
var home = {

    // Initialization
    init: function() {
        home.init_new();
        home.interval = [];
        for (var i = 0; i < clooks_list.length; i++)
            home.init_clook(i);
    },

    // New clook button initialization
    init_new: function() {
        document.querySelector('#new').addEventListener('click', function() {
            window.location.href = '/clooks/new';
        });
    },

    // Clook initialization
    init_clook: function(i) {
        if (clooks_list[i].started) {
            home.run_clook(i);
            home.interval[i] = setInterval(function() {
                home.run_clook(i);
            }, 1000);
        } else
            document.querySelectorAll('.timer')[i].style.background = clooks_list[i].color;
    },

    // Run clook
    run_clook: function(i) {
        var started = new Date(clooks_list[i].started)
        var elapsed = Date.now() - started;
        var sector = (elapsed * 100) / clooks_list[i].duration;
        if (sector >= 100) {
            document.querySelectorAll('.timer')[i].style.background = 'var(--primary-color)';
            clearInterval(home.interval[i]);
        } else home.update_timer(i, sector);
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
