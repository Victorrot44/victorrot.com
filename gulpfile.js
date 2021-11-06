/**
 * Dependencias de Desarrollo.
 */
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const image = require("gulp-image");

/**
 * Rutas de las Carpetas para desarrollo
 * y producción.
 */
const folders = {
  src: "src/",
  dist: "dist/",
  node: "node_modules/",
  assets: "assets/",
};

/**
 * Servidor Gulp + BrowserSync
 */
gulp.task("server", () => {
  browserSync.init({
    server: "./dist",
  });
  // Observar los cambios en y actualiza
  gulp.watch(folders.src + "scss/*.scss", gulp.series("scss"));
  gulp.watch(folders.src + "html/**/*", gulp.series("html"));
  gulp.watch(folders.src + "js/*.js", gulp.series("js"));
  gulp.watch(folders.dist + "*.html").on("change", browserSync.reload);
});

/**
 * Convertir archivos scss a css en la
 * carpeta destino.
 */
gulp.task("scss", () => {
  let resources = [folders.src + "scss/**/*"];
  let output = folders.dist + folders.assets + "css";

  return gulp
    .src(resources)
    .pipe(sass())
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

/**
 * Generar paginas HTML en la carpeta destino.
 */
gulp.task("html", () => {
  let resources = [folders.src + "html/*.html"];
  let output = folders.dist;

  return gulp
    .src(resources)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
        indent: true,
      })
    )
    .pipe(gulp.dest(output));
});

/**
 * Generar Scripts en la carpeta destino.
 */
gulp.task("js", () => {
  let resources = [
    folders.node + "bootstrap/dist/js/bootstrap.min.js",
    folders.node + "jquery/dist/jquery.min.js",
    folders.node + "@popperjs/core/dist/umd/popper.min.js",
    folders.node + "@fortawesome/fontawesome-free/js/all.min.js",
    folders.node + "jquery-aniview/dist/jquery.aniview.js",
    folders.src + "js/**/*",
  ];
  let output = folders.dist + folders.assets + "js";

  return gulp.src(resources).pipe(gulp.dest(output)).pipe(browserSync.stream());
});

/**
 * Minimizar imagenes
 */
gulp.task("imgmin", () => {
  let resources = [folders.src + "images/*"];
  let output = folders.dist + folders.assets + "images";

  return gulp
    .src(resources)
    .pipe(image())
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

/**
 * Iniciar Todo.
 */
gulp.task("start", gulp.series("scss", "html", "js", "server"));
