var sidebar = {

    init: function() {
        sidebar.init_open();
        sidebar.init_close();
    },

    init_open: function() {
        document.querySelector('#open-sidebar').addEventListener('click', function() {
            document.querySelector('#close-sidebar').style.display = 'block';
            document.querySelector('#sidebar').style.display = 'block';
        });
    },

    init_close: function() {
        document.querySelector('#close-sidebar').addEventListener('click', function() {
            document.querySelector('#close-sidebar').style.display = 'none';
            document.querySelector('#sidebar').style.display = 'none';
        });
    }

};


document.addEventListener('DOMContentLoaded', sidebar.init());
