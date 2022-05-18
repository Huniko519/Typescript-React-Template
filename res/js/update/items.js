
async function spawnItems(){
    let itemsContainer = $("itemsContainer");

    var xhr  = new XMLHttpRequest();

    xhr.onload = function(){
        let data = JSON.parse(this.responseText);

        if(data.length == 0){
            $("empty").hidden = false;
            $("downloadCSV").hidden = true;

            let text = "No items found....";
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

    xhr.open("get", '/api/private/gets/getMyItems');
    xhr.send('');
}

function generateItem(data, parent){
    let card = document.createElement('div');
    card.className = 'card ml-2';
    card.style = "width:18rem;";

    let textures = data.gameData.textures;

    let img = document.createElement('img');
    img.src = textures["previewImg"] ? textures["previewImg"].location : "/img/cube.png";
    img.className = "card-img-top w-100";

    let cardBody = document.createElement('div');
    cardBody.className = "card-body";

    let cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerHTML = data.name;

    let cardText = document.createElement('p');
    cardText.innerHTML = "CreatorID: " + data.user + "<br>Creation date: " + new Date(data.creationDate).toDateString() +"<br>Description: " + data.description;

    let container = document.createElement('div');
    container.classList = "container";

    for(let item in textures)
    {
        if(item == "previewImg")
            continue;

        let row = document.createElement('div');
        row.classList = "row-cols-1 ";

        let cardDownload = document.createElement('a');
        cardDownload.classList = "btn btn-primary col-md mb-1";
        cardDownload.innerHTML = "Download " + item;
        cardDownload.href = textures[item].path;
        cardDownload.download = item;
        cardDownload.target = "_blank"; //Check with S3 first....

        row.appendChild(cardDownload);
        container.appendChild(row);
    }

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(container);

    card.appendChild(img);
    card.appendChild(cardBody);

    parent.appendChild(card);
}

function onDownloadCSV(){
    var xhr  = new XMLHttpRequest();

    xhr.onload = function(){
        let json  = JSON.parse(this.responseText);

        const items = json;
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(items[0])
        const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n')

        var encodedUri = encodeURIComponent(csv);
        var link = document.createElement("a");
        link.setAttribute("href", "data:attachment/csv," + encodedUri)
        link.setAttribute("download", "items.csv");
        link.setAttribute("target", "_blank");
        document.body.appendChild(link); // Required for FF

        link.click();
        
        setTimeout(() => {
            link.remove();
        }, 20000);
    }

    xhr.open("get", '/api/private/gets/getCSVData');
    xhr.send('');
}

$("downloadCSV").addEventListener('click', onDownloadCSV);

spawnItems();