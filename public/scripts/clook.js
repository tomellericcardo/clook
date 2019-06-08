var clook = {

    init: function() {
        clook.init_clook();
        clook.init_startNstop();
        clook.init_delete();
    },

    init_clook: function() {
        if (clookInfo.started) {
            document.querySelector('#start-and-stop i').innerHTML = 'stop';
            var started = new Date(clookInfo.started);
            clook.interval = setInterval(function() {
                var elapsed = Date.now() - started;
                var sector = (elapsed * 100) / clookInfo.duration;
                if (sector >= 100) {
                    document.querySelector('.timer').style.background = 'var(--primary-color)';
                    document.querySelector('#start-and-stop i').innerHTML = 'refresh';
                    clearInterval(clook.interval);
                } else clook.update_timer(sector);
            }, 1000);
        } else {
            document.querySelector('#start-and-stop i').innerHTML = 'play_arrow';
            document.querySelector('.timer').style.background = 'var(--clook-color)';
        }
    },

    update_timer: function(sector) {
        var background = 'conic-gradient(';
        background += 'var(--primary-color) ' + sector + '%, ';
        background += 'var(--clook-color) ' + (sector + .2) + '%)';
        document.querySelector('.timer').style.background = background;
    },

    init_startNstop: function() {
        document.querySelector('#start-and-stop').addEventListener('click', function() {
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
            } else message.error(res.message);
        });
    },

    init_delete: function() {
        document.querySelector('#delete').addEventListener('click', function() {
            ajax.request('DELETE', '/clook', {
                clookId: clookInfo.id
            }, function(res) {
                if (res.status == 'success')
                    window.location.href = '/clooks';
                else message.error(res.message);
            });
        });
    }

};


document.addEventListener('DOMContentLoaded', clook.init());
