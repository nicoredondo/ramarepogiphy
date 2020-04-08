//Primeros 4 resultados predeterminados
function setFourResults(imageid, gifid) {
    document.getElementById(imageid).src = 'https://i.giphy.com/media/' + gifid + '/giphy.webp'
}

function giveFourGif(tag, imageid) {
    fetch('https://api.giphy.com/v1/gifs/random?api_key=cSZTiYeFOF3fqIBzWZbkF8W2514t8iSq&tag=' + tag)
        .then((response) => {
            return response.json()
        }).then((json) => {
            console.log(json);
            setFourResults(imageid, json.data.id)

        })
}

giveFourGif('thebigbangtheory', 'gify1')
giveFourGif('messi', 'gify2')
giveFourGif('tigerwoods', 'gify3')
giveFourGif('friends', 'gify4')