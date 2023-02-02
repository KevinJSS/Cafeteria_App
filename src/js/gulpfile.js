const { src, dest, watch, series } = require('gulp');

// CSS & SASS Compilation
const sass = require('gulp-sass')(require('sass')); //All in sass function
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Image Processing
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function compileCSS( done ) {

    //CSS Compilation task
    //1. Identify the source file
    //2. Compile the file
    //3. Save the file .css

    //.pipe() <-- next step
    //sass({ outputStyle: 'compressed' }) <-- minify the .css file

    src('../scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('../../build/css') );
    done();
}

function processImages( done ) {

    //Image processing task
    //1. Identify the source files
    //2. Optimize the images
    //3. Save the files

    src('../images/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('../../build/images') );
    done();
} 

function webpConversion( ) {

    //Webp conversion task
    //1. Identify the source files (jpg & png) 
    //2. Convert the images to webp
    //3. Save the files

    return src('../images/**/*.{png,jpg}')
        .pipe( webp({ quality: 50 }) )
        .pipe( dest('../../build/images') );
}

function avifConversion() {
    
        //Avif conversion task
        //1. Identify the source files (jpg & png) 
        //2. Convert the images to avif
        //3. Save the files
    
        return src('../images/**/*.{png,jpg}')
            .pipe( avif({ quality: 50 }) )
            .pipe( dest('../../build/images') );
}

function dev() {
    //Watch for files changes
    watch( '../scss/**/*.scss', compileCSS ); //<-- all the .scss files in the folder
    watch( '../images/**/*', processImages );
}

exports.compileCSS = compileCSS;
exports.processImages = processImages;
exports.webpConversion = webpConversion;
exports.avifConversion = avifConversion;
exports.dev = dev;
exports.default = series( processImages, webpConversion, avifConversion, compileCSS, dev );

// Default taks --> Just run gulp in the terminal to the tasks you've specified
// Series --> Run the tasks in order
// Parallel --> Run the tasks in parallel