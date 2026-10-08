---
title: Política de Privacidad — LACRE
permalink: /privacidad
layout: null
---
<!doctype html><html lang="es-SV" data-theme="dark"><head>
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


<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src https://lacre-contacto.panel-dte-oauth.workers.dev https://lacre-ventas.panel-dte-oauth.workers.dev; form-action 'self'; base-uri 'none'">
<link rel="stylesheet" href="/assets/lacre-site.css"></head><body><header><div class="wrap nav"><a class="brand" href="/"><img class="brand-mark" src="/assets/lacre-mark.svg" alt=""><span>LACRE</span><span class="brand-divider" aria-hidden="true"></span><img class="brand-bird" src="/assets/torogoz.png" alt="Torogoz, identidad salvadoreña de LACRE"></a><nav aria-label="Principal"><a href="/#funciones">Funciones</a><a href="/#planes">Planes</a><a href="/#preguntas">Preguntas</a><a class="btn small" href="/#contacto">Contacto</a></nav><div class="theme-controls" role="group" aria-label="Tema de la página"><button type="button" data-theme-choice="light" aria-label="Tema claro" title="Tema claro" aria-pressed="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1 1M18 18l1 1M5 19l1-1M18 6l1-1"/></svg></button><button type="button" data-theme-choice="dark" aria-label="Tema oscuro" title="Tema oscuro" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/></svg></button></div></div></header><main class="legal-page">
  <div class="wrap">
    <span class="eyebrow">LACRE — Facturación electrónica para El Salvador</span>
    <div class="legal-card"><h1>Política de Privacidad — LACRE</h1>
<p><strong>Última actualización: 5 de octubre de 2026</strong></p>
<p>Esta política describe qué información maneja la extensión de Chrome
&quot;LACRE&quot; y cómo se trata. Esta extensión está
diseñada para uso profesional/comercial en El Salvador, como
herramienta de apoyo sobre el portal de Facturación Electrónica del
Ministerio de Hacienda (admin.factura.gob.sv). También describe los datos que
se reciben a través de los formularios de contacto de este sitio web
(lacresv.com; ver la sección 6) y a través del canal de automatización
comercial de LACRE por WhatsApp (ver la sección 7).</p>
<h2>1. Resumen</h2>
<p><strong>Todos los datos que usted introduce en la extensión (clientes,
productos, historial de documentos, compras, inventario) se
almacenan únicamente en su propio navegador, en su propio equipo.</strong>
Esta extensión no tiene un servidor propio donde se guarden sus
datos de negocio, y el desarrollador no tiene acceso a ellos.</p>
<p>Las únicas excepciones —descritas en detalle en las secciones
siguientes— son: (a) el envío de correos, que pasa por los servidores
de Google/Microsoft porque usted vincula su propia cuenta de correo;
y (b) el sistema de licencias, que envía una huella criptográfica del
NIT de su empresa (nunca el NIT en sí) para verificar que su licencia
esté vigente.</p>
<p>Los formularios de contacto de este sitio web son independientes de la
extensión: los datos que usted envía por ellos se tratan según la
sección 6, y los datos que usted introduce dentro de la extensión
siguen almacenándose únicamente en su navegador.</p>
<h2>2. Qué información se almacena localmente</h2>
<p>Al usar la extensión, usted puede introducir:</p>
<ul>
<li><strong>Clientes:</strong> NIT/DUI, razón social, nombre comercial, dirección,
correo electrónico, teléfono, actividad económica, ubicación
geográfica.</li>
<li><strong>Productos:</strong> código, nombre, precio, existencias, tipo de venta.</li>
<li><strong>Historial de documentos (DTE):</strong> código de generación, número de
control, sello de recepción de Hacienda, y el JSON firmado completo
de cada documento emitido.</li>
<li><strong>Compras, movimientos de inventario, datos de su(s) empresa(s)
emisora(s).</strong></li>
</ul>
<p>Toda esta información se guarda con las APIs de almacenamiento local
del propio navegador (<code>chrome.storage.local</code> e IndexedDB) — el mismo
mecanismo que usa cualquier extensión para recordar sus preferencias.
<strong>Nunca se transmite a ningún servidor como parte del uso normal de
estas funciones.</strong></p>
<h2>3. Respaldo (Backup) y restauración</h2>
<p>La función &quot;Exportar respaldo&quot; genera un archivo <code>.json</code> con estos
mismos datos, que se descarga a su propio equipo (carpeta
<code>Facturacion DTE/Respaldos/</code> dentro de sus Descargas). Ese archivo
nunca se envía a ningún servidor — es responsabilidad suya
protegerlo, ya que contiene información sensible sin cifrar (el
propio botón de exportar se lo advierte antes de generar el archivo).
Las cuentas de correo vinculadas (ver sección 4) nunca se incluyen en
este respaldo.</p>
<h2>4. Cuentas de correo vinculadas (envío de documentos)</h2>
<p>Si usted decide vincular una cuenta de Gmail o Outlook para enviar
documentos por correo, la extensión usa el protocolo estándar OAuth
2.0: usted inicia sesión directamente en la página oficial de Google o
Microsoft (la extensión nunca ve ni almacena su contraseña). El
intercambio técnico del código de autorización por el token de acceso
de Gmail pasa por un proxy propio en Cloudflare Workers —
exclusivamente para no exponer una credencial de la aplicación dentro
de la extensión— que no guarda registro (log) de los tokens que
procesa. <strong>Outlook, en cambio, no utiliza ningún proxy:</strong> ese
intercambio se realiza 100% directo entre su navegador y los
servidores de Microsoft. En ambos casos, los tokens de acceso quedan
cifrados en su propio navegador con una clave que nunca sale de su
equipo.</p>
<p>Al enviar un correo, el contenido (destinatario, asunto, adjuntos) se
transmite directamente a los servidores de Google o Microsoft, igual
que si usted lo enviara desde Gmail/Outlook directamente.</p>
<h2>5. Sistema de licencias</h2>
<p>Esta extensión requiere una licencia para algunas funciones
(emisión de nuevos documentos y envío por correo; el resto de la
aplicación —incluyendo sus datos, Clientes, Productos, Historial,
Inventario, Backup/Restauración— siempre permanece disponible sin
importar el estado de la licencia).</p>
<p>Para verificar la licencia, la extensión envía a un servidor de
licenciamiento del desarrollador:</p>
<ul>
<li>Una <strong>huella criptográfica (hash SHA-256)</strong> del NIT de su empresa
— nunca el NIT en texto claro.</li>
<li>Un identificador aleatorio de su dispositivo, generado localmente
(no identifica a su persona, solo a esta instalación de la
extensión).</li>
<li>El identificador de la licencia que usted activó.</li>
<li>Al momento de activar la licencia (no en cada verificación posterior),
el secreto de activación que usted recibió al adquirirla, necesario
para validar que la activación es legítima.</li>
</ul>
<p><strong>Nunca se envía:</strong> el NIT en texto claro, la razón social, ni
ningún dato de sus Clientes, Productos, Historial, Compras o
Inventario.</p>
<p>Este servidor de licenciamiento no tiene ninguna relación con el
servidor del Ministerio de Hacienda ni con Google/Microsoft — es
exclusivamente para validar el uso autorizado de la extensión.</p>
<h2>6. Formularios del sitio web (lacresv.com)</h2>
<p>Este sitio ofrece formularios para solicitar LACRE Premium, solicitar
una cotización de licencia personalizada o hacer una consulta general.
Esta sección aplica únicamente a los datos enviados mediante esos
formularios; no aplica a los datos que usted introduce dentro de la
extensión (secciones 2 a 5).</p>
<p><strong>Datos que se reciben.</strong> Los que usted escribe en el formulario:
nombre, correo electrónico, teléfono o WhatsApp (opcional), nombre de
su empresa o negocio (opcional, solo en la solicitud de cotización),
cantidad aproximada de empresas y de dispositivos y modalidad
solicitada (solo en la solicitud de cotización), y el mensaje o
comentarios. Si usted llega a este sitio desde la extensión, se
registra únicamente que la solicitud proviene de ella; no se envía
ningún dato de la extensión, de su empresa ni de su licencia.</p>
<p><strong>Lo que no se solicita.</strong> Los formularios no piden NIT ni códigos de
licencia, y le pedimos que no los incluya en el mensaje.</p>
<p><strong>Finalidad.</strong> Responder su solicitud o consulta, preparar
cotizaciones y gestionar el proceso de adquisición y licenciamiento de
LACRE. Con esa misma finalidad, los datos que usted escribe en el
formulario se utilizan también para notificar por correo electrónico
al operador de LACRE de que hay una solicitud nueva por atender.</p>
<p><strong>Almacenamiento.</strong> Las solicitudes se reciben mediante un servicio
propio de LACRE que funciona en Cloudflare y se guardan en una base de
datos en Cloudflare. El servicio no guarda en esa base de datos la
dirección IP ni el navegador (agente de usuario) desde el que se envía
la solicitud. Para evitar abusos, limita la cantidad de solicitudes por
dirección IP usando únicamente memoria temporal, sin almacenarla.</p>
<p><strong>Conservación.</strong> Las solicitudes recibidas por los formularios web se
conservan durante 12 meses desde su recepción y después se eliminan
mediante un proceso automático. Este plazo se refiere a las solicitudes
recibidas por los formularios web. Puede pedir la eliminación anticipada
de su solicitud escribiendo a <strong><a href="mailto:aromero@lacresv.com">aromero@lacresv.com</a></strong>.</p>
<p><strong>Uso de los datos.</strong> Los datos de estos formularios no se venden ni se
usan con fines publicitarios, y este sitio no utiliza rastreadores de
analítica ni publicidad.</p>
<h2>7. Automatización comercial de LACRE por WhatsApp</h2>
<p>Además de la extensión y de los formularios de contacto (secciones 2 a
6), LACRE ofrece un canal de automatización comercial por WhatsApp
para solicitar y dar seguimiento a <strong>LACRE Premium</strong>. Este canal
funciona sobre <strong>WhatsApp Business Platform (Cloud API) de Meta</strong> y es
un servicio propio de LACRE, independiente de la extensión: nada de lo
descrito aquí accede a los datos que usted introduce dentro de la
extensión (secciones 2 a 5).</p>
<p><strong>Cómo se inicia.</strong> Usted puede solicitar LACRE Premium desde el
formulario de este sitio (que le entrega un código y un enlace para
continuar por WhatsApp) o escribiendo directamente al número comercial
de WhatsApp de LACRE.</p>
<p><strong>Datos que se reciben y procesan:</strong></p>
<ul>
<li><strong>Su número de WhatsApp</strong>, tal como lo entrega la plataforma de
Meta (sin datos adicionales de su perfil salvo que usted los
escriba).</li>
<li>Un <strong>identificador técnico de Meta</strong> para su interacción con el
número de negocio (cuando la plataforma lo proporciona); no es un
dato que identifique a la persona por sí solo.</li>
<li><strong>Metadatos de cada mensaje</strong> que usted envía (un identificador de
mensaje y su tipo), únicamente para evitar procesar el mismo mensaje
dos veces si Meta lo reintenta. Los avisos de entrega/lectura de
WhatsApp se cuentan y, para los mensajes que LACRE le envía, su estado
(enviado, entregado, leído o fallido) se anota junto a ese mensaje y
se conserva por el mismo plazo que el mensaje.</li>
<li><strong>El texto de sus mensajes de WhatsApp y de las respuestas que
recibe</strong> (tanto las del asistente automatizado como, cuando
corresponda, las del equipo de LACRE) <strong>se guarda tal como se
escribió, durante un plazo limitado de 90 días</strong>, para que una
persona del equipo pueda atender su caso, revisar el historial de la
conversación y resolver consultas o reclamos sobre su solicitud, su
pago o su licencia. Transcurrido ese plazo, los mensajes se eliminan
automáticamente. <strong>El secreto de activación de su licencia nunca se
guarda en ese historial</strong>: cuando se le reenvía por WhatsApp, el
historial registra solo un marcador, sin el secreto.</li>
<li>Además, el asistente automatizado conserva una copia <strong>editada</strong> de
los últimos turnos de la conversación (como máximo los 10 más
recientes por número): antes de guardarla, el sistema sustituye
automáticamente correos, teléfonos, códigos de solicitud, enlaces y
cadenas largas, y la recorta a unos pocos cientos de caracteres. Esa
copia editada sirve solo para que el asistente mantenga el hilo
inmediato de la conversación; al llegar nuevos mensajes, los turnos
más antiguos se eliminan automáticamente.</li>
<li><strong>Los datos de su solicitud</strong>: nombre, correo electrónico y nombre
de su empresa (los tres opcionales, igual que en el formulario web;
también pueden ser registrados por el equipo de LACRE a petición suya
durante la atención), la constancia de que usted aceptó los Términos y
Condiciones, el código público de seguimiento, el estado de la
solicitud y sus fechas.</li>
<li><strong>Datos del pago</strong>, cuando corresponda: si su solicitud llega a la
etapa de pago, se genera un enlace de pago de Wompi y se guarda su
identificador, y al confirmarse el pago se guarda el identificador
de la transacción de Wompi, el monto y la fecha de confirmación.
<strong>LACRE nunca recibe ni almacena los datos de su tarjeta</strong>; esos
datos son tratados directamente por Wompi según sus propias
condiciones (ver también la sección 4 de los
<a href="/terminos">Términos y Condiciones</a>).</li>
<li><strong>Registro interno de auditoría</strong>: qué acción ejecutó el asistente
automatizado (por ejemplo, &quot;consultar precio&quot; o &quot;vincular código&quot;) y
su resultado. Este registro se guarda sin datos personales, solo
códigos técnicos.</li>
<li>Si su caso requiere que lo atienda una persona, se registra el
motivo técnico de esa derivación.</li>
<li><strong>Registro de las acciones del equipo de LACRE</strong> sobre su caso (por
ejemplo: tomar la conversación, responderle, iniciar o completar su
solicitud, enviarle el enlace de pago, cancelar una solicitud que aún
no se pagó, reenviarle su licencia o revocarla): fecha,
acción, resultado y, cuando corresponda, el motivo. Ese registro
<strong>no incluye el texto de la conversación ni ningún secreto</strong> y se
conserva 24 meses por razones de auditoría del servicio.</li>
</ul>
<p><strong>Avisos internos al operador.</strong> Cuando ocurre un evento relevante de
su solicitud (nueva solicitud, pago recibido, o que su caso pasó a
revisión manual), LACRE envía un correo interno al operador con el
tipo de evento, el código de la solicitud y su número de WhatsApp
<strong>parcialmente oculto</strong> (por ejemplo, terminado en «…1234»). Ese aviso
interno <strong>nunca incluye</strong> el texto de su conversación, ni su correo,
ni ningún dato de pago.</p>
<p><strong>Atención por una persona.</strong> Si usted lo pide, o si el asistente
automatizado no puede resolver su caso, una persona del equipo de
LACRE puede leer el historial de su conversación (dentro del plazo de
conservación), consultar los datos de su solicitud y responderle por
el mismo WhatsApp. Mientras una persona atiende su caso, el asistente
automatizado deja de responder. Las respuestas con texto libre solo se
envían dentro de las 24 horas siguientes a su último mensaje, que es
la ventana que establece WhatsApp; fuera de ella solo se podrían usar
mensajes de plantilla aprobados por Meta.</p>
<p><strong>Finalidad.</strong> Dar seguimiento a su solicitud de LACRE Premium,
permitirle continuar la conversación por WhatsApp, atender sus
consultas y reclamos, generarle y confirmarle el pago, y contactarlo
si su caso requiere revisión manual.</p>
<p><strong>Conservación.</strong> A diferencia de las solicitudes de los formularios
de contacto (sección 6, con borrado automático a los 12 meses), en
este canal los plazos son los siguientes:</p>
<ul>
<li><strong>Texto de los mensajes de WhatsApp</strong> (sus mensajes y las respuestas
recibidas): <strong>90 días</strong>, con borrado automático.</li>
<li><strong>Registro de las acciones del equipo de LACRE</strong> sobre su caso:
<strong>24 meses</strong>, con borrado automático.</li>
<li><strong>Estado de la conversación</strong> (sin texto: su número, si la atiende el
asistente o una persona, prioridad y motivo técnico): se elimina
automáticamente cuando la conversación está inactiva y ya no quedan
mensajes suyos guardados.</li>
<li><strong>Su solicitud, el historial de transiciones y el registro de
pagos</strong>: <strong>no tienen un borrado automático programado</strong>; se
conservan mientras sean necesarios para dar seguimiento a su
solicitud, por razones de auditoría del servicio y por las
obligaciones contables que correspondan.</li>
</ul>
<p>Puede solicitar la eliminación anticipada de sus mensajes y de sus
demás datos; vea la sección 11 y la página
<a href="/eliminacion-datos">Eliminación de Datos</a>.</p>
<p><strong>Uso de sus datos.</strong> Los datos de este canal no se venden ni se usan
con fines publicitarios.</p>
<p><strong>Servicio de terceros.</strong> Este canal depende de WhatsApp Business
Platform (Meta). Al escribir al número comercial de LACRE, el
tratamiento que Meta/WhatsApp haga de su cuenta y de su uso de la
plataforma se rige por las condiciones y política de privacidad
propias de WhatsApp/Meta, que LACRE no controla.</p>
<h2>8. Portal de Hacienda (admin.factura.gob.sv)</h2>
<p>La extensión interactúa con la página del portal de Facturación
Electrónica para leer y, cuando usted lo solicita, rellenar
automáticamente datos del documento que está creando. Esta
interacción ocurre únicamente dentro de esa página oficial del
Ministerio de Hacienda — la extensión no envía esos datos a ningún
otro sitio.</p>
<h2>9. Qué NO hace esta extensión</h2>
<ul>
<li>No vende ni comparte su información con terceros con fines
publicitarios o comerciales.</li>
<li>No incluye rastreadores de analítica ni publicidad.</li>
<li>No accede a su navegación fuera del portal de Hacienda (la
extensión solo se ejecuta activamente sobre
<code>admin.factura.gob.sv</code>).</li>
<li>No recopila su ubicación, historial de navegación general, ni
ningún dato biométrico.</li>
</ul>
<h2>10. Permisos del navegador que solicita la extensión, y por qué</h2>
<table>
<thead>
<tr>
<th>Permiso</th>
<th>Para qué se usa</th>
</tr>
</thead>
<tbody><tr>
<td><code>storage</code> / <code>unlimitedStorage</code></td>
<td>Guardar sus datos localmente (sección 2).</td>
</tr>
<tr>
<td><code>tabs</code> / <code>activeTab</code> / <code>scripting</code></td>
<td>Leer/rellenar datos en la pestaña del portal de Hacienda cuando usted lo solicita.</td>
</tr>
<tr>
<td><code>downloads</code></td>
<td>Organizar y descargar PDFs/JSON de sus documentos y sus respaldos en carpetas de su elección.</td>
</tr>
<tr>
<td><code>sidePanel</code></td>
<td>Mostrar el panel de la extensión en la barra lateral de Chrome.</td>
</tr>
<tr>
<td><code>identity</code></td>
<td>El flujo de vinculación de cuenta de correo (sección 4).</td>
</tr>
</tbody></table>
<h2>11. Cómo eliminar su información</h2>
<p>Los datos almacenados por LACRE dentro del almacenamiento de la extensión se eliminan al desinstalarla. Los archivos que usted haya descargado a su equipo, como respaldos, PDF o JSON, no se eliminan automáticamente. También puede eliminar registros
individuales desde la propia interfaz de la extensión en cualquier
momento.</p>
<p>Para los datos de los formularios de contacto (sección 6) o de su
solicitud de LACRE Premium por el canal web o de WhatsApp (sección 7),
puede solicitar su eliminación escribiendo a
<strong><a href="mailto:aromero@lacresv.com">aromero@lacresv.com</a></strong>. Vea el procedimiento completo, qué
información necesitamos para localizar sus datos y las excepciones
aplicables en <a href="/eliminacion-datos">Eliminación de Datos</a>.</p>
<h2>12. Contacto</h2>
<p>Para preguntas sobre esta política, escriba a:
<strong><a href="mailto:aromero@lacresv.com">aromero@lacresv.com</a></strong></p>
</div>
  </div>
</main><footer><div class="wrap foot"><a class="brand" href="/"><img class="brand-mark" src="/assets/lacre-mark.svg" alt=""><span>LACRE</span><span class="brand-divider" aria-hidden="true"></span><img class="brand-bird" src="/assets/torogoz.png" alt="Torogoz de LACRE"></a><p>Herramientas para tu trabajo con DTE.</p><nav aria-label="Información legal"><a href="/privacidad">Privacidad</a><a href="/terminos">Términos y condiciones</a><a href="/reembolso">Reembolsos</a><a href="/eliminacion-datos">Eliminación de datos</a></nav><small>© 2026 LACRE · El Salvador</small></div></footer><script src="/assets/lacre-ui.js" defer></script></body></html>