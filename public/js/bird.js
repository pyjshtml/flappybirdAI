const gravity = 1;
function line(x0,y0,x1,y1){
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.stroke();
}
function Bird(baseWeights){
  this.x = 100;
  this.r = 18;
  this.velocity = 0;
  this.y = canvas.height / 2;
  this.score = 0;
  if(baseWeights){
    this.weights = [];
    for(let i = 0; i < baseWeights.length; i++){
      this.weights.push(baseWeights[i] + random(-0.15,0.15));
    }
  } else {
    this.weights = [];
    for(let i = 0; i < numberOfInputs; i++){
      this.weights.push(random(-1,1))
    }
  }
}
Bird.prototype.show = function () {
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
  ctx.fill();
  line(this.x,this.y-this.r/2,this.x,this.y+this.r/2);
  line(this.x-this.r/2,this.y,this.x,this.y+(this.velocity > 0 ? 1 : -1)*this.r/2);
  line(this.x+this.r/2,this.y,this.x,this.y+(this.velocity > 0 ? 1 : -1)*this.r/2);
};
Bird.prototype.up = function(){
  this.velocity -= 14;
}
Bird.prototype.guess = function(inputs){
  let sum = 0;
  inputs.forEach((vl, i) => {
    sum+=vl*this.weights[i];
  });
  // const sigmoid = sum => 1/(1+Math.pow(Math.E,-sum));
  // return sigmoid(sum);
  return sum >= 0 ? sum : 0;
}
Bird.prototype.update = function(c){
  if(this.velocity < -14){
    this.velocity = -14;
  } else if(this.velocity > 14){
    this.velocity = 14
  }
  this.velocity += gravity;
  this.y += this.velocity;
  // if(this.y+this.r > canvas.height){
  //   this.velocity = 0;
  //   this.y = canvas.height-this.r;
  // } else if (this.y-this.r < 0){
  //   this.velocity = gravity;
  //   this.y = this.r;
  // }
  this.score++;
  let input = [this.y, pipes[c].y-this.y, this.y-(pipes[c].y+pipes[c].spacingY), pipes[c].x-this.x];
  if(this.guess(input) > 1){
    this.up();
  }
}
