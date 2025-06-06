async function consultar() {
  const curp = document.getElementById('curpInput').value.trim().toUpperCase();
  const regexCURP = /^[A-Z]{4}\\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;
  const resultado = document.getElementById("resultado");

  if (!curp) {
    resultado.innerHTML = "<p style='color:red;'>Por favor, ingresa tu CURP.</p>";
    return;
  }

  if (curp.length !== 18) {
    resultado.innerHTML = "<p style='color:red;'>El CURP debe tener 18 caracteres.</p>";
    return;
  }

  if (!regexCURP.test(curp)) {
    resultado.innerHTML = "<p style='color:red;'>El CURP ingresado no es válido. Verifica y vuelve a intentarlo.</p>";
    return;
  }

  // Aquí se realizará la consulta a Google Sheets
  resultado.innerHTML = "<p>Buscando información para el CURP: <strong>" + curp + "</strong>... (aquí se conectará con Google Sheets)</p>";
}
