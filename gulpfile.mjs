// --- モジュール読み込み ---
import gulp from 'gulp';
import { deleteSync } from 'del';
import fileInclude from 'gulp-file-include';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';

// BrowserSync インスタンス生成
const bs = browserSync.create();
const { src, dest, series, parallel, watch } = gulp;
const compileSass = gulpSass(sass);

// --- パス設定 ---
const paths = {
  html: {
    pages:   'src/html/pages/**/*.html',
    partials:'src/html/partials/**/*.html',
    dest:    'dist'
  },
  styles: {
    entry: 'src/scss/style.scss',
    watch: 'src/scss/**/*.scss',
    dest:  'dist/css'
  },
  scripts: {
    src:  'src/js/**/*.js',
    dest: 'dist/js'
  },
  clean: {
    targets: [
      'dist/**',
      '!dist',
      '!dist/images',
      '!dist/images/**'
    ]
  }
};

// --- タスク1: distフォルダのクリーン（images を除外） ---
export function clean(cb) {
  deleteSync(paths.clean.targets, { force: true });
  cb();
}

// --- タスク2: HTMLビルド ---
export function html() {
  return src(paths.html.pages)
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest(paths.html.dest))
    .pipe(bs.stream());
}

// --- タスク3: SCSS→CSSコンパイル ---
export function styles() {
  return src(paths.styles.entry, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(
      compileSass({
        includePaths: ['src/scss'],
        outputStyle: 'expanded'
      }).on('error', compileSass.logError)
    )
    .pipe(postcss([autoprefixer(), cssnano()]))
    // マップファイルも同じ dist/css に書き出す
    .pipe(sourcemaps.write('.', {
      sourceRoot: '../scss'
    }))
    .pipe(dest(paths.styles.dest))
    .pipe(bs.stream());
}

// --- タスク4: JavaScriptビルド ---
export function scripts() {
  return src(paths.scripts.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest))
    .pipe(bs.stream());
}

// --- タスク5: 開発サーバ起動 ＆ ファイル監視 ---
export function serve() {
  bs.init({
    server: { baseDir: paths.html.dest },
    port:    3000,
    notify:  false
  });

  watch(paths.html.pages,    html);
  watch(paths.html.partials, html);
  watch(paths.styles.watch,  styles);
  watch(paths.scripts.src,   scripts);
}

// --- ビルド／開発用タスク定義 ---
export const build = series(
  clean,
  parallel(html, styles, scripts)
);
export const dev = series(
  clean,
  parallel(html, styles, scripts),
  serve
);

// デフォルトタスクは開発モード
export default dev;
