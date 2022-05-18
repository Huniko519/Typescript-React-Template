
async function spawnItems(){
    let itemsContainer = $("itemsContainer");

    var xhr  = new XMLHttpRequest();

    let that = this;

    xhr.onload = function(){
        let data = JSON.parse(this.responseText);

        if(data.length == 0){
            $("empty").hidden = false;

            let text = "No models found....";
            $('error').innerHTML = text;
            $('error').style.display = 'flex';
            setTimeout(() => {
                $('error').style.display = 'none';
            }, 10000);
        }

        for(let i = 0; i < data.length; i++){
            generateItem(data[i], itemsContainer);
        }
    }

    xhr.open("get", '/api/private/gets/getMyModels');
    xhr.send('');
}

function generateItem(data, parent){
    let card = document.createElement('div');
    card.className = "card ml-2";
    card.style = "width:18rem;";

    let img = document.createElement('img');
    img.src = "/img/cube.png";
    img.className = "card-img-top w-100";

    let cardBody = document.createElement('div');
    cardBody.className = "card-body";

    let cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerHTML = data.name;

    let cardText = document.createElement('p');
    cardText.innerHTML = "CreatorID: " + data.user + "<br>Creation date: " + new Date(data.createdTime).toDateString() +"<br>Model type: " + data.type + "<br>Model character: " + data.character;

    let cardDownload = document.createElement('a');
    cardDownload.classList = "btn btn-primary col-md mb-1";
    cardDownload.innerHTML = "Download Model";
    cardDownload.href = data.path;
    cardDownload.download = data.name;
    cardDownload.target = "_blank"; //Check with S3 first....

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardDownload);

    card.appendChild(img);
    card.appendChild(cardBody);

    parent.appendChild(card);
}

spawnItems();
