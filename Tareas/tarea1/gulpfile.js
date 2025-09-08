/* eslint-disable */
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const htmlmin = require('gulp-htmlmin');
const gulpIf = require('gulp-if');
const esbuild = require('esbuild');
const browserSync = require('browser-sync').create();

// ⚠️ Ojo: 'del' y 'gulp-imagemin' son ESM. Los cargamos con import() dentro de funciones.
const paths = {
  html: 'src/**/*.html',
  images: 'src/images/**/*',
  data: 'src/data/**/*.json',
  sass: 'src/sass/main.scss',
  sassAll: 'src/sass/**/*.scss',
  js: 'src/js/main.js', // entrada JS (sin TS)
  out: 'dist',
};

const isProd = process.env.NODE_ENV === 'production';

/* Limpia dist/ (usa import dinámico porque 'del' es ESM) */
async function clean() {
  const { deleteAsync } = await import('del');
  return deleteAsync([paths.out]);
}

/* Compila Sass → CSS + PostCSS (autoprefixer y minificación en prod) */
function styles() {
  return src(paths.sass, { sourcemaps: !isProd })
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer(), ...(isProd ? [cssnano()] : [])]))
    .pipe(dest(`${paths.out}/assets`, { sourcemaps: !isProd }))
    .pipe(browserSync.stream());
}

/* Empaqueta JS con esbuild */
async function scripts() {
  await esbuild.build({
    entryPoints: [paths.js],
    bundle: true,
    sourcemap: !isProd,
    minify: isProd,
    target: 'es2018',
    outdir: `${paths.out}/assets`,
  });
}

/* Copia/minifica HTML */
function html() {
  return src(paths.html)
    .pipe(gulpIf(isProd, htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(dest(paths.out));
}

/* Copia JSON (datos) */
function data() {
  return src(paths.data).pipe(dest(`${paths.out}/data`));
}

async function images() {
  // En producción: importa dinámicamente gulp-imagemin y optimiza
  if (isProd) {
    const { default: imagemin } = await import('gulp-imagemin');
    return src(paths.images)
      .pipe(imagemin())
      .pipe(dest(`${paths.out}/assets/images`));
  }
  // En desarrollo: solo copia sin optimizar
  return src(paths.images).pipe(dest(`${paths.out}/assets/images`));
}


/* Servidor + live reload sobre dist/ */
function serve() {
  browserSync.init({
    server: { baseDir: paths.out },
    open: false,
    notify: false,
  });

  watch(paths.sassAll, styles);
  watch('src/js/**/*.js', series(scripts, reload));
  watch([paths.html, paths.data, paths.images], series(parallel(html, data, images), reload));
}

function reload(done) {
  browserSync.reload();
  done();
}

/* Tareas compuestas */
const build = series(clean, parallel(styles, scripts, html, data, images));
const dev = series(build, serve);

/* Exports */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.data = data;
exports.images = images;
exports.build = build;
exports.dev = dev;
