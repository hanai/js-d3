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

export function render(objects, ctx, dx, dy) {
  // Clear the previous frame
  ctx.clearRect(0, 0, 2 * dx, 2 * dy);

  // for each object
  objects.forEach(object => {
    // for each face
    object.faces.forEach(face => {
      // draw the first vertex
      var P = project(face[0]);
      ctx.beginPath();
      ctx.moveTo(P.x + dx, -P.y + dy);

      // draw the other vertices
      face.forEach((vertex, vertexIdx) => {
        if (vertexIdx !== 0) {
          P = project(vertex);
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