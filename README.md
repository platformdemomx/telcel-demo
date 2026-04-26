# telcel-demo

Demo interactiva de Terraform Enterprise para sesión de ventas.

## Publicar en GitHub Pages — paso a paso

### 1. Crear el repositorio en GitHub
- Ve a github.com e inicia sesión con tu cuenta `platformdemomx`
- Clic en el botón verde **New** (o el **+** arriba a la derecha → New repository)
- Nombre del repositorio: `telcel-demo`
- Visibilidad: **Public** (necesario para GitHub Pages gratis)
- NO marques ninguna opción adicional (sin README, sin .gitignore)
- Clic en **Create repository**

### 2. Subir los archivos
GitHub te va a mostrar instrucciones. Usa la opción de **subir archivos directamente**:
- Clic en **uploading an existing file**
- Arrastra toda la carpeta del proyecto
- En el campo de commit escribe: `primera versión`
- Clic en **Commit changes**

### 3. Activar GitHub Pages con Actions
- Ve a **Settings** del repositorio (pestaña arriba)
- En el menú izquierdo: **Pages**
- En "Source" selecciona: **GitHub Actions**
- Guarda

### 4. Esperar el deploy
- Ve a la pestaña **Actions** del repositorio
- Verás un workflow corriendo (tarda ~2 minutos)
- Cuando aparezca el ✓ verde, tu demo está publicada

### 5. Tu link
```
https://platformdemomx.github.io/telcel-demo/
```

Ese link funciona en cualquier teléfono o computadora.
Cada vez que actualices un archivo y lo subas, el deploy corre automático.

## Actualizar la demo
1. Edita el archivo `src/App.jsx` con los cambios
2. Súbelo al repositorio (reemplaza el archivo existente)
3. El workflow de Actions corre automático y publica en ~2 minutos
