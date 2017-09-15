import "../../views/home/index.ejs";
let map = {
    cols: 8,
    rows: 8,
    tsize: 64,
    tiles: [
        1, 3, 3, 3, 1, 1, 3, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 2, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 2, 1, 1, 1, 1,
        1, 1, 1, 1, 2, 1, 1, 1,
        1, 1, 1, 1, 2, 1, 1, 1,
        1, 1, 1, 0, 0, 1, 1, 1
    ],
    getTile: function(col, row) {
        return this.tiles[row * map.cols + col]
    }
};

global.startApp = function(container) {

  console.log("Here is the container:", container);
    for (let c = 0; c < map.cols; c++) {
        for (let r = 0; r < map.rows; r++) {
            let tile = map.getTile(c, r);
            if (tile !== 0) { // 0 => empty tile
                context.drawImage(
                    tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    c * map.tsize, // target x
                    r * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
};
