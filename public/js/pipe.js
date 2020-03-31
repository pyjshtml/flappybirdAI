function Pipe(){
  this.spacingX = pipeSettings.spacingX;
  this.spacingY = pipeSettings.spacingY;
  this.width = pipeSettings.width;
  this.speed = pipeSettings.speed;
  this.x = canvas.width;
  this.y = Math.floor(Math.random()*(canvas.height-this.spacingY));
}
Pipe.prototype.show = function () {
  ctx.fillStyle = "#FFF";
  ctx.fillRect(this.x,0,this.width,this.y);
  ctx.fillRect(this.x,this.y+this.spacingY,this.width,canvas.height);
};
Pipe.prototype.update = function () {
  this.x -= this.speed;
}
