function GoL(id, options) {
  this.canvas = document.getElementById(id);
  this.context = this.canvas.getContext('2d');
  this.width = 50;
  this.height = 50;
  this.cellWidth = this.canvas.width / this.width;
  this.cellHeight = this.canvas.height / this.height;
  this.timingStep = options.step || 1000;
  this.delay = options.delay || 0;
  this.step = 0;

  this.begin(options.seed);
}

var Seeds = [
  {steps: 780, arr: [8015803766,5712926037,5713057109,5712926037,5847152470], width:33}, // Not Found
  {steps: 280, arr: [32,8,103], width:7}, // Acorn
  {steps: 145, arr: [2,192,71], width:8}, // Diehard
  {steps: 620, arr: [29,16,3,13,21], width:5}, // 'Infinite'
  {steps: 200, arr: [2048,10240,12632067,17874947,51573735424,51576055808, // Glider gun
    34080768, 17825792, 12582912], width:36},
  {steps: 250, arr: [3,6,2], width:3} // R-Pentomino
];

GoL.prototype = {
  drawCell: function(w, h) {
    this.context[this.state[h][w] ? 'fillRect' : 'clearRect'](
      w * this.cellWidth, h * this.cellHeight, this.cellWidth, this.cellHeight
    );
  },
  draw: function() {
    var next = [];
    if(this.step >= this.seed.steps) {
      this.step = 0;
      this.stop();
      this.begin(Seeds[~~(Math.random()*Seeds.length)]);
      return;
    }
    for (var h = 0; h < this.state.length; h++) {
      next.push([]);
      for (var w = 0; w < this.state[h].length; w++) {
        next[h][w] = this.getNextCellState(w, h);
        this.drawCell(w, h);
      }
    }
    this.step++;
    this.state = next;
  },
  begin: function(seed) {
    // Utility functions to add various padding to the seed
    function padding(a,l,f) { a.push.apply(a, Array(l).fill(f||0)); }
    function addHeight(a,s,c) { padding(a, ~~((c.height - s.arr.length) / 2), Array(c.width).fill(0)); }
    var wb = ~~((this.width - seed.width) / 2);
    var arr = [];

    // Take the seed and turn it into an array of set size, filling with 0s when needed
    addHeight(arr, seed, this);
    seed.arr.map(function(a) {
      var x = [], s = a.toString('2');
      padding(x, wb+seed.width-s.length);
      x.push.apply(x, s.split('').map(function(b) { return +b; }));
      padding(x, wb);
      arr.push(x);
    });
    addHeight(arr, seed, this);

    // Initialize some variables needed for drawing
    this.step = 0;
    this.seed = seed;
    this.state = arr;
    this.draw(); // Draw the first frame

    // Start the loop
    var ref = this;
    setTimeout(function() {
      ref.interval = setInterval(function() {
        ref.draw();
      }, ref.timingStep);
    }, this.delay);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  getNextCellState: function(x, y) {
    var ref = this;

    function val(a, b) {
      return +(ref.state[b] ? ref.state[b][a] : 0);
    }
    var cur = val(x, y);
    var an = val(x - 1, y - 1) + val(x, y - 1) + val(x + 1, y - 1) +
      val(x - 1, y) + val(x + 1, y) +
      val(x - 1, y + 1) + val(x, y + 1) + val(x + 1, y + 1);
    return cur ? an > 1 && an < 4 : an == 3;
  }
};

if (document.getElementById('gol')) {
  var gol = new GoL('gol', {
    delay: 2500,
    step: 200,
    seed: Seeds[0]
  });
}
