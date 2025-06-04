let sourceImg=null;
let maskImg=null;

// change these three lines as appropiate
let sourceFile = "input_2.jpg";
let maskFile   = "mask_2.png";
let outputFile = "output_2.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
  textImg = loadImage("texture.png");
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  textImg.loadPixels();
}

let X_STOP = 1920;
let Y_STOP = 1080;

let renderCounter=0;
function draw () {
  let num_lines_to_draw = 40;
  // get one scanline
  for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<1080; j++) {
    for(let i=0; i<X_STOP; i++) {
      colorMode(RGB);
      let pix = sourceImg.get(i, j);
      // create a color from the values (always RGB)
      let col = color(pix);
      let mask = maskImg.get(i, j);
      let tex = textImg.get(i, j);

      if(mask[0] < 128) {
        set(i, j, pix);
      }
      else {
        let new_col = [0, 0, 0, 255];
        // for(let k=0; k<2; k++) {
        //   new_col[k] = map(40, 0, 100, pix[k], tex[k]);
        // }

        new_col[0] = map(70, 0, 100, pix[0], tex[0]);
        new_col[1] = map(60, 0, 100, pix[1], tex[1]);
        new_col[2] = map(80, 0, 100, pix[2], tex[2]);

        // let new_col = color(h, s,  newBrt);
        set(i, j, new_col);
      }
    }
  }
  renderCounter = renderCounter + num_lines_to_draw;
  updatePixels();

  // print(renderCounter);
  if(renderCounter > Y_STOP) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
  //saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}