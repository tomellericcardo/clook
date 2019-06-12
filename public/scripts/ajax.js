// Ajax request
function ajax(method, url, data, callback, loading_element = false) {
    var req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            if (loading_element) stop_loading(req, loading_element);
            callback(JSON.parse(req.responseText));
        }
    };
    if (loading_element) start_loading(req, loading_element);
    req.send(JSON.stringify(data));
}

// Start loading animation
function start_loading(req, element) {
    req.loading = {};
    req.loading.original = element.innerHTML;
    element.innerHTML = '<i class="material-icons w3-spin">refresh</i> Loading';
}

// Stop loading animation
function stop_loading(req, element) {
    element.innerHTML = req.loading.original;
}

// Field check
function filled(value) {
    return !(value == '' || value == null);
}
