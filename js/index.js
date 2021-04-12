const createElement = (tag, name, value) => {
    let element = document.createElement(tag);
    if (name != null) {
        element.classList.add(name);
    }
    if (value != null) {
        element.append(value);
    }
    return element;
}

const getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
 
const index  = (url, id) =>{
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let parent = document.getElementById(id);
            let fragment = new DocumentFragment();
            for(let info of datos){
                let h1 = createElement("H1", "yadir-title", `${info.titulo} - ${info.categoria} - ${info.fecha}`);
                let linkh1 = createElement("A", "yadir-link-title", h1);
                linkh1.setAttribute("href", `notice.html?id=${info.id}`)
                let div = createElement("DIV", "yadir-container-index", linkh1);
                let des = createElement("P", null, info.descripcion);
                let det = createElement("P", "yadir-close", info.detalle);
                let link = createElement("A", null, "Ver mas");
                div.append(des);
                des.append(link);
                div.append(det);
                fragment.append(div);

                link.addEventListener('click', () =>{
                    det.classList.toggle("yadir-close");
                    /*if(det.classList.contains("yadir-close")){
                        link.append("Ver mas");
                    }else{
                        link.text()
                    }*/
                });
            }
            parent.append(fragment);
        }
    }
}

const indexGeneric  = (url, id) =>{
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let parent = document.getElementById(id);
            let fragment = new DocumentFragment();
            for(let info of datos){
                let des = createElement("P", null, info.titulo);
                let div = createElement("DIV", null, des);
                fragment.append(div);
            }
            parent.append(fragment);
        }
    }
}


const indexGenericDinamic  = (url, id) =>{
    let getUrlValue = getParameterByName("id");
    url = `${url}/${getUrlValue}`;
    console.log(url);
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText);
            let parent = document.getElementById(id);
            let fragment = new DocumentFragment();
            let h1 = createElement("H1", "yadir-title", `${info.titulo} - ${info.categoria} - ${info.fecha}`);
            let div = createElement("DIV", "yadir-container-index", h1);
            let des = createElement("P", null, info.descripcion);
            let det = createElement("P", null, info.detalle);
            let link = createElement("A", null, "Ver mas");
            div.append(des);
            des.append(link);
            div.append(det);
            fragment.append(div);
            parent.append(fragment);
        }
    }
}

const indexHours = (id) => {
    let parent = document.getElementById(id);
    let date = new Date();
    parent.append(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
}


