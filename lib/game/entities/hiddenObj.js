ig.module( 
	'game.entities.hiddenObj'
)
.requires(
	'impact.entity',
    'plugins.scaled-alpha-hitmask'
)
.defines(function(){

EntityHiddenObj = ig.Entity.extend({
	
	size: {x: 24, y: 24},
	_wmScalable: true,
    scoreValue: 10,
    isFindable: false,
    hitmask: null,

    center: function(){
        return {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2}
    },

	init: function(x, y, settings) {
        this.parent(x, y, settings)
		if(this.name){
		    this.animSheet = new ig.AnimationSheet('media/hiddenObjs/'+this.name+'.png', this.size.x, this.size.y)
		}
		else{
		    this.name = 'orange'
            this.animSheet = new ig.AnimationSheet('media/hiddenObjs/orange.png', 24, 24)
		}
		this.addAnim('idle', 1, [0])

        this.hitmask = new ig.ScaledAlphaHitmask();
        this.hitmask.scale = 1;
        this.hitmask.verticalFrames = 1;                // normal | hover | down | disabled
        //this.hitmask.drawHitmask = true;                // set to 'false' to disable drawing of hitmask over btn image
        this.hitmask.setImage(this.animSheet.image);
	},

    hittest: function(){
        if ((ig.input.mouse.x > this.pos.x && ig.input.mouse.x < (this.pos.x + this.size.x)) &&
                (ig.input.mouse.y > this.pos.y && ig.input.mouse.y < (this.pos.y + this.size.y)))
            {
                // if we have hitmask defined then check if we inside or outside of hitmask,
                // if no hitmask then we already inside and return true
                if (this.hitmask) {
                    return this.hitmask.hittest(ig.input.mouse.x - this.pos.x, ig.input.mouse.y - this.pos.y, 0 /* we only interested in frame 0 so no need to pass any other*/);
                } else {
                    return true;
                }
            }
            return false;  
    },
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		//var mpos = {x: ig.input.mouse.x, y: ig.input.mouse.y}
        //if(ig.input.pressed('leftClick') && this.touches(ig.game.mousePointer))
        var listed = (ig.game.shouldBeFoundObjectsArr().indexOf(this.name) != -1 && ig.game.shouldBeFoundObjectsArr().indexOf(this.name) < 4)
        if(ig.input.pressed('leftClick') && this.hittest() && listed === true)
        {
            this.kill()
        }
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
	},

    kill: function(){
        ig.game.timer.reset()
        var score = this.scoreValue
        if(ig.game.timer.delta() < 0){
            ig.game.combo = ig.game.combo + 1
            score = score * ig.game.combo
            ig.game.score = ig.game.score + score
        }

        ig.game.updateHiddenObjNames(this)

        ig.game.spawnEntity(EntityFlyingScore, this.center().x , this.center().y, {text: '+'+score}, ig.Font.ALIGN.CENTER)

        this.parent()
    }
});

});
