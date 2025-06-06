document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('curp-form');
  const input = document.getElementById('curp');
  const errorMsg = document.getElementById('error-msg');
  const result = document.getElementById('result');
  const statusMsg = document.getElementById('status-msg');
  const progressBar = document.getElementById('progress-bar');

  const etapas = [
    "Etapa 0: Sin registro",
    "Registrado en alineación",
    "Inicia Proceso",
    "Evaluado",
    "Pagado",
    "Enviado al CONOCER",
    "Certificado Recibido",
    "Entregado"
  ];

  const mensajes = {
    0: "El CURP proporcionado no se encuentra registrado. Verifica que esté bien escrito o contacta a tu asesor comercial.",
    1: "Tu proceso está registrado en etapa de alineación. Completa tu curso en línea o solicita que te asignen evaluador.",
    2: "Tu evaluación está en curso. Prepárate para ser evaluado.",
    3: "Has sido evaluado. Esperamos tu pago para iniciar el trámite de certificado.",
    4: "Tu pago ha sido recibido. Estamos preparando el expediente para CONOCER. Tiempo estimado: 7 días.",
    5: "Expediente entregado al CONOCER. Tiempo estimado: 45 a 60 días.",
    6: "Tu certificado ha sido recibido y será entregado en ceremonia.",
    7: "¡Felicidades! Tu certificado ha sido entregado. Invita a otros a certificarse."
  };

  // Validación de CURP
  const validarCurp = (curp) => {
    const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/;
    return regex.test(curp.toUpperCase());
  };

  // Simulación: Lógica de búsqueda por CURP (sustituir con API real o DB)
  const buscarEtapaPorCurp = (curp) => {
    const hash = [...curp].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return hash % 8; // Simula etapa 0–7
  };

  const renderBarraProgreso = (etapa) => {
    progressBar.innerHTML = "";
    etapas.forEach((etapaNombre, index) => {
      const paso = document.createElement("div");
      paso.className = "paso";
      if (index <= etapa) paso.classList.add("activo");
      paso.innerText = etapaNombre.replace("Etapa ", "");
      progressBar.appendChild(paso);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const curp = input.value.trim().toUpperCase();

    if (!validarCurp(curp)) {
      errorMsg.textContent = "El CURP no tiene el formato correcto.";
      result.classList.add("hidden");
      return;
    }

    errorMsg.textContent = "";
    const etapa = buscarEtapaPorCurp(curp);

    statusMsg.textContent = mensajes[etapa];
    renderBarraProgreso(etapa);
    result.classList.remove("hidden");
  });
});
