$(document).ready(function(){
  var gui_size = 300;
  var cell_count = 15;
  var simulation_delay = 100;
  var world_element = document.getElementById("world");
  var world = new World(world_element, gui_size, cell_count, simulation_delay);
  world.setup_world();

  document.getElementById('run_button').addEventListener('click', function(){
    world.simulate(simulation_delay);
  })

  document.getElementById('stop_button').addEventListener('click', function(){
    world.stop_simulation();
  })

  document.getElementById('clear_button').addEventListener('click', function(){
    world.update_world(gui_size, cell_count);
    world.stop_simulation();
  })

  document.getElementById("gui_size_slider").oninput = function() {
    gui_size = this.value;
    world.update_world(gui_size, cell_count);
    world.stop_simulation();
  }

  document.getElementById("cell_count_slider").oninput = function() {
    cell_count = this.value;
    world.update_world(gui_size, cell_count);
    world.stop_simulation();
  }

  document.getElementById("simulation_delay_slider").oninput = function() {
    simulation_delay = this.value;
    world.simulate(simulation_delay);
    world.stop_simulation();
  }
})
