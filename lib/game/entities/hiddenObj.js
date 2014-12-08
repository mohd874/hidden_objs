ig.module( 
	'game.entities.hiddenObj'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHiddenObj = ig.Entity.extend({
	
	size: {x: 24, y: 24},
	_wmScalable: true,
    scoreValue: 10,
    isFindable: false,

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
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		var mpos = {x: ig.input.mouse.x, y: ig.input.mouse.y}
        if(ig.input.pressed('leftClick') && this.touches(ig.game.mousePointer))
        {
            ig.log(this)
            ig.log(ig.game.mousePointer)
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
