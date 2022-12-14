// Импорт модуля GULP
import gulp from "gulp";
// Импорт путей
import {path} from "./gulp/config/path.js";
// Импорт плагинов
import {plugins} from "./gulp/config/plugins.js";

// Глобальная переменная
global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins,
};

// Импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {zip} from "./gulp/tasks/zip.js";
import {images} from "./gulp/tasks/images.js"

// Наблюдатель за изменением в файлах
const watcher = () => {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, gulp.parallel(html, scss));
    gulp.watch(path.watch.scss, gulp.parallel(html, scss));
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
};

const mainTasks = gulp.parallel(copy, html, scss, js, images);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

export {dev, build, deployZIP};

// Выполнение сценариев
gulp.task("default", dev);
