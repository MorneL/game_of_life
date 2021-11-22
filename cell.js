class Cell {
  constructor(world, x, y, alive, gui_cell){
    this.world = world;
    this.x = x;
    this.y = y;
    this.alive = alive;
    this.gui_cell = gui_cell;
    this.setColor();
    this.addClickListener();
  }


  dead(){
    !this.alive;
  }

  toggle(){
    this.alive = !this.alive;
    this.setColor();
  }

  setColor(){
    if (this.alive) {
      this.gui_cell.className = "cell alive-cell"
    } else {
      this.gui_cell.className = "cell dead-cell"
    }
  }

  cells(){
    return this.world.cells
  }

  neighbours(){
    var neighbours = []
    var above_row = this.cells()[this.y-1] || this.cells()[this.cells().length - 1];

    neighbours.push(above_row[this.x-1] || above_row[above_row.length - 1])
    neighbours.push(above_row[this.x])
    neighbours.push(above_row[this.x+1] || above_row[0])

    var same_row = this.cells()[this.y];
    neighbours.push(same_row[this.x-1] || same_row[same_row.length - 1]);
    neighbours.push(same_row[this.x+1] || same_row[0]);

    var below_row = this.cells()[this.y+1] || this.cells()[0];
    neighbours.push((below_row)[this.x-1] || (below_row)[below_row.length - 1])
    neighbours.push((below_row)[this.x])
    neighbours.push(((below_row)[this.x+1] || (below_row)[0]))
    
    return neighbours;
  }

  alive_neighbours(){
    return this.neighbours().filter(neighbour => neighbour.alive)
  }

  addClickListener(){
    var this_cell = this;
    this.gui_cell.addEventListener('click', function(){
      this_cell.toggle();
    })
  }
}
