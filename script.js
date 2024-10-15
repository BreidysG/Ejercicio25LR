let speed = 300; // Velocidad predeterminada en milisegundos
let timer = 180; // 3 minutos en segundos
let timerInterval;
let currentIndex = 0;
let lines = [
    "El sol se oculta lentamente tras las colinas, pintando el cielo con tonos anaranjados y rosados.",
    "Una suave brisa marina trae consigo el aroma salado del océano.",
    "Las olas rompen en la orilla con un ritmo constante y relajante.",
    "Las gaviotas planean en el aire, sus siluetas recortadas contra el horizonte dorado.",
    "A lo lejos, un velero navega tranquilamente, avanzando hacia el ocaso.",
    "Las primeras estrellas comienzan a brillar, tímidas, en el firmamento despejado.",
    "El murmullo del viento entre los pinos acompaña el caer de la noche.",
    "El silencio se apodera del paisaje mientras la oscuridad envuelve el entorno.",
    "Un faro distante ilumina el camino con su luz intermitente, guiando a los navegantes.",
    "Todo queda en calma, como si el mundo tomara una pausa para respirar profundamente."
    // Agrega más líneas de texto según lo necesites
];

document.getElementById('startBtn').addEventListener('click', startExercise);

function startExercise() {
    // Obtener la velocidad ingresada por el usuario
    const userSpeed = document.getElementById('speed').value;
    speed = parseInt(userSpeed) || 300; // Asignar la velocidad del usuario, o 300ms si no es válida

    document.getElementById("exerciseArea").classList.remove("hidden");
    document.getElementById("p1").classList.add("hidden");
    document.getElementById("div1").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");

    // Inicializar el temporizador
    startTimer();

    // Comenzar a mostrar las líneas de texto con el subrayado
    showNextLines();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo restante: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

function showNextLines() {
    const textArea = document.getElementById('textArea');
    textArea.innerHTML = ''; // Limpiar el área de texto antes de mostrar nuevas líneas

    if (currentIndex < lines.length) {
        // Mostrar las siguientes dos líneas de texto
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        line1.classList.add('line', 'active');
        line2.classList.add('line', 'active');
        line1.innerText = lines[currentIndex];
        line2.innerText = lines[currentIndex + 1] || ""; // Mostrar la siguiente línea o vacía si no existe
        textArea.appendChild(line1);
        textArea.appendChild(line2);

        // Resaltar la primera línea
        highlightLine(line1, () => {
            // Después de que termine, resaltar la segunda línea
            highlightLine(line2, () => {
                // Avanzar al siguiente par de líneas después de que se resalte la segunda
                currentIndex += 2;

                // Si llegamos al final, reiniciar el ciclo
                if (currentIndex >= lines.length) {
                    currentIndex = 0;
                }

                // Continuar con las siguientes líneas después de un pequeño retraso
                setTimeout(showNextLines, speed);
            });
        });
    }
}

function highlightLine(line, callback) {
    line.classList.add('highlight'); // Añadir el fondo de subrayado
    setTimeout(() => {
        line.classList.remove('highlight'); // Quitar el fondo después de la duración
        callback(); // Llamar a la siguiente acción
    }, speed);
}
