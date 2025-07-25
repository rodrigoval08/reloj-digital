// Inicializar plugins de day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

let modoAnalogo = true;

function actualizarDigital() {
  const zona = document.getElementById('zona-horaria').value;
  const ahora = dayjs().tz(zona);

  let hora = ahora.hour();
  let minutos = ahora.minute().toString().padStart(2, '0');
  let segundos = ahora.second().toString().padStart(2, '0');

  // Formato 12 horas
  const ampm = hora >= 12 ? 'PM' : 'AM';
  const hora12 = hora % 12 || 12;

  const tiempo = `${hora12}:${minutos}:${segundos} ${ampm}`;
  document.getElementById('digital').textContent = tiempo;
}

function actualizarAnalogo() {
  const zona = document.getElementById('zona-horaria').value;
  const ahora = dayjs().tz(zona);

  const segundos = ahora.second();
  const minutos = ahora.minute();
  const hora = ahora.hour();

  // Calcular ángulos
  const segundero = segundos * 6; // 360° / 60
  const minutero = minutos * 6 + segundos * 0.1; // más suave
  const horario = (hora % 12) * 30 + minutos * 0.5; // 360° / 12

  // Rotar las manecillas
  document.getElementById('second-hand').style.transform = `translateX(-50%) rotate(${segundero}deg)`;
  document.getElementById('minute-hand').style.transform = `translateX(-50%) rotate(${minutero}deg)`;
  document.getElementById('hour-hand').style.transform = `translateX(-50%) rotate(${horario}deg)`;
}

// Función para alternar entre modos
function toggleReloj() {
  modoAnalogo = !modoAnalogo;

  const analogClock = document.getElementById('analog-clock');
  const digitalClock = document.getElementById('digital');
  const btn = document.getElementById('toggle-btn');

  if (modoAnalogo) {
    analogClock.style.display = 'block';
    digitalClock.style.display = 'none';
    btn.textContent = 'Cambiar a Reloj Digital';
  } else {
    analogClock.style.display = 'none';
    digitalClock.style.display = 'block';
    btn.textContent = 'Cambiar a Reloj Analógico';
  }
}

// Actualiza ambos relojes
function actualizarReloj() {
  if (modoAnalogo) {
    actualizarAnalogo();
  } else {
    actualizarDigital();
  }
}

// Cargar zona horaria guardada o usar Madrid por defecto
document.addEventListener("DOMContentLoaded", function () {
  const savedZone = localStorage.getItem('zonaHoraria') || 'Europe/Madrid';
  document.getElementById('zona-horaria').value = savedZone;
  actualizarReloj();
});

// Actualizar cada segundo
setInterval(() => {
  actualizarReloj();
}, 1000);

// Guardar zona horaria al cambiarla
document.getElementById('zona-horaria').addEventListener('change', function () {
  const zonaSeleccionada = this.value;
  localStorage.setItem('zonaHoraria', zonaSeleccionada);
});