
$(document).ready(function(){
	
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();
	
	var cw = 15;
	var d;
	var food;
    var score;
    var my_timer;
    var timer = 100;
	
	var snake_array; 
	// --------------------------------- BEGIN THE GAME ----------------------------------------------
	function init()
	{
        // timer = prompt("Please choose the speed snake (default normal : 100, fast : 50, very fast < 50)");
        // if (isNaN(timer) || (empty(timer)) ){
        // timer = 100;
		d = "right"; //default direction
		create_snake();
		create_food();
		score = 0;
        level = 1;
	// --------------------------------- TIMER  ----------------------------------------------	
		//Lets move the snake now using a timer which will trigger the draw function
		//every 60ms
		if(typeof my_timer != "undefined") clearInterval(my_timer); { // stop the execution
            my_timer = setInterval(draw, timer); 
            }
        
	}
	init();
	// --------------------------------- CREATE SNAKE ----------------------------------------------
	function create_snake()
	{
		var length = 5; 
		snake_array = []; 
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			snake_array.push({x: i, y:0});
		}
	}
	// --------------------------------- CREATE FOOD ----------------------------------------------
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		//This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
	}
	
	// --------------------------------- DRAW THE SNAKE AND CANVAS----------------------------------------------
	function draw()
	{
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "white";
        ctx.strokeRect(0, 0, w, h);
		
		//Pop out the tail cell and place it infront of the head cell
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		//position de la tete du serpent
		//We will increment it to get the new head position
        //Lets add proper direction based movement now
        
        switch(d){
            case "right" :
                nx++;
            break;
            case "left" :
                nx--;
            break;
            case "up" :
                ny--;
            break;
            case "down" :
                ny++;
            break;
        }
// --------------------------------- GAME OVER ----------------------------------------------
        // 2 CONDITIONS :
        // -  if the snake hits the wall
		// - if the head of the snake bumps into its body, the game will restart
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || getCollision(nx, ny, snake_array))
		{
            alert("Game over");
            init();
			return;
		}
// --------------------------------- SNAKE EAT THE FOOD ----------------------------------------------		
		//si la position de la tete du serpent match avec celle de la pomme, 
        //on creer une nouvelle partie du corps et une nouvelle pomme 
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
            create_food();            
		}
		else
		{
			var tail = snake_array.pop(); // on garde le dernier element dans 'tail'Remove the last element of an array:
			tail.x = nx; tail.y = ny;
		}
		snake_array.unshift(tail); //Add new items 'tail' to the beginning of an array:
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			//Lets draw 10px wide cells
			draw_cell(c.x, c.y, "black");
		}
// --------------------------------- DRAWTHE FOOD ----------------------------------------------	
		draw_cell(food.x, food.y, "magenta");
// --------------------------------- DRAW THE SCORE ----------------------------------------------	
        
        var score_text = "Score : " + score;
        ctx.fillText(score_text, 10, h-5);
        ctx.font = "15px Arial ";
	}
	
// --------------------------------- GENERIC FUNCTION TO draw CELL ----------------------------------------------	
	function draw_cell(x, y, color)
	{
		ctx.fillStyle = color;
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
// --------------------------------- COLLISION  ----------------------------------------------	
    // SI LES coordonnes x et y existent dans le tableau snake, il y a collision

    function getCollision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
             return true;
		}
		return false;
    }
 // ---------------------------------REPLAY----------------------------------------------	

    $("#replay_button").on('click', function() {
        init();
    });  
// ---------------------------------KEYBOARD CONTROL (ascii key)----------------------------------------------	
	$(document).keydown(function(e){
        var key = e.which;
		if(key == "37" && d != "right") {
            d = "left"; 
        } else if(key == "38" && d != "down") {
            d = "up";
        } else if(key == "39" && d != "left") {
            d = "right";
        } else if(key == "40" && d != "up"){
            d = "down";
        } 
	})	
})