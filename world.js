class World {
  constructor(gui, gui_size, cell_count, simulation_delay){
    this.gui = gui;
    this.cells = null;
    this.gui_size = gui_size;
    this.cell_count = cell_count;
    this.simulation = null;
    this.simulation_delay = simulation_delay;
  }

  stop_simulation(){
    if(this.simulation){clearInterval(this.simulation);}
    this.gui.style.border = "solid black 2px";
  }

  simulate(delay){
    this.stop_simulation();
    var that = this;
    this.simulation = setInterval(function(){that.update_cells()}, delay);
    this.gui.style.border = "solid lightgreen 2px";
  }

  update_world(gui_size, cell_count){
    this.gui_size = gui_size;
    this.cell_count = cell_count;
    this.setup_world();
  }

  setup_world(){
    this.gui.style.width = this.gui_size;
    this.gui.style.height = this.gui_size;
    this.gui.innerHTML = "";
    this.generate_cells();
  }

  generate_cells(){
    this.cells = [];

    for(let y = 0; y < this.cell_count; y++){
      this.cells[y] = [];
      for(let x = 0; x < this.cell_count; x++){
        var rectangle = document.createElement("div");
        rectangle.className = "cell";
        rectangle.style.top = (y * (this.gui_size / this.cell_count));
        rectangle.style.left = (x * (this.gui_size / this.cell_count));
        rectangle.style.width = (this.gui_size / this.cell_count - 2);
        rectangle.style.height = (this.gui_size / this.cell_count - 2);
        this.gui.appendChild(rectangle);
        this.cells[y][x] = new Cell(this, x, y, false, rectangle);
      }
    }
  }

  update_cells(){
    var cells_to_toggle = this.cells.flat().filter(function(cell){
      if(cell.alive && [2,3].includes(cell.alive_neighbours().length)){ return false };
      if(cell.dead && cell.alive_neighbours().length == 3){ return true };
      if(cell.alive){ return true };
    });

    for (let i = 0; i < cells_to_toggle.length; i++) {
      var cell_to_toggle = cells_to_toggle[i];
      cell_to_toggle.toggle();
    }
  }
}
