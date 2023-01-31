const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass')); //All in sass function
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function compileCSS( done ) {

    //CSS Compilation task
    //1. Identify the source file
    //2. Compile the file
    //3. Save the file .css

    //.pipe() <-- next step
    //sass({ outputStyle: 'compressed' }) <-- minify the .css file

    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') );

    done();
}

function processImages( done ) {
    //Image processing task
    src('src/images/**/*')
        .pipe( dest('build/images') );
    done();
} 

function watchFileChanges() {
    //Watch for file changes
    watch( 'src/scss/**/*.scss', compileCSS ); //<-- all the .scss files in the folder
    watch( 'src/images/**/*', processImages );
}

exports.compileCSS = compileCSS;
exports.processImages = processImages;
exports.watchFileChanges = watchFileChanges;
exports.default = series( processImages, compileCSS, watchFileChanges );

// Default taks --> Just run gulp in the terminal to the tasks you've specified
// Series --> Run the tasks in order
// Parallel --> Run the tasks in parallel