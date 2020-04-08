//Api key y endpoint para subir el gif
const api_url = 'https://api.giphy.com/v1/gifs'
const api_key = 'cSZTiYeFOF3fqIBzWZbkF8W2514t8iSq'
const endpoints = {
    upload: `https://upload.giphy.com/v1/gifs?api_key=${api_key}`
}

const getData = async endpoint => {
    try {
        const res = await fetch(endpoint)
        const data = await res.json()
        return data.data
    } catch (error) {
        console.log(error)
    }
}

const source = (imgId, gifId) => {
    document.getElementById(imgId).src = 'https://i.giphy.com/media/' + gifId + '/giphy.webp'
}

const getId = async(endpoint, imgId) => {
    try {
        const res = await fetch(endpoint)
        const data = await res.json()
        return source(imgId, data.data.id)
    } catch (error) {
        console.log(error)
    }
}
a.addEventListener("click", async() => {
    let blob = await recorder.getBlob();
    const blobUrl = URL.createObjectURL(blob);
    a.setAttribute("href", blobUrl);
});