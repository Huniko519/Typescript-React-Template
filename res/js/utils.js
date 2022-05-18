var $ = (id) => document.getElementById(id);
const S = (e) => document.querySelector(e);
const SA = (e) => document.querySelectorAll(e);


async function Fetch(url, body, notify){
    let res;

    if(body){
        res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    }
    else
        res = await fetch(url);

    if(res.status != 200){
        let text = await res.text();
        $('error').innerHTML = text;
        $('error').style.display = 'flex';
        setTimeout(() => {
            $('error').style.display = 'none';
        }, 10000);
    
        return;
    }
    else if(notify){
        let text = await res.text();
        $('success').innerHTML = text;
        $('success').style.display = 'flex';
        setTimeout(() => {
            $('success').style.display = 'none';
        }, 10000);
    
        return;
    }

    return res;
}

function Logout(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    location.href = "/login";
}

function Toggle(id){
    let elems = document.getElementsByClassName('nodisplay');

    for(let elem of elems)
        elem.style.display = 'none';

    document.getElementById(id).style.display = 'flex';
}