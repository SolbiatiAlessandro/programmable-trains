// START programmable-train logic
const Train = {
			x: 0,
			y: 0,
			prev_x: 0,
			prev_y: 0,
			speed_x: 1,
			speed_y: 0,
			fuel: 20,
			update(original_delta) {
				var delta = original_delta / 200; // with 200, 
						// speed = 1 is average speed
				if (this.fuel > 0) {
					this.prev_x = this.x;
					this.prev_y = this.y;
					this.x = this.x + this.speed_x * delta;
					this.y = this.y + this.speed_y * delta;
					this.fuel = this.fuel - (this.speed_x + this.speed_y ) * delta;
				}
				console.log(this.x);
				console.log(this.fuel);
		}
};
// END programmable-train logic
