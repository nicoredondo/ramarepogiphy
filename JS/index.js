document.addEventListener('DOMContentLoaded', init);

function init() {

    //Cambio de estilos

    const body = document.querySelector('body');

    document.getElementById('day').addEventListener('click', () => {
        const body = document.querySelector('body');
        body.classList.add('light');
        body.classList.remove('dark');
        localStorage.setItem('color-theme', 'light-mode');

    })

    document.getElementById('night').addEventListener('click', () => {
        const body = document.querySelector('body');
        body.classList.add('dark');
        body.classList.remove('light');
        localStorage.setItem('color-theme', 'dark-mode');



    })

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


    const menu_container = document.getElementById("menu_theme");
    const menu_estilos = document.querySelector('.menu_estilos');

    document.getElementById("toggle_menu").addEventListener('click', () => {
        menu_container.style.display = 'block';
        menu_estilos.style.display = 'block';
        menu_container.className = menu_container.className == "display_on" ? "display_off" : "display_on";
    });
    document.getElementById("elegir").addEventListener('click', () => {
        menu_container.style.display = 'block';
        menu_estilos.style.display = 'block';
        menu_container.className = menu_container.className == "display_on" ? "display_off" : "display_on";
    });




}