# Google Sheets como almacenamiento del cronograma

Esta integracion conserva el portal como sitio estatico, pero guarda el avance en una hoja central. El enlace publico queda en modo consulta; para editar se necesita una clave privada.

## 1. Crear la hoja y el servicio

1. Crea una hoja de calculo nueva en Google Sheets.
2. Abre **Extensiones > Apps Script**.
3. Sustituye el contenido del editor por el archivo `Code.gs` de esta carpeta.
4. Guarda y ejecuta `configurarCronograma` una vez. Autoriza el acceso solicitado.
5. En el registro de ejecucion, copia la **clave privada de edicion**. No la publiques ni la guardes en Git.

## 2. Publicar Apps Script

1. Pulsa **Implementar > Nueva implementacion**.
2. Selecciona **Aplicacion web**.
3. Configura **Ejecutar como: yo** y permite acceso a **Cualquier usuario**.
4. Publica y copia la URL terminada en `/exec`.

La lectura es publica porque las personas que abren el portal necesitan consultar el avance. Las escrituras exigen la clave privada creada en el paso anterior.

## 3. Conectar el portal

Abre `js/cronograma-config.js` y pega la URL:

```js
window.CRONOGRAMA_CONFIG = Object.freeze({
  apiUrl: 'https://script.google.com/macros/s/IDENTIFICADOR/exec',
  refreshMs: 60000,
});
```

Publica de nuevo el sitio. La primera vez que quieras editar, pulsa **Habilitar edicion**, pega la clave y cambia una fase. Ese primer guardado crea todas las filas en Google Sheets. Desde entonces, cualquier visitante cargara los mismos datos.

## Recomendaciones

- Comparte con la gerencia el enlace normal del portal, no la clave.
- Si necesitas revocar la clave, elimina `EDIT_KEY` en **Configuracion del proyecto > Propiedades de la secuencia de comandos** y vuelve a ejecutar `configurarCronograma`.
- Cada cambio guarda una copia local de respaldo. Si Google no responde, el portal muestra el ultimo estado disponible en ese navegador y marca el error de sincronizacion.
