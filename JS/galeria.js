document.addEventListener("DOMContentLoaded", async() => {

    const api_url = 'https://api.giphy.com/v1/gifs'
    const api_key = 'jQmZwNc6XsyPUyqJJFszYdc6sKP8JKaG'
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

    const body = document.querySelector('body')
    const bodyclass = localStorage.getItem('color-theme')

    let activateThemes = (bodyclass) => {

        if (bodyclass == 'dark-mode') {
            body.classList.add("dark");
            body.classList.remove("light");
        } else if (bodyclass == 'light-mode') {
            body.classList.add("light");
            body.classList.remove("dark");
        } else {
            body.classList.add('light')
        }
    }

    activateThemes(bodyclass)

    document.getElementById('night').addEventListener("click", () => {
        const body = document.querySelector("body");
        body.classList.add("dark");
        body.classList.remove("light");
        localStorage.setItem('color-theme', 'dark-mode')
    });

    document.getElementById('day').addEventListener("click", () => {
        const body = document.querySelector("body");
        body.classList.add("light");
        body.classList.remove("dark");
        localStorage.setItem('color-theme', 'light-mode')
    });

    const renderMyGifs = gifs => {
        let $container = document.querySelector("#mis_guifos_container");

        if (Array.isArray(gifs)) {
            for (let gif of gifs) {
                let img = document.createElement("img");
                img.setAttribute("width", "280");
                img.setAttribute("height", "296");
                img.setAttribute("style", "margin: 15px 15px 15px 50px");
                img.src = gif.images.downsized.url;
                img.alt = gif.title;
                $container.appendChild(img);
            }
        } else {
            let img = document.createElement("img");
            img.setAttribute("width", "280");
            img.setAttribute("height", "296");
            img.setAttribute("style", "margin: 15px 15px 15px 50px");
            img.src = gifs.images.downsized.url;
            img.alt = gifs.title;
            $container.appendChild(img);
        }
    };


    const myGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
    localStorage.setItem("myGifs", JSON.stringify(myGifs));
    const gifs = await getData(`${api_url}?api_key=${api_key}&ids=${myGifs}`);
    renderMyGifs(gifs);

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

    const renderGifs = (gifs) => {
        let $container = document.getElementById("search_container")
        $container.innerHTML = ''

        for (let gif of gifs) {
            let div = document.createElement('div')
            let img = document.createElement('img')
            let fc = document.createElement('figcaption')

            img.setAttribute("width", "286")
            img.setAttribute("height", "296")
            img.setAttribute("style", "margin: 15px 14px")
            img.src = gif.images.downsized.url
            img.alt = gif.title

            div.appendChild(img)
            div.appendChild(fc)
            $container.appendChild(div)
        }
    }




})