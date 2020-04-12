document.addEventListener("DOMContentLoaded", init);


function init() {


    //Carga los gifs de tendencias
    getGifs()

    const bloque_resultados = document.querySelector('#div_resultados')
    const container = document.getElementById("tendencias_container")
    const button_sugerido_uno = document.getElementById('button_sugerido')
    const button_sugerido_dos = document.getElementById('button_resultado')
    const button_sugerido_tres = document.getElementById('button_otro_mas')
    const button_ver_mas1 = document.getElementById('sugerencia1');
    const button_ver_mas2 = document.getElementById('sugerencia2');
    const button_ver_mas3 = document.getElementById('sugerencia3');
    const button_ver_mas4 = document.getElementById('sugerencia4');

    //Barra de resultados sugeridos
    const buscar_search = document.getElementById("buscador_button")

    buscar_search.addEventListener("click", ev => {
        ev.preventDefault();
        let str = document.getElementById("buscador_input").value.trim();
        getGifs(str);

        bloque_resultados.style.display = 'block'

    })





    document.getElementById("buscador_input").addEventListener("keydown", () => {
        bloque_resultados.style.display = 'none'
    })
    document.getElementById("buscador_input").addEventListener("click", () => {
        bloque_resultados.style.display = 'none'
    })



    document.getElementById("buscador_input").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            buscar_search.click();
        }
    });

    function renderGif(gif) {


        let fig = document.createElement('div')
        let img = document.createElement('img')
        let fc = document.createElement('figcaption')
        img.setAttribute("width", "270 ")
        img.setAttribute("height", "270")
        img.src = gif.images.downsized.url
        img.alt = gif.title
        fig.appendChild(img)
        fig.appendChild(fc)
        container.appendChild(fig)




    }

    //Funciones de resultados sugeridos
    button_sugerido_uno.addEventListener('click', () => {

        url = `https://api.giphy.com/v1/gifs/search?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12&q=`
        url += 'alf';

        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data)
                console.log("META", content.meta)

                container.innerHTML = ''
                content.data.forEach(gif => {


                    renderGif(gif)


                });

            })
            .catch(err => {
                console.error(err);
            });



    })
    button_sugerido_dos.addEventListener('click', () => {

        url = `https://api.giphy.com/v1/gifs/search?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12&q=`
        url += 'travel';

        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data)
                console.log("META", content.meta)

                container.innerHTML = ''
                content.data.forEach(gif => {


                    renderGif(gif)


                });

            })
            .catch(err => {
                console.error(err);
            });



    })
    button_sugerido_tres.addEventListener('click', () => {
            url = `https://api.giphy.com/v1/gifs/search?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12&q=`
            url += 'britney';
            fetch(url)
                .then(response => response.json())
                .then(content => {
                    console.log(content.data)
                    console.log("META", content.meta)
                    container.innerHTML = ''
                    content.data.forEach(gif => {
                        renderGif(gif)
                    });

                })
                .catch(err => {
                    console.error(err);
                });
        })
        //Botones de "Ver Mas"
    button_ver_mas1.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=jQmZwNc6XsyPUyqJJFszYdc6sKP8JKaG&limit=12&q=`
        url += 'thebigbangtheory';
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data)
                console.log("META", content.meta)
                container.innerHTML = ''
                content.data.forEach(gif => {
                    renderGif(gif)
                });

            })
            .catch(err => {
                console.error(err);
            });
    })
    button_ver_mas2.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12&q=`
        url += 'messi';
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data)
                console.log("META", content.meta)
                container.innerHTML = ''
                content.data.forEach(gif => {
                    renderGif(gif)
                });

            })
            .catch(err => {
                console.error(err);
            });
    })
    button_ver_mas3.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12&q=`
        url += 'tigerwoods';
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data)
                console.log("META", content.meta)
                container.innerHTML = ''
                content.data.forEach(gif => {
                    renderGif(gif)
                });

            })
            .catch(err => {
                console.error(err);
            });
    })
    button_ver_mas4.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12&q=`
        url += 'friends';
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data)
                console.log("META", content.meta)
                container.innerHTML = ''
                content.data.forEach(gif => {
                    renderGif(gif)
                });

            })
            .catch(err => {
                console.error(err);
            });
    })

    //Funcion de tendencias o búsquedas 

    function getGifs(str) {
        let url = '';


        if (str) {


            url = `https://api.giphy.com/v1/gifs/search?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12&q=`
            url += str;


        } else {
            // reemplaza con url ramdon
            url = `https://api.giphy.com/v1/gifs/trending?api_key=MOE8e6uGerdha1qiDoKZUG8d26VfSZc8&limit=12`;
        }
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data)
                console.log("META", content.meta)

                container.innerHTML = ''
                content.data.forEach(gif => {


                    renderGif(gif)


                });

                document.querySelector("#buscador_input").value = ""

            })
            .catch(err => {
                console.error(err);
            });




    }





}