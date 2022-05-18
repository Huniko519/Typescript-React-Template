function onSubmitClick(e){
    e.preventDefault();
    console.log("HERE");
    let btn = e.target;
    let spinner = btn.firstElementChild;
    
    btn.disabled = true;
    spinner.hidden = false;

    let form = $("form");

    var xhr  = new XMLHttpRequest();
    var data = new FormData(form);

    xhr.onload = function() {
        console.log(this);
        btn.disabled = false;
        spinner.hidden = true;
        form.reset();

        if(this.status != 200){
            let text = this.responseText;
            $('error').innerHTML = text;
            $('error').style.display = 'flex';
            setTimeout(() => {
                $('error').style.display = 'none';
            }, 10000);
        
            return;
        }
        else {
            let text = this.responseText;
            $('success').innerHTML = text;
            $('success').style.display = 'flex';
            setTimeout(() => {
                $('success').style.display = 'none';
            }, 10000);
        
            return;
        }
    }

    xhr.open("post", form.action);
    xhr.send(data);      
}

$('submitBtn').addEventListener('click', onSubmitClick);
