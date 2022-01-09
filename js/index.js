var config = {
	type: Phaser.WEBGL,
	width: 10000,
	height: 800,
	backgroundColor: '#2d2d2d',
	parent: 'phaser-example',
	pixelArt: true,
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var controls;
var marker;
var map;
var train;
var shiftKey;
var selectedTile;
var trainTile;
var desertTile;
var railTile;
var paintedTrain;

function preload ()
{
	this.load.image('tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');
	this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/desert.json');
}

function create ()
{

	map = this.make.tilemap({ key: 'map' });
	train = Object.create(Train);

	// The first parameter is the name of the tileset in Tiled and the second parameter is the key
	// of the tileset image used when loading the file in preload.
	var tiles = map.addTilesetImage('Desert', 'tiles');

	// You can load a layer from the map using the layer name from Tiled ('Ground' in this case), or
	// by using the layer index. Since we are going to be manipulating the map, this needs to be a
	// dynamic tilemap layer, not a static one.
	var layer = map.createDynamicLayer('Ground', tiles, 0, 0);

	selectedTile = map.getTileAt(2, 3);
	trainTile = map.getTileAt(2, 3);
	desertTile = map.getTileAt(5, 5);
	railTile = map.getTileAt(23, 1);

	for(let i = 3; i < 14; i++){
		map.putTileAt(railTile, i, 1);
		map.putTileAt(railTile, i, 5);
	}
	for(let i = 1; i < 6; i++){
		map.putTileAt(railTile, 13, i);
		map.putTileAt(railTile, 3, i);
	}


	marker = this.add.graphics();
	marker.lineStyle(2, 0x000000, 1);
	marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

	this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

	var cursors = this.input.keyboard.createCursorKeys();
	var controlConfig = {
		camera: this.cameras.main,
		left: cursors.left,
		right: cursors.right,
		up: cursors.up,
		down: cursors.down,
		speed: 0.5
	};
	controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

	shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

}

function update (time, delta)
{

	controls.update(delta);

	var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

	// Rounds down to nearest tile
	var pointerTileX = map.worldToTileX(worldPoint.x);
	var pointerTileY = map.worldToTileY(worldPoint.y);

	// Snap to tile coordinates, but in world space
	marker.x = map.tileToWorldX(pointerTileX);
	marker.y = map.tileToWorldY(pointerTileY);

	if (this.input.manager.activePointer.isDown)
	{
		if (shiftKey.isDown)
		{
			selectedTile = map.getTileAt(pointerTileX, pointerTileY);
		}
		else
		{
			map.putTileAt(selectedTile, pointerTileX, pointerTileY);
			console.log(pointerTileX, pointerTileY);
			;debugger
		}
	}
	train.update(delta, map, railTile, trainTile);
}
