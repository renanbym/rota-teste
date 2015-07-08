
var beacons = '{ "ponto1": { "x" : 550 ,  "y": 6025 }, "ponto2": { "x" : 667 ,  "y": 6277 }, "ponto3": { "x" : 1228 ,  "y": 2911 }, "ponto4": { "x" : 1723 ,  "y": 6154 } }';
window.beacons = JSON.parse(beacons);

var nodes = {};

window.p = new PathFinding();


document.getElementById("rota_mapa").addEventListener("load", createRoute);

function createRoute(){

  window.canvas = document.createElement('canvas');

  document.getElementById("mapa").appendChild(window.canvas);

  window.ctx = window.canvas.getContext("2d");

  window.w = 4000;
  window.h = 2213;
  window.nodeSize = 3;

  window.canvas.width = 4000;
  window.canvas.height = 2213;

  window.ctx.drawImage( this , 0, 0);

  var context = window.canvas.getContext("2d");
  context.drawImage( this , 0, 0);

  var data_route = window.ctx.getImageData(0, 0, window.w, window.h);

  var pos = 0;
  for (var r = 1; r <= window.h; r += window.nodeSize){

    for (var c = 1; c <= window.w; c += window.nodeSize){

      // if ( data_route.data[pos] == 165 && data_route.data[pos + 1] == 191  && data_route.data[pos + 2] == 221 ){
      if ( data_route.data[pos] == 165 ){

        if (nodes[r] === undefined){
          nodes[r] = {};
        }

        nodes[r][c] = window.p.addNode(c, r);

        // add vertices
        if (nodes[r][c-window.nodeSize] !== undefined){
          nodes[r][c].addVertex(nodes[r][c-window.nodeSize]);
        }

        if (nodes[r-window.nodeSize] !== undefined && nodes[r-window.nodeSize][c] !== undefined){
          nodes[r][c].addVertex(nodes[r-window.nodeSize][c]);
        }


      }

      pos += 4*window.nodeSize;

    }
    pos += 4*window.w*2;

  }

  window.n = nodes;
  console.log( nodes  );

  var p1 = Object.keys(nodes)[2];
  var p2 = Object.keys(nodes[p1])[0];

  var p3 = Object.keys(nodes)[10];
  var p4 = Object.keys(nodes[p3])[0];

  var start = nodes[p1][p2];
  var end = nodes[p3][p4];

  findRoute(start, end);

  document.getElementById("rota_mapa").parentNode.removeChild(document.getElementById("rota_mapa"));

}

function findRoute(start, end){

  var rou = window.p.Solver(start,end);

  if (rou === false){
    alert("No route found");
  }else{

    window.ctx.clearRect(0, 0, window.w, window.h);
    window.ctx.beginPath();
    window.ctx.moveTo(start.x, start.y);

    for (var r = 0, rlen = route.length; r < rlen; r++){
      window.ctx.lineTo(route[r].x,route[r].y);
    }

    window.ctx.lineWidth = 3;
    window.ctx.strokeStyle = '#ff0000';
    window.ctx.stroke();

    //document.getElementById("mapa").appendChild(window.canvas);
  }
}
