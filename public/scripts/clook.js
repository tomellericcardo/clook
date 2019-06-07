var clook = {

    init: function() {
        clook.init_clook();
        clook.init_delete();
    },

    init_clook: function() {
        clookInfo.started = Date.now();
        var elapsed, sector, background;
        var timer = document.querySelector('.timer');
        var interval = setInterval(function() {
            elapsed = Date.now() - clookInfo.started;
            sector = (elapsed * 100) / clookInfo.duration;
            if (sector >= 100) {
                timer.style.background = 'var(--primary-color)';
                clearInterval(interval);
            } else {
                background = 'conic-gradient(';
                background += 'var(--primary-color) ' + sector + '%, ';
                background += clookInfo.color ? clookInfo.color : 'var(--clook-color)';
                background += ' ' + (sector + .2) + '%)';
                timer.style.background = background;
            }
        }, 1000);
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
