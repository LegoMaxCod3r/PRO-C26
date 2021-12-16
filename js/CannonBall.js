class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.image2 = loadImage("./assets/cannonSmoke.png");
    this.trayectory = [];
    World.add(world, this.body);
  }

  shoot() {
     var newAngle = cannon.angle - 28;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();

    if(this.body.velocity.x>0 && pos.x>10)
    {
      let position = [pos.x, pos.y];
      this.trayectory.push(position);
    }

    for(let x = 0; x<this.trayectory.length; x++)
    {
      image(this.image2,this.trayectory[x][0],this.trayectory[x][1],5,5);
    }
  }

  remove(index)
  {
    Matter.Body.setVelocity(this.body,{x:0,y:0});
    setTimeout(()=>
    {
      Matter.World.remove(world, this.body);
      delete balls[index];
    },25)

  }
}
