ig.module( 
	'game.entities.flyingScore'
)
.requires(
	'impact.entity',
    'impact.font'
)
.defines(function(){

EntityFlyingScore = ig.Entity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings)
        if(settings.text){
            this.text = settings.text
        }
        this.targetY = this.pos.y - 20

	    this.font = ig.game.font
	},
	
	update: function() {
		this.parent();
        if(this.pos.y > this.targetY){
            this.pos.y = this.pos.y - 0.5
        }
        else{
            this.kill()
        }
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	    this.font.draw(this.text, this.pos.x, this.pos.y)	
	}
});

});
