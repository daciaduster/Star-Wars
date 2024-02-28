"use strict";

let statsDiv;

function inicio() {
    let h1 = $("<h1>").text("Seleccione un personaje:");

    let contenedorImagenes = $("<div>").attr("id", "imagenes");

    let personajes = [
        { nombre: "Chewbacca", srcImagen: "../imagen/1.jpeg", jsonUrl: "https://swapi.dev/api/people/13/", urlPlaneta: "https://swapi.dev/api/planets/14/"},
        { nombre: "Darth Vader", srcImagen: "../imagen/2.jpeg", jsonUrl: "https://swapi.dev/api/people/4/", urlPlaneta: "https://swapi.dev/api/planets/1/"},
        { nombre: "R2-D2", srcImagen: "../imagen/3.jpeg", jsonUrl: "https://swapi.dev/api/people/3/", urlPlaneta: "https://swapi.dev/api/planets/8/"},
        { nombre: "C-3PO", srcImagen: "../imagen/4.jpeg", jsonUrl: "https://swapi.dev/api/people/2/", urlPlaneta: "https://swapi.dev/api/planets/1/"},
        { nombre: "Yoda", srcImagen: "../imagen/5.jpeg", jsonUrl: "https://swapi.dev/api/people/20/", urlPlaneta: "https://swapi.dev/api/planets/28/"}
    ]; 

    let contador = 1; 

    personajes.forEach((personaje, indice) => { 
        let divImagen = $("<div>").addClass("imagen").attr("id", "img" + contador); 
        contador++;

        let parrafoNombre = $("<p>").text(personaje.nombre).addClass("nombre"); 

        let imagenPersonaje = $("<img>").attr({ 
            src: personaje.srcImagen,
            alt: "imagen"
        });

        divImagen.append(parrafoNombre, imagenPersonaje); 

        contenedorImagenes.append(divImagen); 

        divImagen.on("click", function() { 
            obtenerEstadisticas(personaje.jsonUrl, divImagen, personaje.urlPlaneta);
        });

        let angulo = ((indice - (personajes.length - 1) / 2) * 15); 
        divImagen.css({
            transform: "rotate(" + angulo + "deg)",
            bottom: "10px",
            zIndex: indice
        });

        divImagen.on("mouseenter", function() { 
            $(this).css("transform", "scale(1.2) rotate(" + angulo + "deg)");
        });

        divImagen.on("mouseleave", function() { 
            $(this).css("transform", "scale(1) rotate(" + angulo + "deg)");
        });
    });

    $("body").append(h1, contenedorImagenes); 
}

function obtenerEstadisticas(jsonUrl, divImagen, urlPlaneta) {
    $.ajax({ 
        url: jsonUrl,
        method: "GET",
        success: function(respuesta) { 
            mostrarEstadisticas(respuesta, divImagen, urlPlaneta); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener estadísticas:", errorThrown);
        }
    });
}

function mostrarEstadisticas(data, imgDiv, planetaURL) {
    if (statsDiv) {
        statsDiv.remove(); 
    }

    statsDiv = $("<div>").addClass("estadisticas"); 
    statsDiv.append( 
        $("<h1>").addClass("estadistica").text("Estadisticas generales de " + data.name),
        $("<hr>"),
        $("<p>").addClass("estadistica").text("Nombre: " + data.name),
        $("<p>").addClass("estadistica").text("Altura: " + data.height + " cm"),
        $("<p>").addClass("estadistica").text("Peso: " + data.mass + " kg"),
        $("<p>").addClass("estadistica").text("Color de pelo: " + data.hair_color),
        $("<p>").addClass("estadistica").text("Color de piel: " + data.skin_color),
        $("<p>").addClass("estadistica").text("Color de ojos: " + data.eye_color),
        $("<p>").addClass("estadistica").text("Año de nacimiento: " + data.birth_year),
        $("<p>").addClass("estadistica").text("Género: " + data.gender)
    );

    $.ajax({
        url: planetaURL,
        method: "GET",
        success: function(planetResponse) {
            statsDiv.append(
                $("<p>").addClass("estadistica").text("Planeta: " + planetResponse.name)
            );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener detalles del planeta:", errorThrown);
        }
    });

    imgDiv.after(statsDiv); 
}

window.onload = inicio;