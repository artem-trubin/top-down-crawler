export function checkHorizontalCollision(obj1, obj2) {
  if (obj1.xVel > 0) {
    // Going right
    if (
      obj1.right + obj1.xVel > obj2.left &&
      obj1.left + obj1.xVel < obj2.left &&
      (
        (obj1.bottom > obj2.top && obj1.bottom < obj2.bottom) ||
        (obj1.top > obj2.top && obj1.top < obj2.bottom)
      )
    ) {
      return true
    }
  } else if (obj1.xVel < 0) {
    // Going left
    if (
      obj1.left + obj1.xVel < obj2.right &&
      obj1.right + obj1.xVel > obj2.right &&
      (
        (obj1.bottom > obj2.top && obj1.bottom < obj2.bottom) ||
        (obj1.top > obj2.top && obj1.top < obj2.bottom)
      )
    ) {
      return true
    }
  }
  return false
}

export function checkVerticalCollision(obj1, obj2) {
  if (obj1.yVel > 0) {
    // Going down
    if (
      obj1.bottom + obj1.yVel > obj2.top &&
      obj1.top + obj1.yVel < obj2.top &&
      (
        (obj1.right > obj2.left && obj1.right < obj2.right) ||
        (obj1.left > obj2.left && obj1.left < obj2.right)
      )
    ) {
      return true
    }
  } else if (obj1.yVel < 0) {
    // Going up
    if (
      obj1.top + obj1.yVel < obj2.bottom &&
      obj1.bottom + obj1.yVel > obj2.bottom &&
      (
        (obj1.right > obj2.left && obj1.right < obj2.right) ||
        (obj1.left > obj2.left && obj1.left < obj2.right)
      )
    ) {
      return true
    }
  }
  return false
}
