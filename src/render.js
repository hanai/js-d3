import {Vertex2D} from './vertex';

// Orthographic View
/*
function project(M) {
  return new Vertex2D(M.x, M.z);
}
*/

// Perspective View
function project(M) {
  // distance between the camera and the plane
  var d = 200;
  var r = d / M.y;

  return new Vertex2D(r * M.x, r * M.z);
}

/*
function project(M, theta, C, E) {
  const {sin, cos} = Math;
  const dx = cos(theta.y) * (sin(theta.z) * (M.y - C.y) + cos(theta.z) * (M.x - C.x)) - sin(theta.y) * (M.z - C.z);
  const dy = sin(theta.x) * (cos(theta.y) * (M.z - C.z) + sin(theta.y) * (sin(theta.z) * (M.y - C.y) + cos(theta.x) * (M.x - C.x))) + cos(theta.x) * (cos(theta.x) * (M.y - C.y) - sin(theta.z) * (M.x - C.x));
  const dz = cos(theta.x) * (cos(theta.y) * (M.z - C.z) + sin(theta.y) * (sin(theta.z) * (M.y - C.y) + cos(theta.x) * (M.x - C.x))) - sin(theta.x) * (cos(theta.x) * (M.y - C.y) - sin(theta.z) * (M.x - C.x));

  const tX = (dx - E.x)*(E.z / dz);
  const tY = (dy - E.y)*(E.z / dz);

  return new Vertex2D(tX, tY);
}
*/

export function render(objects, ctx, dx, dy) {
  // Clear the previous frame
  ctx.clearRect(0, 0, 2 * dx, 2 * dy);

  // for each object
  objects.forEach(object => {
    // for each face
    object.faces.forEach(face => {
      face.forEach((vertex, vertexIdx) => {
        var P = project(vertex);

        if (vertexIdx === 0) {
          // draw the first vertex
          ctx.beginPath();
          ctx.moveTo(P.x + dx, -P.y + dy);
        } else {
          // draw the other vertices
          ctx.lineTo(P.x + dx, -P.y + dy);
        }
      });

      // close the path and draw the face
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    });
  });
}