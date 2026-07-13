document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const preguntasBase = [
        {
            parcial: "Primer parcial",
            pregunta: "¿Qué elemento debe añadirse al resultado de una integral indefinida?",
            opciones: [
                "Un límite superior",
                "La constante de integración C",
                "Una derivada adicional",
                "El valor absoluto"
            ],
            correcta: 1,
            explicacion:
                "La integral indefinida representa una familia de antiderivadas, por eso debe incluir la constante de integración C."
        },
        {
            parcial: "Primer parcial",
            pregunta: "¿Cuál es el resultado de ∫ 3x² dx?",
            opciones: [
                "x³ + C",
                "6x + C",
                "3x³ + C",
                "x² + C"
            ],
            correcta: 0,
            explicacion:
                "Se aplica la regla de potencia: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C. Entonces, ∫ 3x² dx = x³ + C."
        },
        {
            parcial: "Primer parcial",
            pregunta: "¿Cuál es la fórmula correcta del método de integración por partes?",
            opciones: [
                "∫u dv = uv − ∫v du",
                "∫u dv = uv + ∫v du",
                "∫u dv = u/v",
                "∫u dv = du/dv"
            ],
            correcta: 0,
            explicacion:
                "La fórmula de integración por partes es ∫u dv = uv − ∫v du."
        },
        {
            parcial: "Primer parcial",
            pregunta: "Para resolver ∫ 2x(x² + 1)³ dx mediante cambio de variable, ¿qué sustitución es la más conveniente?",
            opciones: [
                "u = 2x",
                "u = x² + 1",
                "u = x³",
                "u = (x² + 1)³"
            ],
            correcta: 1,
            explicacion:
                "La sustitución u = x² + 1 es adecuada porque su derivada es du = 2x dx, expresión que aparece en la integral."
        },
        {
            parcial: "Primer parcial",
            pregunta: "¿Cuál es el objetivo principal del método de fracciones parciales?",
            opciones: [
                "Convertir una función racional en una suma de fracciones simples",
                "Eliminar todas las constantes",
                "Transformar una integral en una derivada",
                "Calcular únicamente integrales trigonométricas"
            ],
            correcta: 0,
            explicacion:
                "Las fracciones parciales descomponen una función racional compleja en fracciones más sencillas que pueden integrarse por separado."
        },
        {
            parcial: "Segundo parcial",
            pregunta: "¿Cuál es el área bajo la función f(x) = x en el intervalo [0, 2]?",
            opciones: [
                "1 unidad²",
                "2 unidades²",
                "3 unidades²",
                "4 unidades²"
            ],
            correcta: 1,
            explicacion:
                "A = ∫₀² x dx = [x²/2]₀² = 4/2 = 2 unidades²."
        },
        {
            parcial: "Segundo parcial",
            pregunta: "Para calcular el área entre dos curvas, ¿qué expresión debe integrarse?",
            opciones: [
                "Función inferior menos función superior",
                "Función superior menos función inferior",
                "El producto de ambas funciones",
                "La suma de las derivadas"
            ],
            correcta: 1,
            explicacion:
                "El área se calcula integrando la función superior menos la función inferior dentro del intervalo correspondiente."
        },
        {
            parcial: "Segundo parcial",
            pregunta: "¿Cuál es la fórmula del volumen por el método de discos alrededor del eje x?",
            opciones: [
                "V = π∫[f(x)]² dx",
                "V = 2π∫f(x) dx",
                "V = ∫√(1 + [f′(x)]²) dx",
                "V = π∫f′(x) dx"
            ],
            correcta: 0,
            explicacion:
                "En el método de discos, el radio es f(x), por lo que el volumen se calcula con V = π∫[f(x)]² dx."
        },
        {
            parcial: "Segundo parcial",
            pregunta: "¿Cuál es la fórmula para calcular la longitud de arco de y = f(x) en [a, b]?",
            opciones: [
                "L = ∫ₐᵇ f(x) dx",
                "L = π∫ₐᵇ [f(x)]² dx",
                "L = ∫ₐᵇ √(1 + [f′(x)]²) dx",
                "L = f(b) − f(a)"
            ],
            correcta: 2,
            explicacion:
                "La longitud de arco de y = f(x) se calcula mediante L = ∫ₐᵇ √(1 + [f′(x)]²) dx."
        },
        {
            parcial: "Segundo parcial",
            pregunta: "Si v(t) = 4t + 2 y s(0) = 3, ¿cuál es la función de posición?",
            opciones: [
                "s(t) = 4t² + 2t + 3",
                "s(t) = 2t² + 2t + 3",
                "s(t) = 2t² + 3",
                "s(t) = 4t + 5"
            ],
            correcta: 1,
            explicacion:
                "Al integrar v(t), se obtiene s(t) = 2t² + 2t + C. Como s(0) = 3, entonces C = 3."
        }
    ];

    const pantallaInicio = document.getElementById("pantalla-inicio");
    const pantallaPreguntas = document.getElementById("pantalla-preguntas");
    const pantallaResultado = document.getElementById("pantalla-resultado");

    const btnIniciar = document.getElementById("btn-iniciar");
    const btnSiguiente = document.getElementById("btn-siguiente");
    const btnReiniciar = document.getElementById("btn-reiniciar");

    const quizParcial = document.getElementById("quiz-parcial");
    const progresoTexto = document.getElementById("quiz-progreso-texto");
    const puntuacionActual = document.getElementById("puntuacion-actual");
    const barraProgreso = document.querySelector(".barra-progreso");
    const barraProgresoValor = document.getElementById("barra-progreso-valor");

    const preguntaNumero = document.getElementById("pregunta-numero");
    const preguntaTexto = document.getElementById("pregunta-texto");
    const opcionesRespuesta = document.getElementById("opciones-respuesta");
    const retroalimentacion = document.getElementById("retroalimentacion");

    const resultadoTitulo = document.getElementById("resultado-titulo");
    const resultadoPorcentaje = document.getElementById("resultado-porcentaje");
    const resultadoFraccion = document.getElementById("resultado-fraccion");
    const resultadoMensaje = document.getElementById("resultado-mensaje");
    const respuestasCorrectas = document.getElementById("respuestas-correctas");
    const respuestasIncorrectas = document.getElementById("respuestas-incorrectas");
    const resultadoIcono = document.getElementById("resultado-icono");

    let preguntas = [];
    let indiceActual = 0;
    let puntuacion = 0;
    let respondida = false;

    function mezclar(array) {
        const copia = [...array];

        for (let i = copia.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }

        return copia;
    }

    function mostrarPantalla(pantalla) {
        [pantallaInicio, pantallaPreguntas, pantallaResultado].forEach((elemento) => {
            elemento.classList.remove("activa");
        });

        pantalla.classList.add("activa");
    }

    function iniciarQuiz() {
        preguntas = mezclar(preguntasBase);
        indiceActual = 0;
        puntuacion = 0;
        respondida = false;

        puntuacionActual.textContent = "0";
        mostrarPantalla(pantallaPreguntas);
        mostrarPregunta();

        document.getElementById("contenedor-quiz").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function mostrarPregunta() {
        const pregunta = preguntas[indiceActual];
        const total = preguntas.length;
        const progreso = ((indiceActual + 1) / total) * 100;

        respondida = false;
        btnSiguiente.disabled = true;
        retroalimentacion.className = "retroalimentacion";
        retroalimentacion.textContent = "";

        quizParcial.textContent = pregunta.parcial;
        progresoTexto.textContent = `Pregunta ${indiceActual + 1} de ${total}`;
        preguntaNumero.textContent = String(indiceActual + 1).padStart(2, "0");
        preguntaTexto.textContent = pregunta.pregunta;

        barraProgresoValor.style.width = `${progreso}%`;
        barraProgreso.setAttribute("aria-valuenow", String(Math.round(progreso)));

        opcionesRespuesta.innerHTML = "";

        const letras = ["A", "B", "C", "D"];

        pregunta.opciones.forEach((opcion, indice) => {
            const boton = document.createElement("button");

            boton.type = "button";
            boton.className = "opcion-respuesta";
            boton.dataset.indice = String(indice);

            boton.innerHTML = `
                <span class="opcion-letra">${letras[indice]}</span>
                <span>${opcion}</span>
            `;

            boton.addEventListener("click", () => seleccionarRespuesta(indice));
            opcionesRespuesta.appendChild(boton);
        });

        btnSiguiente.innerHTML =
            indiceActual === total - 1
                ? 'Ver resultado <i class="fas fa-flag-checkered ms-2"></i>'
                : 'Siguiente pregunta <i class="fas fa-arrow-right ms-2"></i>';
    }

    function seleccionarRespuesta(indiceSeleccionado) {
        if (respondida) {
            return;
        }

        respondida = true;

        const pregunta = preguntas[indiceActual];
        const botones = opcionesRespuesta.querySelectorAll(".opcion-respuesta");
        const esCorrecta = indiceSeleccionado === pregunta.correcta;

        botones.forEach((boton, indice) => {
            boton.disabled = true;

            if (indice === pregunta.correcta) {
                boton.classList.add("correcta");
            }

            if (indice === indiceSeleccionado && !esCorrecta) {
                boton.classList.add("incorrecta");
            }
        });

        if (esCorrecta) {
            puntuacion += 1;
            puntuacionActual.textContent = String(puntuacion);
            retroalimentacion.className = "retroalimentacion correcta visible";
            retroalimentacion.innerHTML = `<strong>¡Correcto!</strong> ${pregunta.explicacion}`;
        } else {
            retroalimentacion.className = "retroalimentacion incorrecta visible";
            retroalimentacion.innerHTML = `<strong>Respuesta incorrecta.</strong> ${pregunta.explicacion}`;
        }

        btnSiguiente.disabled = false;
        btnSiguiente.focus();
    }

    function avanzar() {
        if (!respondida) {
            return;
        }

        if (indiceActual < preguntas.length - 1) {
            indiceActual += 1;
            mostrarPregunta();
        } else {
            mostrarResultado();
        }
    }

    function mostrarResultado() {
        const total = preguntas.length;
        const porcentaje = Math.round((puntuacion / total) * 100);
        const incorrectas = total - puntuacion;

        resultadoPorcentaje.textContent = `${porcentaje}%`;
        resultadoFraccion.textContent = `${puntuacion} de ${total}`;
        respuestasCorrectas.textContent = String(puntuacion);
        respuestasIncorrectas.textContent = String(incorrectas);

        if (porcentaje >= 90) {
            resultadoTitulo.textContent = "¡Excelente dominio!";
            resultadoMensaje.textContent =
                "Demostraste un conocimiento sobresaliente de los métodos y aplicaciones del cálculo integral.";
            resultadoIcono.innerHTML = '<i class="fas fa-trophy"></i>';
        } else if (porcentaje >= 70) {
            resultadoTitulo.textContent = "¡Muy buen resultado!";
            resultadoMensaje.textContent =
                "Comprendes la mayoría de los contenidos. Revisa las preguntas incorrectas para fortalecer los temas pendientes.";
            resultadoIcono.innerHTML = '<i class="fas fa-medal"></i>';
        } else if (porcentaje >= 50) {
            resultadoTitulo.textContent = "Buen intento";
            resultadoMensaje.textContent =
                "Tienes una base adecuada, pero conviene repasar algunos métodos y fórmulas antes de realizar otro intento.";
            resultadoIcono.innerHTML = '<i class="fas fa-book-open"></i>';
        } else {
            resultadoTitulo.textContent = "Necesitas reforzar los temas";
            resultadoMensaje.textContent =
                "Repasa los contenidos del primer y segundo parcial y vuelve a realizar la evaluación cuando estés preparado.";
            resultadoIcono.innerHTML = '<i class="fas fa-graduation-cap"></i>';
        }

        mostrarPantalla(pantallaResultado);

        document.getElementById("contenedor-quiz").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    btnIniciar.addEventListener("click", iniciarQuiz);
    btnSiguiente.addEventListener("click", avanzar);
    btnReiniciar.addEventListener("click", iniciarQuiz);
});
