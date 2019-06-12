// Sidebar element
var sidebar = {

    // Initialization
    init: function() {
        sidebar.init_open();
        sidebar.init_close();
    },

    // Open sidebar button initialization
    init_open: function() {
        document.querySelector('#open-sidebar').addEventListener('click', function() {
            document.querySelector('#close-sidebar').style.display = 'block';
            document.querySelector('#sidebar').style.display = 'block';
        });
    },
    
    // Close sidebar button initialization
    init_close: function() {
        document.querySelector('#close-sidebar').addEventListener('click', function() {
            document.querySelector('#close-sidebar').style.display = 'none';
            document.querySelector('#sidebar').style.display = 'none';
        });
    }

};


// Initialize when page is ready
document.addEventListener('DOMContentLoaded', sidebar.init());
