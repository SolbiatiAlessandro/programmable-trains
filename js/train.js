// START programmable-train logic
const Train = {
			x: 3,
			y: 1,
			prev_x: 3,
			prev_y: 1,
			speed: 1,
			fuel: 1000,
		    _steps_to_move: 100,
			update(delta, map, railTile, trainTile ) {
				this._steps_to_move = this._steps_to_move - (this.speed * delta * 0.2);
				if (this.fuel > 0 && this._steps_to_move < 0) {
					var prev_prev_x = this.prev_x;
					var prev_prev_y = this.prev_y;
					this.prev_x = this.x;
					this.prev_y = this.y;
					var next_possible_rails = [[1,0],[-1,0],[0,1],[0,-1]];
					var next_x;
					var next_y;
					next_possible_rails.forEach(function(xy){
						var new_x = this.x + xy[0];
						var new_y = this.y + xy[1];
						var t = map.getTileAt(new_x, new_y);
						if(t != null && t.index == railTile.index
							&& !(new_x == prev_prev_x && new_y == prev_prev_y) 
							&& !(new_x == this.x && new_y == this.y)){
							//;debugger
							next_x = new_x;
							next_y = new_y;
						}
					}.bind(this));
					if (next_x != null && next_y != null){
						//;debugger
						map.putTileAt(trainTile, next_x, next_y);
						map.putTileAt(railTile, this.x, this.y);
						this.x = next_x;
						this.y = next_y;
					}
					this.fuel = this.fuel - (this.speed) * delta;
					this._steps_to_move = 100;
				}
				//console.log(this.x);
				//console.log(this._steps_to_move);
				//console.log(this.fuel);
		}
};
// END programmable-train logic
