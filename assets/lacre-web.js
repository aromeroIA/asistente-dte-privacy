/* =========================================================
   lacre-web.js -- comportamiento de lacresv.com (Fase 5, Etapa 3; Etapa 1.6.4: Premium -> lacre-ventas + WhatsApp).

   Qué hace:
     1. Formulario de solicitudes (Premium / cotización personalizada / consulta).
     2. Preselección por URL: ?origen=extension&plan=premium|personalizada.
     3. Botón de WhatsApp genérico (header/footer), oculto mientras no exista un número aprobado.

   Sin dependencias, sin analítica, sin cookies. Dos destinos posibles para el formulario:
     - Premium      -> ENDPOINT_VENTAS_PREMIUM (POST /v1/ventas de lacre-ventas): crea la solicitud y
                       devuelve un código público + un enlace de WhatsApp con un mensaje de INTENCIÓN
                       (nunca de compra ya realizada). No se usa ya ningún enlace de pago estático.
     - Personalizada / Consulta -> ENDPOINT_SOLICITUDES (Worker de contacto, sin cambios). Personalizada
                       agrega, tras el 201, un botón para continuar por WhatsApp con un mensaje fijo (sin
                       código: este Worker no genera ninguno); NUNCA crea una venta Premium.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- Configuración ---------------- */

  // WhatsApp Business comercial de LACRE. Vacía => no se muestra ningún botón de WhatsApp (genérico ni de
  // continuación) y no se genera ningún enlace wa.me. Solo dígitos con código de país (sin "+", espacios
  // ni guiones). Aprobado: +503 6461 4716.
  var WHATSAPP_NUMERO = "50364614716";

  // lacre-ventas PRODUCCIÓN (Etapa 1.6.5): SOLO Premium pasa por aquí. Personalizada y Consulta siguen en
  // ENDPOINT_SOLICITUDES (lacre-contacto), sin cambios.
  var ENDPOINT_VENTAS_PREMIUM = "https://lacre-ventas.panel-dte-oauth.workers.dev/v1/ventas";

  // Worker de contacto (Cloudflare), desplegado en producción. Personalizada y consulta general.
  var ENDPOINT_SOLICITUDES = "https://lacre-contacto.panel-dte-oauth.workers.dev/solicitudes";

  // Mensaje prellenado de WhatsApp para "Personalizada" (lacre-contacto no genera ningún código de
  // solicitud: no se fabrica uno). NO debe iniciar ni sugerir una compra Premium.
  var MENSAJE_WHATSAPP_PERSONALIZADA = "Hola, quiero más información sobre el servicio personalizado de LACRE.";

  var CORREO_CONTACTO = "aromero@lacresv.com";
  var TIMEOUT_MS = 15000;

  /* ---------------- Utilidades ---------------- */

  function $(id) { return document.getElementById(id); }
  function todos(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }
  function reducirMovimiento() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function irA(elemento) {
    if (!elemento) return;
    elemento.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "start" });
  }

  /* ---------------- WhatsApp ---------------- */

  function numeroWhatsAppValido() {
    var numero = String(WHATSAPP_NUMERO || "").trim();
    return /^[0-9]{8,15}$/.test(numero) ? numero : null;
  }

  function enlaceWhatsApp(texto) {
    var numero = numeroWhatsAppValido();
    return numero ? "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto) : null;
  }

  function iniciarWhatsapp() {
    var numero = numeroWhatsAppValido();
    todos("[data-whatsapp]").forEach(function (el) {
      if (!numero) { el.hidden = true; return; }
      var enlace = el.matches("a") ? el : el.querySelector("a");
      if (enlace) enlace.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent("Hola, quiero información sobre LACRE.");
      el.hidden = false;
    });
  }

  /* ---------------- "Continuar por WhatsApp" tras una solicitud (Etapa 1.6.4) ---------------- */

  // Premium: `url` viene de lacre-ventas (whatsapp_url), ya con el código incluido en el texto -- nunca se
  // reconstruye aquí. Personalizada: `url` se arma en el propio sitio con el mensaje fijo aprobado, SIN
  // código (lacre-contacto no genera ninguno). `codigo` solo se muestra para Premium.
  function mostrarContinuarWhatsApp(url, codigo) {
    var bloque = $("whatsapp-continuar");
    var enlace = $("whatsapp-continuar-enlace");
    var lineaCodigo = $("whatsapp-continuar-codigo");
    if (!bloque || !enlace) return;
    if (!url) {
      bloque.hidden = true;
      if (lineaCodigo) { lineaCodigo.hidden = true; lineaCodigo.textContent = ""; }
      return;
    }
    enlace.href = url;
    if (lineaCodigo) {
      if (codigo) { lineaCodigo.textContent = "Su número de solicitud es: " + codigo; lineaCodigo.hidden = false; }
      else { lineaCodigo.hidden = true; lineaCodigo.textContent = ""; }
    }
    bloque.hidden = false;
  }

  /* ---------------- Idempotencia (Premium -> lacre-ventas) ---------------- */

  // Una clave por INTENTO de solicitud: se genera una sola vez y se reutiliza en reintentos (p. ej. un
  // fallo de red) para que lacre-ventas nunca cree dos solicitudes por el mismo intento; "Enviar otra
  // solicitud" (reiniciar) genera una nueva. No es secreta: es opaca y de un solo uso lógico (10 min).
  function generarIdempotencyKey() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var out = "";
    for (var i = 0; i < 32; i++) out += alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
    return out;
  }

  /* ---------------- Formulario ---------------- */

  var TEXTOS_TIPO = {
    premium: {
      boton: "Enviar solicitud",
      mensaje: "Mensaje",
      mensajeObligatorio: false,
      exitoTitulo: "Solicitud creada correctamente",
      exito: "Continúe por WhatsApp para completar su proceso."
    },
    personalizada: {
      boton: "Solicitar cotización",
      mensaje: "Comentarios",
      mensajeObligatorio: false,
      exitoTitulo: "Solicitud recibida correctamente",
      exito: "Si desea continuar con la consulta, puede escribirnos directamente por WhatsApp."
    },
    consulta: {
      boton: "Enviar mensaje",
      mensaje: "Mensaje",
      mensajeObligatorio: true,
      exitoTitulo: "Mensaje recibido",
      exito: "Mensaje recibido. Nos pondremos en contacto contigo."
    }
  };

  var MENSAJES_ERROR = {
    nombre: {
      obligatorio: "Escriba su nombre.",
      longitud_invalida: "El nombre debe tener entre 2 y 100 caracteres.",
      formato_invalido: "El nombre contiene caracteres no válidos."
    },
    empresa: {
      longitud_invalida: "El nombre de la empresa no puede superar 120 caracteres.",
      formato_invalido: "El nombre de la empresa contiene caracteres no válidos."
    },
    correo: {
      obligatorio: "Escriba su correo electrónico.",
      formato_invalido: "Escriba un correo electrónico válido, por ejemplo nombre@ejemplo.com."
    },
    telefono: {
      formato_invalido: "Escriba un teléfono válido (7 a 20 caracteres: números, espacios, +, - o paréntesis) o déjelo en blanco."
    },
    empresas: {
      obligatorio: "Indique la cantidad aproximada de empresas.",
      fuera_de_rango: "Escriba un número entero entre 1 y 1000."
    },
    dispositivos: {
      obligatorio: "Indique la cantidad aproximada de dispositivos.",
      fuera_de_rango: "Escriba un número entero entre 1 y 1000."
    },
    modalidad: {
      obligatorio: "Seleccione una modalidad.",
      valor_invalido: "Seleccione una modalidad válida."
    },
    mensaje: {
      obligatorio: "Escriba su mensaje.",
      longitud_minima: "El mensaje debe tener al menos 10 caracteres.",
      longitud_invalida: "El mensaje no puede superar 1000 caracteres.",
      formato_invalido: "El mensaje contiene caracteres no válidos."
    }
  };

  // Campo -> id del control que recibe el foco desde el resumen de errores.
  var ID_CAMPO = {
    nombre: "f-nombre", empresa: "f-empresa", correo: "f-correo", telefono: "f-telefono",
    empresas: "f-empresas", dispositivos: "f-dispositivos", modalidad: "mod-flexible", mensaje: "f-mensaje"
  };

  function iniciarFormulario() {
    var contenedor = $("solicitud");
    var form = $("form-solicitud");
    if (!contenedor || !form) return null;

    var resumen = $("form-errores");
    var resumenLista = $("form-errores-lista");
    var estado = $("form-estado");
    var exito = $("form-exito");
    var exitoTitulo = $("exito-titulo");
    var exitoTexto = $("exito-texto");
    var boton = $("btn-enviar");
    var mostradoEl = Date.now();
    var origen = "web";
    var enviando = false;
    var idempotencyKeyPremium = null; // una por intento de solicitud Premium; ver generarIdempotencyKey()

    function tipoActual() {
      var marcado = form.querySelector('input[name="tipo"]:checked');
      return marcado ? marcado.value : "consulta";
    }

    function valorModalidad() {
      var m = form.querySelector('input[name="modalidad"]:checked');
      return m ? m.value : "";
    }

    /* ---- mostrar/ocultar campos según el tipo ---- */
    function aplicarTipo(tipo) {
      var textos = TEXTOS_TIPO[tipo] || TEXTOS_TIPO.consulta;
      todos("[data-solo]").forEach(function (grupo) {
        var visible = grupo.getAttribute("data-solo") === tipo;
        grupo.hidden = !visible;
        Array.prototype.slice.call(grupo.querySelectorAll("input, select, textarea")).forEach(function (c) {
          c.disabled = !visible;
        });
      });
      $("lbl-mensaje-texto").textContent = textos.mensaje;
      $("lbl-mensaje-req").textContent = textos.mensajeObligatorio ? "(obligatorio)" : "(opcional)";
      $("f-mensaje").setAttribute("aria-required", textos.mensajeObligatorio ? "true" : "false");
      boton.textContent = textos.boton;
    }

    /* ---- errores ---- */
    function limpiarErrores() {
      resumen.hidden = true;
      resumenLista.textContent = "";
      estado.textContent = "";
      Object.keys(ID_CAMPO).forEach(function (campo) {
        var err = $("err-" + campo);
        if (err) { err.hidden = true; err.textContent = ""; }
        var control = $(ID_CAMPO[campo]);
        if (control) {
          control.removeAttribute("aria-invalid");
          var base = control.getAttribute("data-describedby-base") || "";
          if (base) control.setAttribute("aria-describedby", base); else control.removeAttribute("aria-describedby");
        }
      });
      var grupoModalidad = $("grupo-modalidad");
      if (grupoModalidad) grupoModalidad.removeAttribute("aria-invalid");
    }

    function textoError(campo, codigo, tipo) {
      var m = MENSAJES_ERROR[campo] || {};
      if (campo === "mensaje" && codigo === "longitud_invalida" && tipo === "consulta") {
        // Distingue "muy corto" de "demasiado largo" según el contenido actual.
        var largo = $("f-mensaje").value.trim().length;
        return largo < 10 ? m.longitud_minima : m.longitud_invalida;
      }
      return m[codigo] || "Revise este campo.";
    }

    function mostrarErrores(errores, tipo) {
      limpiarErrores();
      var campos = Object.keys(errores).filter(function (c) { return ID_CAMPO[c]; });
      if (!campos.length) return false;
      campos.forEach(function (campo) {
        var texto = textoError(campo, errores[campo], tipo);
        var err = $("err-" + campo);
        var control = $(ID_CAMPO[campo]);
        if (err) { err.textContent = texto; err.hidden = false; }
        if (control) {
          control.setAttribute("aria-invalid", "true");
          var base = control.getAttribute("data-describedby-base") || "";
          control.setAttribute("aria-describedby", (base ? base + " " : "") + "err-" + campo);
        }
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + ID_CAMPO[campo];
        a.textContent = texto;
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          var destino = $(ID_CAMPO[campo]);
          if (destino) destino.focus();
        });
        li.appendChild(a);
        resumenLista.appendChild(li);
      });
      resumen.hidden = false;
      resumen.focus();
      return true;
    }

    /* ---- validación local (mismas reglas que el Worker) ---- */
    function leerValores() {
      return {
        tipo: tipoActual(),
        nombre: $("f-nombre").value.trim(),
        empresa: $("f-empresa").value.trim(),
        correo: $("f-correo").value.trim(),
        telefono: $("f-telefono").value.trim(),
        empresas: $("f-empresas").value.trim(),
        dispositivos: $("f-dispositivos").value.trim(),
        modalidad: valorModalidad(),
        mensaje: $("f-mensaje").value.trim(),
        website: $("f-verificacion").value
      };
    }

    // Mismos caracteres que rechaza el Worker de contacto: controles ASCII y C1, direccion de texto (bidi), separadores de linea y ancho cero.
    // En el mensaje se permiten saltos de linea, tabulaciones y U+200C/U+200D.
    var CONTROL = /[\x00-\x1f\x7f\u0080-\u009f\u061c\u200b-\u200f\u2028\u2029\u202a-\u202e\u2060\u2066-\u2069\ufeff]/;
    var CONTROL_MENSAJE = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f\u0080-\u009f\u061c\u200b\u200e\u200f\u2028\u2029\u202a-\u202e\u2060\u2066-\u2069\ufeff]/;

    function validar(v) {
      var e = {};
      if (!v.nombre) e.nombre = "obligatorio";
      else if (v.nombre.length < 2 || v.nombre.length > 100) e.nombre = "longitud_invalida";
      else if (CONTROL.test(v.nombre)) e.nombre = "formato_invalido";

      if (!v.correo) e.correo = "obligatorio";
      else if (v.correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.correo)) e.correo = "formato_invalido";

      if (v.telefono) {
        var digitos = v.telefono.replace(/[^0-9]/g, "").length;
        if (v.telefono.length < 7 || v.telefono.length > 20 || !/^[0-9 +()\-]+$/.test(v.telefono) || digitos < 7) e.telefono = "formato_invalido";
      }

      if (v.tipo === "personalizada") {
        if (v.empresa.length > 120) e.empresa = "longitud_invalida";
        ["empresas", "dispositivos"].forEach(function (campo) {
          var valor = v[campo];
          if (!valor) { e[campo] = "obligatorio"; return; }
          if (!/^[0-9]{1,6}$/.test(valor) || Number(valor) < 1 || Number(valor) > 1000) e[campo] = "fuera_de_rango";
        });
        if (!v.modalidad) e.modalidad = "obligatorio";
      }

      if (v.mensaje.length > 1000) e.mensaje = "longitud_invalida";
      else if (CONTROL_MENSAJE.test(v.mensaje)) e.mensaje = "formato_invalido";
      else if (v.tipo === "consulta") {
        if (!v.mensaje) e.mensaje = "obligatorio";
        else if (v.mensaje.length < 10) e.mensaje = "longitud_invalida";
      }
      return e;
    }

    function construirPayload(v) {
      var p = { tipo: v.tipo, nombre: v.nombre, correo: v.correo, origen: origen, website: v.website, mostrado_el: mostradoEl };
      if (v.telefono) p.telefono = v.telefono;
      if (v.mensaje) p.mensaje = v.mensaje;
      if (v.tipo === "personalizada") {
        if (v.empresa) p.empresa = v.empresa;
        p.empresas = Number(v.empresas);
        p.dispositivos = Number(v.dispositivos);
        p.modalidad = v.modalidad;
      }
      return p;
    }

    /* ---- estados de la interfaz ---- */
    function ocupado(si) {
      enviando = si;
      boton.disabled = si;
      form.setAttribute("aria-busy", si ? "true" : "false");
      if (si) { boton.textContent = "Enviando…"; estado.textContent = "Enviando su solicitud…"; }
      else { boton.textContent = (TEXTOS_TIPO[tipoActual()] || TEXTOS_TIPO.consulta).boton; }
    }

    function mostrarErrorGeneral(mensaje) {
      limpiarErrores();
      resumenLista.textContent = "";
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(mensaje + " "));
      var a = document.createElement("a");
      a.href = "mailto:" + CORREO_CONTACTO;
      a.textContent = CORREO_CONTACTO;
      li.appendChild(a);
      li.appendChild(document.createTextNode("."));
      resumenLista.appendChild(li);
      resumen.hidden = false;
      resumen.focus();
    }

    // `datos`: para "premium", { codigo, whatsappUrl } (whatsappUrl viene TAL CUAL de lacre-ventas, con el
    // código ya incluido en el texto); para "personalizada", se arma aquí un enlace de WhatsApp con el
    // mensaje fijo aprobado (sin código: lacre-contacto no genera ninguno); "consulta" no muestra WhatsApp.
    function mostrarExito(tipo, datos) {
      var t = TEXTOS_TIPO[tipo] || TEXTOS_TIPO.consulta;
      form.hidden = true;
      exitoTitulo.textContent = t.exitoTitulo;
      exitoTexto.textContent = t.exito;
      if (tipo === "premium" && datos && datos.whatsappUrl) {
        mostrarContinuarWhatsApp(datos.whatsappUrl, datos.codigo || null);
      } else if (tipo === "personalizada") {
        mostrarContinuarWhatsApp(enlaceWhatsApp(MENSAJE_WHATSAPP_PERSONALIZADA), null);
      } else {
        mostrarContinuarWhatsApp(null, null);
      }
      exito.hidden = false;
      exitoTitulo.focus();
    }

    function reiniciar() {
      form.reset();
      exito.hidden = true;
      mostrarContinuarWhatsApp(null, null);
      idempotencyKeyPremium = null;
      form.hidden = false;
      mostradoEl = Date.now();
      limpiarErrores();
      aplicarTipo(tipoActual());
      $("f-nombre").focus();
    }

    // Respuesta de POST /v1/ventas (Premium). Nunca se muestra un error interno, token ni endpoint: solo
    // mensajes amigables, con el correo de contacto como salida siempre disponible.
    function manejarRespuestaPremium(estado, cuerpo) {
      ocupado(false);
      if ((estado === 201 || estado === 200) && cuerpo && cuerpo.ok && cuerpo.whatsapp_url) {
        mostrarExito("premium", { codigo: cuerpo.codigo_publico || null, whatsappUrl: cuerpo.whatsapp_url });
        return;
      }
      if (estado === 400) { mostrarErrorGeneral("Revise los datos ingresados e intente nuevamente, o escríbanos a"); return; }
      if (estado === 409) { mostrarErrorGeneral("Ya existe una solicitud equivalente en curso. Revise WhatsApp o escríbanos a"); return; }
      if (estado === 429) { mostrarErrorGeneral("Se ha alcanzado temporalmente el límite de solicitudes. Intente de nuevo más tarde o escríbanos a"); return; }
      if (estado === 503) { mostrarErrorGeneral("El servicio no está disponible en este momento. Intente más tarde o escríbanos a"); return; }
      mostrarErrorGeneral("No pudimos crear su solicitud. Intente de nuevo o escríbanos a");
    }

    /* ---- envío ---- */
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (enviando) return;
      var v = leerValores();
      var errores = validar(v);
      if (mostrarErrores(errores, v.tipo)) return;
      limpiarErrores();
      ocupado(true);

      var controlador = new AbortController();
      var temporizador = setTimeout(function () { controlador.abort(); }, TIMEOUT_MS);

      // Premium (Etapa 1.6.4): va a lacre-ventas (/v1/ventas), NUNCA a lacre-contacto. Personalizada y
      // consulta siguen exactamente igual que antes, sin tocar ENDPOINT_SOLICITUDES ni su payload.
      if (v.tipo === "premium") {
        if (!idempotencyKeyPremium) idempotencyKeyPremium = generarIdempotencyKey();
        var payloadPremium = { nombre: v.nombre, correo: v.correo, idempotency_key: idempotencyKeyPremium };
        fetch(ENDPOINT_VENTAS_PREMIUM, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadPremium),
          mode: "cors",
          credentials: "omit",
          signal: controlador.signal
        }).then(function (resp) {
          clearTimeout(temporizador);
          return resp.json().catch(function () { return {}; }).then(function (cuerpo) { manejarRespuestaPremium(resp.status, cuerpo); });
        }).catch(function () {
          clearTimeout(temporizador);
          ocupado(false);
          mostrarErrorGeneral("No pudimos enviar su solicitud. Intente de nuevo o escríbanos a");
        });
        return;
      }

      fetch(ENDPOINT_SOLICITUDES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(construirPayload(v)),
        mode: "cors",
        credentials: "omit",
        signal: controlador.signal
      }).then(function (resp) {
        clearTimeout(temporizador);
        return resp.json().catch(function () { return {}; }).then(function (cuerpo) {
          ocupado(false);
          if (resp.status === 201 && cuerpo && cuerpo.ok) { mostrarExito(v.tipo); return; }
          if (resp.status === 400 && cuerpo && cuerpo.campos) {
            var conocidos = {};
            Object.keys(cuerpo.campos).forEach(function (c) { if (ID_CAMPO[c]) conocidos[c] = cuerpo.campos[c]; });
            if (Object.keys(conocidos).length && mostrarErrores(conocidos, v.tipo)) return;
          }
          if (resp.status === 429) {
            mostrarErrorGeneral("Se han recibido muchas solicitudes en poco tiempo. Intente de nuevo más tarde o escríbanos a");
            return;
          }
          mostrarErrorGeneral("No pudimos enviar su solicitud. Intente de nuevo o escríbanos a");
        });
      }).catch(function () {
        clearTimeout(temporizador);
        ocupado(false);
        mostrarErrorGeneral("No pudimos enviar su solicitud. Intente de nuevo o escríbanos a");
      });
    });

    /* ---- cambios de tipo ---- */
    Array.prototype.slice.call(form.querySelectorAll('input[name="tipo"]')).forEach(function (r) {
      r.addEventListener("change", function () { limpiarErrores(); aplicarTipo(tipoActual()); });
    });
    var nueva = $("nueva-solicitud");
    if (nueva) nueva.addEventListener("click", reiniciar);

    // El formulario solo se muestra si el script se ejecuta (sin JavaScript queda el contacto por correo).
    contenedor.hidden = false;
    aplicarTipo(tipoActual());

    return {
      seleccionar: function (tipo) {
        var radio = $("tipo-" + tipo);
        if (!radio) return false;
        radio.checked = true;
        limpiarErrores();
        aplicarTipo(tipo);
        return true;
      },
      fijarOrigen: function (o) { origen = o; },
      enfocar: function () { var n = $("f-nombre"); if (n) n.focus({ preventScroll: true }); }
    };
  }

  /* ---------------- Parámetros de la URL ---------------- */

  // Solo se aceptan origen=extension y plan=premium|personalizada. Cualquier otro valor
  // se ignora y ningún parámetro se copia jamás al contenido de la página.
  function leerParametros(busqueda) {
    var p = new URLSearchParams(busqueda || "");
    var plan = p.get("plan");
    return {
      origen: p.get("origen") === "extension" ? "extension" : "web",
      plan: plan === "premium" || plan === "personalizada" ? plan : null
    };
  }

  function aplicarParametros(formulario) {
    var par = leerParametros(window.location.search);
    if (par.origen === "extension" && formulario) formulario.fijarOrigen("extension");
    if (par.plan && formulario) {
      formulario.seleccionar(par.plan);
      irA($("contacto"));
    } else if (par.origen === "extension") {
      irA($("planes"));
    }
  }

  /* ---------------- Botones "Solicitar ..." de las tarjetas ---------------- */

  function iniciarBotonesPlan(formulario) {
    todos("[data-solicitud]").forEach(function (el) {
      el.addEventListener("click", function () {
        if (!formulario) return; // sin formulario, el enlace #contacto sigue funcionando
        formulario.seleccionar(el.getAttribute("data-solicitud"));
        setTimeout(function () { formulario.enfocar(); }, 0);
      });
    });
  }

  function iniciar() {
    iniciarWhatsapp();
    var formulario = iniciarFormulario();
    iniciarBotonesPlan(formulario);
    aplicarParametros(formulario);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
