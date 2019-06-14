// Ajax request
function ajax(method, url, data, callback, element) {
    if (element.classList.contains('disabled')) return;
    var req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            element.classList.remove('disabled');
            callback(JSON.parse(req.responseText));
        }
    };
    element.classList.add('disabled');
    req.send(JSON.stringify(data));
}

// Field check
function filled(value) {
    return !(value == '' || value == null);
}
