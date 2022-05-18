function onSubmitClick(e){
    e.preventDefault();
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

function onFileInputChange(e){
    var fileName = e.target.files[0].name;
    var nextSibling = e.target.nextElementSibling

    nextSibling.innerText = fileName;
}

function updateMeshList(e){
    let model = $('model');

    model.innerHTML = "";

    var xhr  = new XMLHttpRequest();

    xhr.onload = function(){
        let data = JSON.parse(this.responseText);

        if(data.length == 0){
            $("empty").hidden = false;
            $('formRoot').hidden = true;

            let text = "No models found....";
            $('error').innerHTML = text;
            $('error').style.display = 'flex';
            setTimeout(() => {
                $('error').style.display = 'none';
            }, 10000);
        }

        for(let i = 0; i < data.length; i++){
            let option = document.createElement('option');
            option.value = data[i]._id;
            option.innerText = data[i].name;
            model.appendChild(option);
        }
    }

    xhr.open("get", '/api/private/gets/getMyModels');
    xhr.send('');
}

SA('.custom-file-input').forEach((elem)=>{
    let label = elem.nextElementSibling;
    let copy = label.cloneNode(true);
    copy.hidden = true;
    
    elem.parentNode.appendChild(copy);
    elem.addEventListener('change',onFileInputChange);
});

$('submitBtn').addEventListener('click', onSubmitClick);

$('form').onreset = (e)=>{
    SA('.custom-file-input').forEach((elem)=>{
        var nextSibling = elem.nextElementSibling
        let last = elem.parentNode.lastChild;

        nextSibling.innerHTML = last.innerHTML;
    });
}
updateMeshList();