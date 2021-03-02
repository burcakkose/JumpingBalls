let unit;
const UnitHeightRatio = 3;
const unitW = 150;
const COLS = createCols("https://coolors.co/12171c-7bff57-ff619b-647382");
const sw = 3;
let bg;

function setup() {
	createCanvas(windowWidth, windowHeight);
	unit = createGraphics(unitW, unitW * UnitHeightRatio);
	DrawUnit(unit);
	ellipseMode(CENTER);
	stroke(COLS[0]);
	strokeWeight(sw);
	
	bg = createGraphics(width, height);
  bg.noStroke();
	bg.fill(255,15);
  for (let i = 0; i < 500000; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise(x*0.01, y*0.01)*1 + 1;
		
    bg.rect(x, y, s, s);
  } 
}

function draw() {
	background(COLS[3]);
	const unitH = unitW * (unit.height / unit.width);
	const spanX = unitW;
	const spanY =unitH - unitW / sqrt(3) /2;
	const groundY = unitW / sqrt(3) /2;
	const cycle = 200;
	const fc = (frameCount % cycle)  / cycle;
	const fr = fc * TAU;
	
	
	let countY = 0;
	for(let y = -spanY; y < height; y += spanY)
	{
		let offsetX = countY % 2 == 0 ? 0 : spanX/2;
		for(let x = -offsetX - spanX * 2; x < width; x += spanX)
		{
			image(unit,x,y,unitW, unitH);
		}
		countY++;
	}
	
	////confused.....
	
	const bounceH = unitH *0.3;
	
	countY = 0;
	for(let y = -spanY; y < height; y += spanY)
	{
		let offsetX = countY % 2 == 0 ? 0 : spanX/2;
		for(let x = -offsetX - spanX * 2; x < width; x += spanX)
		{
			let ballS = spanX / 5;
			let ballX = x + unitW / 2 + fc *spanX  * 2 ;
			let ballY = y + groundY -1 * ( abs(sin(fr)) * bounceH + ballS/4);
			let shadowX = ballX;
			let shadowY = y + groundY;
			let shadowS = map(abs(sin(fr)), 0, 0.5, ballS, 0, true);
	
			fill(COLS[0]);
			if(shadowS > 0)ellipse(shadowX, shadowY, shadowS, shadowS/2);
			fill(COLS[1]);
			circle(ballX, ballY, ballS);
		}
		countY++;
	}


	countY = 0;
	for(let y = -spanY; y < height; y += spanY)
	{
		let offsetX = countY % 2 == 1 ? 0 : spanX/2;
		for(let x = -offsetX - spanX * 2; x < width + spanX * 2; x += spanX)
		{
			let ballS = spanX / 5;
			let ballX = x + unitW / 2 - fc *spanX * 2 ;
			let ballY = y + groundY + abs(sin(fr +  PI/2)) * bounceH + ballS/2;
			let shadowX = ballX;
			let shadowY = y + groundY;
			let shadowS = map(abs(sin(fr + PI/2)), 0, 0.5, ballS, 0, true);
			fill(COLS[0]);
			if(shadowS > 0)ellipse(shadowX, shadowY, shadowS, shadowS/2);
			fill(COLS[2]);
			circle(ballX, ballY, ballS);
		}
		countY++;	
	}
	
	image(bg,0,0);
}



function DrawUnit(gra)
{
	gra.clear();
	gra.stroke(COLS[0]);
	gra.strokeWeight(sw);
	
	const w = gra.width;
	const h1 = w / sqrt(3);
	const h2 = gra.height - h1 ;
	gra.fill(255,50);
	gra.quad(w/2,0, w, h1/2, w/2, h1, 0, h1/2);
	
	const dx = 2;
	const dy = 8;
	const spanW = w / 2 / dx;
	const spanH =  h2 / dy;
	
	
	gra.noFill();
	for(let i = 0; i < 2; i ++){
		gra.push();
		gra.translate(w/2 * i, h1 * 0.5 * (i+1));
		gra.shearY(pow(-1,(2 - i )) * PI/6);
		gra.fill(255,i * 20);
		for(let yi = 0; yi < dy; yi ++)
		{
			for(let xi = 0; xi < dx; xi++)
			{
				let x = xi * spanW;
				let y = yi * spanH;
				let index = yi + xi;
				gra.rect(x,y, spanW, spanH);
			}
		}
		gra.pop();
	}
}


function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}