var clook = {

    init: function() {
        clook.init_clook();
        clook.init_startNstop();
        clook.init_delete();
    },

    init_clook: function() {
        if (clookInfo.started) {
            document.querySelector('.start-and-stop i').innerHTML = 'stop';
            clook.run_clook();
            clook.interval = setInterval(clook.run_clook, 1000);
        } else {
            document.querySelector('.start-and-stop i').innerHTML = 'play_arrow';
            document.querySelector('.timer').style.background = clookInfo.color;
            document.querySelector('#duration').innerHTML = clook.format_duration(clookInfo.duration);
            document.querySelector('#elapsed').innerHTML = '00h 00m';
            document.querySelector('#sector').innerHTML = 0;
        }
    },

    run_clook: function() {
        var started = new Date(clookInfo.started);
        var elapsed = Date.now() - started;
        var sector = (elapsed * 100) / clookInfo.duration;
        document.querySelector('#duration').innerHTML = clook.format_duration(clookInfo.duration);
        document.querySelector('#elapsed').innerHTML = clook.format_elapsed(elapsed);
        document.querySelector('#sector').innerHTML = Math.floor(sector);
        if (sector >= 100) {
            document.querySelector('.timer').style.background = 'var(--primary-color)';
            document.querySelector('.start-and-stop i').innerHTML = 'refresh';
            document.querySelector('#duration').innerHTML = clook.format_duration(clookInfo.duration);
            document.querySelector('#elapsed').innerHTML = clook.format_duration(clookInfo.duration);
            document.querySelector('#sector').innerHTML = 100;
            clearInterval(clook.interval);
        } else clook.update_timer(sector);
    },

    format_duration: function(time) {
        time = Math.floor(time / 1000);
        var hours   = Math.floor(time / 3600);
        var minutes = Math.floor((time - (hours * 3600)) / 60);
        if (minutes < 10) minutes = '0' + minutes;
        return hours + 'h ' + minutes + 'm';
    },

    format_elapsed: function(time) {
        time = Math.floor(time / 1000);
        var hours   = Math.floor(time / 3600);
        var minutes = Math.floor((time - (hours * 3600)) / 60);
        var seconds = time - (hours * 3600) - (minutes * 60);
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        return hours + 'h ' + minutes + 'm ' + seconds + 's';
    },

    update_timer: function(sector) {
        var background = 'conic-gradient(';
        background += 'var(--primary-color) ' + sector + '%, ';
        background += clookInfo.color + ' ' + (sector + .2) + '%)';
        document.querySelector('.timer').style.background = background;
    },

    init_startNstop: function() {
        document.querySelector('.start-and-stop').addEventListener('click', function() {
            if (clookInfo.started) clookInfo.started = undefined;
            else clookInfo.started = Date.now();
            clook.update_clook();
        });
    },

    update_clook: function() {
        ajax.request('PUT', '/clook', {
            clookId: clookInfo.id,
            started: clookInfo.started
        }, function(res) {
            if (res.status == 'success') {
                if (clook.interval) clearInterval(clook.interval);
                clook.init_clook();
            } else document.querySelector('#error').innerHTML = res.message;
        });
    },

    init_delete: function() {
        document.querySelector('.delete').addEventListener('click', function() {
            ajax.request('DELETE', '/clook', {
                clookId: clookInfo.id
            }, function(res) {
                if (res.status == 'success')
                    window.location.href = '/';
                else document.querySelector('#error').innerHTML = res.message;
            });
        });
    }

};


document.addEventListener('DOMContentLoaded', clook.init());
