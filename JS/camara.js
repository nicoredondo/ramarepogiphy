document.addEventListener("DOMContentLoaded", async() => {
    const crear_container = document.querySelector("#container_crear");
    const button_capture = document.getElementById("capturar_button");
    const button_capture_img = document.getElementById("img_cam_logo");
    const video_container = document.getElementById("captura_container");
    const button_ready = document.getElementById("capturar_button_2");
    const button_ready_img = document.getElementById("img_rec_logo");
    const button_repeat = document.getElementById("repetir");
    const button_upload = document.getElementById("subir");
    const buttons_capture = document.querySelector(".buttonsx2");
    const cronometro = document.getElementById("cronometro");
    const container_img_info = document.getElementById("container_video");
    const img = document.createElement("img");
    const pop_up3 = document.getElementById("subiendo_gif");
    const instrucciones = document.getElementById("instrucciones");
    const button_comenzar = document.getElementById("comenzar_button");
    const last_container = document.getElementById('ultimo_paso');
    const guifo_creado = document.getElementsByClassName('crear_guifos_3');
    const loading_bar = document.querySelector('.barra_carga');
    const forward = document.querySelector('.forward');
    const cronometro2 = document.querySelector('.cronometro2');




    let recorder = null;
    let blob = null;

    //ocultar los botones y divs al comienzo

    crear_container.style.display = "none";
    button_ready.style.display = "none";
    button_ready_img.style.display = "none";
    buttons_capture.style.display = "none";
    cronometro.style.display = "none";
    pop_up3.style.display = "none";
    instrucciones.style.display = "block";
    loading_bar.style.display = 'none'
    forward.style.display = 'none'

    //Botón para comenzar a grabar

    button_comenzar.addEventListener("click", async() => {
        instrucciones.style.display = "none";
        crear_container.style.display = "block";
        cronometro2.style.display = 'none'




    });
    //Botón para comenzar a grabar

    button_capture.addEventListener("click", async() => {
        button_ready.style.display = "block";
        button_ready_img.style.display = "block";
        button_capture.style.display = "none";
        button_capture_img.style.display = "none";
        cronometro.style.display = "block";



        recorder = await startRecord(recorder, video_container);
    });

    //Botón de "Listo" para poder obtener el video

    button_ready.addEventListener("click", async() => {
        await stopRecord(recorder, video_container);
        img.style.display = "block";
        loading_bar.style.display = 'block';
        forward.style.display = 'block';
        cronometro2.style.display = 'block';


    });
    //Botón para repetir la captura

    button_repeat.addEventListener("click", async() => {
        buttons_capture.style.display = "none";
        button_ready.style.display = "block";
        button_ready_img.style.display = "block";
        img.src = URL.revokeObjectURL(blob);
        video_container.style.display = "block";
        img.style.display = "none";
        cronometro.style.display = "block";
        loading_bar.style.display = 'none';
        forward.style.display = 'none';
        recorder = await startRecord(recorder, video_container);
    });

    //Renderizado de los gifs obtenidos por la camara y ponerlos en el container

    const renderMyGifs = gifs => {
        let container = document.querySelector("#mis_guifos_container");

        if (Array.isArray(gifs)) {
            for (let gif of gifs) {
                let img = document.createElement("img");
                img.setAttribute("width", "270");
                img.setAttribute("height", "270");
                img.src = gif.images.downsized.url;
                img.alt = gif.title;
                container.appendChild(img);
            }
        } else {
            let img = document.createElement("img");
            img.setAttribute("width", "270");
            img.setAttribute("height", "270");
            img.src = gifs.images.downsized.url;
            img.alt = gifs.title;
            container.appendChild(img);
        }
    };

    //Muestra mis gifos grabados

    const myGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
    localStorage.setItem("myGifs", JSON.stringify(myGifs));
    const gifs = await getData(`${api_url}?api_key=${api_key}&ids=${myGifs}`);
    renderMyGifs(gifs);

    //Botón para Subir el gif-Para que aparezca la ventana de espera

    button_upload.addEventListener("click", async() => {
        pop_up3.style.display = "block";
        buttons_capture.style.display = "none";
        crear_container.style.display = "none";
        let blob = await recorder.getBlob();
        let response = await sendGif(blob);
        const gif = await getData(`${api_url}/${response.id}?api_key=${api_key}`);
        renderLastGif(gif);
        pop_up3.style.display = "none";
        last_container.style.display = "block";
        guifo_creado.stye.display = 'block';



    });

    //Inicio para mostrar la cámara

    const getMedia = async() => {
        let stream = null;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    height: { max: 480 }
                },
                audio: false
            });
            return stream;
        } catch (err) {
            console.log("No se puede acceder a la cámara");
        }
    };

    //Funcion para grabar

    const startRecord = async(recorder, container) => {
        let stream = await getMedia();
        container.srcObject = stream;
        container.play();
        recorder = new RecordRTCPromisesHandler(stream, {
            type: "gif",
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                document.querySelector(".crear_titulo_2").innerHTML =
                    "Capturando tu guifo";
            }
        });
        recorder.startRecording();
        return recorder;
    };

    //Función dejar de grabar

    const stopRecord = async(recorder, container) => {
        button_ready.style.display = "none";
        button_ready_img.style.display = "none";
        buttons_capture.style.display = "block";
        cronometro.style.display = "none";
        document.querySelector(".crear_titulo_2").innerHTML = "Vista previa";
        container.pause();
        container.srcObject = null;

        await recorder.stopRecording();
        let blob = await recorder.getBlob();
        preview(blob);
        return blob;
    };
    const upload = async(endpoints, body) => {
        try {
            const res = await fetch(endpoints, {
                method: "POST",
                mode: "cors",
                body: body
            });
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };
    //Botón de copiar link
    const copy_paste = document.querySelector('.button_copy')

    copy_paste.addEventListener("click", async() => {
        let input = document.createElement("input");
        let blob = await recorder.getBlob();
        const blobUrl = URL.createObjectURL(blob);
        input.setAttribute("value", blobUrl);
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);


    });
    const sendGif = async blob => {
        const form = new FormData();
        form.append("file", blob, "myGifs.gif");
        console.log(form.get("file"));
        const response = await upload(endpoints.upload, form);
        const actualGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
        console.log(actualGifs);
        const newGifs = [...actualGifs, response.id];
        console.log(newGifs);
        localStorage.setItem("myGifs", JSON.stringify(newGifs));
        const gif = await getData(`${api_url}?api_key=${api_key}&ids=${newGifs}`);
        renderMyGifs(gif);
        return response;
    };

    const preview = blob => {
        video_container.style.display = "none";
        img.src = URL.createObjectURL(blob);
        img.setAttribute("width", "832");
        img.setAttribute("height", "434");
        container_img_info.appendChild(img);

    };
    //Mostrar y renderizar el último gif
    const renderLastGif = gif => {
        let container = document.querySelector("#gifoOk");
        let img = document.createElement("img");
        img.setAttribute("width", "365");
        img.setAttribute("height", "191");
        img.setAttribute("style", "opacity: 0.3");
        img.src = gif.images.downsized.url;
        img.alt = gif.title;
        container.appendChild(img);
    };

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







});