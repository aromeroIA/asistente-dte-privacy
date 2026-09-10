# Política de Privacidad — Asistente de Facturación DTE

**Última actualización: [PENDIENTE — completar con la fecha real de publicación]**

Esta política describe qué información maneja la extensión de Chrome
"Asistente de Facturación DTE" y cómo se trata. Esta extensión está
diseñada para uso profesional/comercial en El Salvador, como
herramienta de apoyo sobre el portal de Facturación Electrónica del
Ministerio de Hacienda (admin.factura.gob.sv).

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

## 6. Portal de Hacienda (admin.factura.gob.sv)

La extensión interactúa con la página del portal de Facturación
Electrónica para leer y, cuando usted lo solicita, rellenar
automáticamente datos del documento que está creando. Esta
interacción ocurre únicamente dentro de esa página oficial del
Ministerio de Hacienda — la extensión no envía esos datos a ningún
otro sitio.

## 7. Qué NO hace esta extensión

- No vende ni comparte su información con terceros con fines
  publicitarios o comerciales.
- No incluye rastreadores de analítica ni publicidad.
- No accede a su navegación fuera del portal de Hacienda (la
  extensión solo se ejecuta activamente sobre
  `admin.factura.gob.sv`).
- No recopila su ubicación, historial de navegación general, ni
  ningún dato biométrico.

## 8. Permisos del navegador que solicita la extensión, y por qué

| Permiso | Para qué se usa |
|---|---|
| `storage` / `unlimitedStorage` | Guardar sus datos localmente (sección 2). |
| `tabs` / `activeTab` / `scripting` | Leer/rellenar datos en la pestaña del portal de Hacienda cuando usted lo solicita. |
| `downloads` | Organizar y descargar PDFs/JSON de sus documentos y sus respaldos en carpetas de su elección. |
| `sidePanel` | Mostrar el panel de la extensión en la barra lateral de Chrome. |
| `identity` | El flujo de vinculación de cuenta de correo (sección 4). |

## 9. Cómo eliminar su información

Toda su información se elimina al desinstalar la extensión (Chrome
borra automáticamente los datos de almacenamiento local de una
extensión desinstalada). También puede eliminar registros
individuales desde la propia interfaz de la extensión en cualquier
momento.

## 10. Contacto

Para preguntas sobre esta política, escriba a:
**[PENDIENTE — correo de contacto/soporte real]**

---

*Nota interna (quitar antes de publicar): este documento describe el
comportamiento previsto del sistema de licencias (sección 5) tal como
está implementado en el código de la extensión. El servidor de
licenciamiento (Worker de Cloudflare) ya está desplegado en staging y
la extensión ya se integró con él, con el mismo comportamiento
descrito en la sección 5 — antes de publicar esta política, confirmar
que el Worker de producción (todavía no creado) opere igual, o
ajustar la sección 5 si el diseño final cambia al pasar a producción.
Este texto no sustituye una revisión legal; se recomienda que un
abogado confirme que cumple con cualquier obligación aplicable en El
Salvador antes de publicarla.*
