function GoL(id, options) {
  this.canvas = document.getElementById(id);
  this.context = this.canvas.getContext('2d');
  this.width = 50;
  this.height = 50;
  this.cellWidth = this.canvas.width / this.width;
  this.cellHeight = this.canvas.height / this.height;
  this.first = 1;

  this.init(options.arr);
  this.begin(options.delay || 0, options.step || 1000);
}

GoL.prototype = {
  drawCell: function(w, h) {
    if (this.state[h][w]) {
      this.context.fillRect(w * this.cellWidth, h * this.cellHeight, this.cellWidth, this.cellHeight);
    } else {
      this.context.clearRect(w * this.cellWidth, h * this.cellHeight, this.cellWidth, this.cellHeight);
    }
  },
  draw: function() {
    var next = [];
    for (var h = 0; h < this.state.length; h++) {
      next.push([]);
      for (var w = 0; w < this.state[h].length; w++) {
        next[h][w] = this.getNextCellState(w, h);
        this.drawCell(w, h);
      }
    }
    this.state = next;
  },
  init: function(arr) {
    this.state = [];
    for (var i = 0; i < this.height; i++) {
      this.state.push([]);
      for (var j = 0; j < this.width; j++) {
        if (arr) {
          this.state[i][j] = arr[i] ? arr[i][j] || 0 : 0;
        } else {
          this.state[i][j] = +(Math.random() < 0.1);
        }
      }
    }
  },
  begin: function(delay, step) {
    this.draw(); // Draw the first frame
    this.delay = delay;
    this.step = step;
    var ref = this;
    setTimeout(function() {
      ref.interval = setInterval(function() {
        ref.draw();
      }, step);
    }, delay);
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
    arr: {
      17:[0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1],
      18:[0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      19:[0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,1,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      20:[0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      21:[0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1]
    }
  });
}
