const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//function which return new object Circle.init to avoid typing 'new' keyword when create new Circle
function Circle(x, y, r) {
  return new Circle.init(x, y, r);
}
//function constructor
Circle.init = function (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = "rgba(18, 115, 105,0.5)";
};

//methods of Circle object
Circle.prototype = {
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  },
  move: function (e, isCollision) {
    this.x = e.clientX;
    this.y = e.clientY;
    if (isCollision) {
      this.color = "rgba(242, 169, 34,0.5)";
    } else {
      this.color = "rgba(18, 115, 105,0.5)";
    }
  },
};
//assigment prototype therefore access to all methods Circle object
Circle.init.prototype = Circle.prototype;

//creating my master circle
const circle = Circle(innerWidth / 2, innerHeight / 2, 100);

//creating N cricles
var arrayOfCircles = [];
for (let i = 0; i < 7; i++) {
  const x = Math.random() * circle.x * 2;
  const y = Math.random() * circle.y * 2;
  console.log(x, y);
  arrayOfCircles.push(Circle(x, y, 20));
}

//function which checking collision with two circles
const checkCollision = (firstCircle, secondCircle) => {
  var dx = firstCircle.x - secondCircle.x;
  var dy = firstCircle.y - secondCircle.y;
  var rSum = firstCircle.r + secondCircle.r;
  var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));
  ctx.beginPath();
  ctx.moveTo(firstCircle.x, firstCircle.y);
  ctx.font = "25px Arial";
  ctx.lineTo(secondCircle.x, secondCircle.y);
  ctx.strokeStyle = "white";
  ctx.strokeText(
    distance + " > " + (firstCircle.r + secondCircle.r),
    (firstCircle.x + secondCircle.x) / 2,
    (firstCircle.y + secondCircle.y) / 2
  );
  ctx.stroke();
  if (distance <= rSum) {
    return true;
  } else {
    return false;
  }
};

canvas.onmousemove = function (e) {
  let isCollisionWithSomeCircle;
  for (let circleIndex in arrayOfCircles) {
    if (checkCollision(circle, arrayOfCircles[circleIndex])) {
      isCollisionWithSomeCircle = true;
    }
  }
  circle.move(e, isCollisionWithSomeCircle);
};

//animation function
function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let circleIndex in arrayOfCircles) {
    arrayOfCircles[circleIndex].draw();
    checkCollision(circle, arrayOfCircles[circleIndex]);
  }
  circle.draw();
}
animation();
