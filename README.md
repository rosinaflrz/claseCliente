# Tarea 1 – CV Web App (HTML + Sass + JS)

Esta es una aplicación web de currículum en línea, desarrollada con **HTML**, **Sass** y **JavaScript**.  
El proyecto utiliza **Gulp** como empaquetador para automatizar la compilación de estilos, scripts, HTML y assets.  
Los datos del CV se cargan dinámicamente desde un archivo **JSON**, por lo que al actualizar la información en el JSON, el sitio se actualiza automáticamente sin necesidad de editar el HTML.

---

## 🚀 Requisitos

- **Node.js** versión 18 o superior  
- **npm** (incluido con Node.js)

---

## 📂 Estructura del proyecto

tarea1/
├─ src/
│ ├─ data/
│ │ └─ cv.json # Datos del CV
│ ├─ images/ # Imágenes (ej. avatar, proyectos) – opcional
│ ├─ js/
│ │ └─ main.js # Lógica para renderizar el CV y manejar el formulario
│ └─ sass/
│ ├─ _base.scss
│ ├─ _components.scss
│ ├─ _functions.scss
│ ├─ _mixins.scss
│ ├─ _variables.scss
│ └─ main.scss
│ └─ index.html # Plantilla principal del CV
├─ dist/ # Carpeta generada en build (no se versiona)
├─ gulpfile.js # Configuración de tareas con Gulp
├─ postcss.config.js # Configuración de PostCSS
├─ package.json # Dependencias y scripts de npm
├─ package-lock.json
└─ .gitignore


---

## ⚙️ Instalación

1. Clona el repositorio o descarga el proyecto.
2. Entra a la carpeta `tarea1/`.
3. Instala las dependencias:

```bash
npm install
```

## Uso
```bash
npm run dev
```
