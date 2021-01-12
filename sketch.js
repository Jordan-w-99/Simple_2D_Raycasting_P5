const obstacles = [
  {
    x1: 50,
    y1: 55,
    x2: 350,
    y2: 61
  },
  {
    x1: 50,
    y1: 50,
    x2: 100,
    y2: 150
  },
  {
    x1: 50,
    y1: 370,
    x2: 350,
    y2: 70,
  },
  {
    x1: 50,
    y1: 55,
    x2: 51,
    y2: 360,
  },
]

let user = []


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  updateUserRays();
  drawUserRays();


  for (let o of obstacles) {
    line(o.x1, o.y1, o.x2, o.y2);
  }
}

function updateUserRays() {
  user = [];

  const rad = 100;
  const inc = TWO_PI / 2048;

  for (let i = 0; i < TWO_PI; i += inc) {
    const x1 = mouseX;
    const y1 = mouseY;
    const x2 = mouseX + rad * cos(i);
    const y2 = mouseY + rad * sin(i);

    let ray = {
      x1,
      y1,
      x2,
      y2
    };
    const intersection = checkRayCollision(ray);

    if (intersection) {
      ray.x2 = intersection.x;
      ray.y2 = intersection.y;
    }

    user.push(ray);
  }
}

function drawUserRays() {
  for (let r of user) {
    push();

    line(r.x1, r.y1, r.x2, r.y2);
    pop();
  }
}

function checkRayCollision(ray) {
  let nearestCollisionPoint;
  let nearestDist = 200;

  for (let o of obstacles) {
    collisionPoint = getLineLineIntersection(ray, o);
    if (collisionPoint) {
      if (dist(collisionPoint.x, collisionPoint.y, ray.x1, ray.y1) < nearestDist) {
        nearestCollisionPoint = collisionPoint;
        nearestDist = dist(collisionPoint.x, collisionPoint.y, ray.x1, ray.y1);
      }
    }
  }

  return nearestCollisionPoint;
}

function getLineLineIntersection(l1, l2) {
  const x1 = l1.x1;
  const x2 = l1.x2;
  const x3 = l2.x1;
  const x4 = l2.x2;

  const y1 = l1.y1;
  const y2 = l1.y2;
  const y3 = l2.y1;
  const y4 = l2.y2;


  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (den == 0) return;

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;


  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {

    let x = x1 + t * (x2 - x1);
    let y = y1 + t * (y2 - y1);

    return {
      x,
      y
    };
  }

  return;
}