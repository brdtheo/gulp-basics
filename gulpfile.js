const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");

gulp.task("minify-css", () => {
  return gulp
    .src("app/css/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("app/css"));
});

gulp.task("sass", () => {
  return gulp
    .src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });

  gulp.watch("app/scss/*.scss", gulp.series(["sass", "minify-css"]));
  gulp.watch("app/*.html").on("change", browserSync.reload);
});

gulp.task("deploy", () => {
  return gulp.src("./dist/**/*").pipe(deploy());
});

gulp.task("default", gulp.series(["browser-sync"]));
