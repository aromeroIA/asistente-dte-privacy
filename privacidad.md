---
title: Política de Privacidad — LACRE
permalink: /privacidad
layout: null
---
<html lang="es-SV">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Política de Privacidad — LACRE</title>
<meta name="description" content="Política de Privacidad de LACRE — Facturación electrónica para El Salvador.">
<meta name="theme-color" content="#122744">
<link rel="canonical" href="https://lacresv.com/privacidad">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192x192.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<style>
  :root {
    --ink: #101826;
    --ink-soft: #45516A;
    --paper: #F5F7FB;
    --surface: #FFFFFF;
    --border: #E1E6F0;
    --primary: #122744;
    --primary-bright: #2A5CAA;
    --accent: #C48A1E;
    --accent-soft: #FBF1DD;
    --shadow: 0 1px 2px rgba(16, 24, 38, 0.04), 0 12px 32px -16px rgba(16, 24, 38, 0.18);
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ink: #E8ECF4;
      --ink-soft: #A9B3C8;
      --paper: #0B1220;
      --surface: #121A2C;
      --border: #26314C;
      --primary: #DCE6F7;
      --primary-bright: #6FA1EA;
      --accent: #E3B65A;
      --accent-soft: #2A2313;
      --shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 20px 40px -20px rgba(0, 0, 0, 0.6);
    }
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--font-sans);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--primary-bright); }

  header {
    position: sticky; top: 0; z-index: 20;
    background: color-mix(in srgb, var(--paper) 88%, transparent);
    backdrop-filter: saturate(140%) blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; padding-block: 16px; max-width: 1120px; margin: 0 auto;
    padding-inline: clamp(20px, 5vw, 40px);
  }
  .brand {
    display: flex; align-items: baseline; gap: 8px;
    font-weight: 800; font-size: 1.05rem; letter-spacing: -0.01em;
    text-decoration: none; color: var(--ink);
  }
  .brand .mark {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 8px;
    background: var(--primary); color: var(--paper);
    font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; flex: none;
  }
  .brand .tag { color: var(--ink-soft); font-weight: 500; font-size: 0.85rem; }
  .back-link { font-size: 0.92rem; color: var(--ink-soft); text-decoration: none; }
  .back-link:hover { color: var(--ink); }

  .legal-page { padding-block: 48px 80px; }
  .wrap { max-width: 860px; margin: 0 auto; padding-inline: clamp(20px, 5vw, 40px); }
  .eyebrow {
    font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--accent); font-weight: 600;
    display: block; margin-bottom: 12px;
  }
  .legal-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; box-shadow: var(--shadow);
    padding: clamp(24px, 5vw, 56px);
  }
  .legal-card h1 { font-size: clamp(1.6rem, 4vw, 2.1rem); line-height: 1.2; margin: 0 0 8px; }
  .legal-card h2 { font-size: 1.25rem; margin: 40px 0 12px; padding-top: 20px; border-top: 1px solid var(--border); }
  .legal-card h2:first-of-type { border-top: none; padding-top: 0; }
  .legal-card p, .legal-card li { color: var(--ink-soft); font-size: 0.98rem; }
  .legal-card strong { color: var(--ink); }
  .legal-card code {
    background: var(--accent-soft); color: var(--ink); border-radius: 4px;
    padding: 0.1em 0.4em; font-family: var(--font-mono); font-size: 0.88em;
  }
  .legal-card table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .legal-card th, .legal-card td {
    border: 1px solid var(--border); padding: 10px 12px; text-align: left; font-size: 0.92rem;
  }
  .legal-card th { color: var(--ink); background: var(--paper); }
  .legal-card ul, .legal-card ol { padding-left: 1.3em; }
  .legal-card a { color: var(--primary-bright); }

  footer { border-top: 1px solid var(--border); padding-block: 26px; font-size: 0.85rem; color: var(--ink-soft); }
  .footer-inner {
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap; max-width: 1120px; margin: 0 auto;
    padding-inline: clamp(20px, 5vw, 40px);
  }
  .footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
  .footer-links a { text-decoration: none; color: var(--ink-soft); }
  .footer-links a:hover { color: var(--ink); }

  @media (max-width: 560px) {
    .legal-card { border-radius: 12px; }
    .brand .tag { display: none; }
  }
</style>
</head>
<body>

<header>
  <div class="nav">
    <a class="brand" href="/">
      <span class="mark">L</span>
      LACRE
      <span class="tag">· El Salvador</span>
    </a>
    <a class="back-link" href="/">← Volver al inicio</a>
  </div>
</header>

<main class="legal-page">
  <div class="wrap">
    <span class="eyebrow">LACRE — Facturación electrónica para El Salvador</span>
    <div class="legal-card" markdown="1">

# Política de Privacidad — LACRE

**Última actualización: 20 de septiembre de 2026**

Esta política describe qué información maneja la extensión de Chrome
"LACRE" y cómo se trata. Esta extensión está
diseñada para uso profesional/comercial en El Salvador, como
herramienta de apoyo sobre el portal de Facturación Electrónica del
Ministerio de Hacienda (admin.factura.gob.sv). También describe los datos que
se reciben a través de los formularios de contacto de este sitio web
(lacresv.com); ver la sección 6.

## 1. Resumen

**Todos los datos que usted introduce en la extensión (clientes,
productos, historial de documentos, compras, inventario) se
almacenan únicamente en su propio navegador, en su propio equipo.**
Esta extensión no tiene un servidor propio donde se guarden sus
datos de negocio, y el desarrollador no tiene acceso a ellos.

Las únicas excepciones —descritas en detalle en las secciones
siguientes— son: (a) el envío de correos, que pasa por los servidores
de Google/Microsoft porque usted vincula su propia cuenta de correo;
y (b) el sistema de licencias, que envía una huella criptográfica del
NIT de su empresa (nunca el NIT en sí) para verificar que su licencia
esté vigente.

Los formularios de contacto de este sitio web son independientes de la
extensión: los datos que usted envía por ellos se tratan según la
sección 6, y los datos que usted introduce dentro de la extensión
siguen almacenándose únicamente en su navegador.

## 2. Qué información se almacena localmente

Al usar la extensión, usted puede introducir:
- **Clientes:** NIT/DUI, razón social, nombre comercial, dirección,
  correo electrónico, teléfono, actividad económica, ubicación
  geográfica.
- **Productos:** código, nombre, precio, existencias, tipo de venta.
- **Historial de documentos (DTE):** código de generación, número de
  control, sello de recepción de Hacienda, y el JSON firmado completo
  de cada documento emitido.
- **Compras, movimientos de inventario, datos de su(s) empresa(s)
  emisora(s).**

Toda esta información se guarda con las APIs de almacenamiento local
del propio navegador (`chrome.storage.local` e IndexedDB) — el mismo
mecanismo que usa cualquier extensión para recordar sus preferencias.
**Nunca se transmite a ningún servidor como parte del uso normal de
estas funciones.**

## 3. Respaldo (Backup) y restauración

La función "Exportar respaldo" genera un archivo `.json` con estos
mismos datos, que se descarga a su propio equipo (carpeta
`Facturacion DTE/Respaldos/` dentro de sus Descargas). Ese archivo
nunca se envía a ningún servidor — es responsabilidad suya
protegerlo, ya que contiene información sensible sin cifrar (el
propio botón de exportar se lo advierte antes de generar el archivo).
Las cuentas de correo vinculadas (ver sección 4) nunca se incluyen en
este respaldo.

## 4. Cuentas de correo vinculadas (envío de documentos)

Si usted decide vincular una cuenta de Gmail o Outlook para enviar
documentos por correo, la extensión usa el protocolo estándar OAuth
2.0: usted inicia sesión directamente en la página oficial de Google o
Microsoft (la extensión nunca ve ni almacena su contraseña). El
intercambio técnico del código de autorización por el token de acceso
de Gmail pasa por un proxy propio en Cloudflare Workers —
exclusivamente para no exponer una credencial de la aplicación dentro
de la extensión— que no guarda registro (log) de los tokens que
procesa. **Outlook, en cambio, no utiliza ningún proxy:** ese
intercambio se realiza 100% directo entre su navegador y los
servidores de Microsoft. En ambos casos, los tokens de acceso quedan
cifrados en su propio navegador con una clave que nunca sale de su
equipo.

Al enviar un correo, el contenido (destinatario, asunto, adjuntos) se
transmite directamente a los servidores de Google o Microsoft, igual
que si usted lo enviara desde Gmail/Outlook directamente.

## 5. Sistema de licencias

Esta extensión requiere una licencia para algunas funciones
(emisión de nuevos documentos y envío por correo; el resto de la
aplicación —incluyendo sus datos, Clientes, Productos, Historial,
Inventario, Backup/Restauración— siempre permanece disponible sin
importar el estado de la licencia).

Para verificar la licencia, la extensión envía a un servidor de
licenciamiento del desarrollador:
- Una **huella criptográfica (hash SHA-256)** del NIT de su empresa
  — nunca el NIT en texto claro.
- Un identificador aleatorio de su dispositivo, generado localmente
  (no identifica a su persona, solo a esta instalación de la
  extensión).
- El identificador de la licencia que usted activó.
- Al momento de activar la licencia (no en cada verificación posterior),
  el secreto de activación que usted recibió al adquirirla, necesario
  para validar que la activación es legítima.

**Nunca se envía:** el NIT en texto claro, la razón social, ni
ningún dato de sus Clientes, Productos, Historial, Compras o
Inventario.

Este servidor de licenciamiento no tiene ninguna relación con el
servidor del Ministerio de Hacienda ni con Google/Microsoft — es
exclusivamente para validar el uso autorizado de la extensión.

## 6. Formularios del sitio web (lacresv.com)

Este sitio ofrece formularios para solicitar LACRE Premium, solicitar
una cotización de licencia personalizada o hacer una consulta general.
Esta sección aplica únicamente a los datos enviados mediante esos
formularios; no aplica a los datos que usted introduce dentro de la
extensión (secciones 2 a 5).

**Datos que se reciben.** Los que usted escribe en el formulario:
nombre, correo electrónico, teléfono o WhatsApp (opcional), nombre de
su empresa o negocio (opcional, solo en la solicitud de cotización),
cantidad aproximada de empresas y de dispositivos y modalidad
solicitada (solo en la solicitud de cotización), y el mensaje o
comentarios. Si usted llega a este sitio desde la extensión, se
registra únicamente que la solicitud proviene de ella; no se envía
ningún dato de la extensión, de su empresa ni de su licencia.

**Lo que no se solicita.** Los formularios no piden NIT ni códigos de
licencia, y le pedimos que no los incluya en el mensaje.

**Finalidad.** Responder su solicitud o consulta, preparar
cotizaciones y gestionar el proceso de adquisición y licenciamiento de
LACRE. Con esa misma finalidad, los datos que usted escribe en el
formulario se utilizan también para notificar por correo electrónico
al operador de LACRE de que hay una solicitud nueva por atender.

**Almacenamiento.** Las solicitudes se reciben mediante un servicio
propio de LACRE que funciona en Cloudflare y se guardan en una base de
datos en Cloudflare. El servicio no guarda en esa base de datos la
dirección IP ni el navegador (agente de usuario) desde el que se envía
la solicitud. Para evitar abusos, limita la cantidad de solicitudes por
dirección IP usando únicamente memoria temporal, sin almacenarla.

**Conservación.** Las solicitudes recibidas por los formularios web se
conservan durante 12 meses desde su recepción y después se eliminan
mediante un proceso automático. Este plazo se refiere a las solicitudes
recibidas por los formularios web. Puede pedir la eliminación anticipada
de su solicitud escribiendo a **aromero@lacresv.com**.

**Uso de los datos.** Los datos de estos formularios no se venden ni se
usan con fines publicitarios, y este sitio no utiliza rastreadores de
analítica ni publicidad.

## 7. Portal de Hacienda (admin.factura.gob.sv)

La extensión interactúa con la página del portal de Facturación
Electrónica para leer y, cuando usted lo solicita, rellenar
automáticamente datos del documento que está creando. Esta
interacción ocurre únicamente dentro de esa página oficial del
Ministerio de Hacienda — la extensión no envía esos datos a ningún
otro sitio.

## 8. Qué NO hace esta extensión

- No vende ni comparte su información con terceros con fines
  publicitarios o comerciales.
- No incluye rastreadores de analítica ni publicidad.
- No accede a su navegación fuera del portal de Hacienda (la
  extensión solo se ejecuta activamente sobre
  `admin.factura.gob.sv`).
- No recopila su ubicación, historial de navegación general, ni
  ningún dato biométrico.

## 9. Permisos del navegador que solicita la extensión, y por qué

| Permiso | Para qué se usa |
|---|---|
| `storage` / `unlimitedStorage` | Guardar sus datos localmente (sección 2). |
| `tabs` / `activeTab` / `scripting` | Leer/rellenar datos en la pestaña del portal de Hacienda cuando usted lo solicita. |
| `downloads` | Organizar y descargar PDFs/JSON de sus documentos y sus respaldos en carpetas de su elección. |
| `sidePanel` | Mostrar el panel de la extensión en la barra lateral de Chrome. |
| `identity` | El flujo de vinculación de cuenta de correo (sección 4). |

## 10. Cómo eliminar su información

Los datos almacenados por LACRE dentro del almacenamiento de la extensión se eliminan al desinstalarla. Los archivos que usted haya descargado a su equipo, como respaldos, PDF o JSON, no se eliminan automáticamente. También puede eliminar registros
individuales desde la propia interfaz de la extensión en cualquier
momento.

## 11. Contacto

Para preguntas sobre esta política, escriba a:
**aromero@lacresv.com**

</div>
  </div>
</main>

<footer>
  <div class="footer-inner">
    <span>© 2026 LACRE</span>
    <div class="footer-links">
      <a href="/">Inicio</a>
      <a href="/terminos">Términos y Condiciones</a>
      <a href="/reembolso">Política de Reembolso</a>
      <a href="mailto:aromero@lacresv.com">aromero@lacresv.com</a>
    </div>
  </div>
</footer>

</body>
</html>
