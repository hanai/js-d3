(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["d3"] = factory();
	else
		root["d3"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _cube = __webpack_require__(1);

	var _cube2 = _interopRequireDefault(_cube);

	var _vertex = __webpack_require__(2);

	var _render = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  Cube: _cube2.default,
	  Vertex: _vertex.Vertex,
	  Vertex2D: _vertex.Vertex2D,
	  render: _render.render
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vertex = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cube = function Cube(center, side) {
	  _classCallCheck(this, Cube);

	  var d = side / 2;

	  this.vertices = [new _vertex.Vertex(center.x - d, center.y - d, center.z + d), new _vertex.Vertex(center.x - d, center.y - d, center.z - d), new _vertex.Vertex(center.x + d, center.y - d, center.z - d), new _vertex.Vertex(center.x + d, center.y - d, center.z + d), new _vertex.Vertex(center.x + d, center.y + d, center.z + d), new _vertex.Vertex(center.x + d, center.y + d, center.z - d), new _vertex.Vertex(center.x - d, center.y + d, center.z - d), new _vertex.Vertex(center.x - d, center.y + d, center.z + d)];

	  this.faces = [[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]], [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]], [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]], [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]], [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]], [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]];
	};

	exports.default = Cube;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vertex = exports.Vertex = function Vertex(x, y, z) {
	  _classCallCheck(this, Vertex);

	  this.x = x;
	  this.y = y;
	  this.z = z;
	};

	var Vertex2D = exports.Vertex2D = function Vertex2D(x, y) {
	  _classCallCheck(this, Vertex2D);

	  this.x = parseFloat(x);
	  this.y = parseFloat(y);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = render;

	var _vertex = __webpack_require__(2);

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

	  return new _vertex.Vertex2D(r * M.x, r * M.z);
	}

	function render(objects, ctx, dx, dy) {
	  // Clear the previous frame
	  ctx.clearRect(0, 0, 2 * dx, 2 * dy);

	  // for each object
	  objects.forEach(function (object) {
	    // for each face
	    object.faces.forEach(function (face) {
	      // draw the first vertex
	      var P = project(face[0]);
	      ctx.beginPath();
	      ctx.moveTo(P.x + dx, -P.y + dy);

	      // draw the other vertices
	      face.forEach(function (vertex, vertexIdx) {
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

/***/ }
/******/ ])
});
;