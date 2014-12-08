ig.module( 
	'game.entities.mousePointer'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityMousePointer = ig.Entity.extend({
    
    size: {x: 1, y: 1},
    
    animSheet: new ig.AnimationSheet('media/ui/pixel.png', 1, 1)	,
    
	update: function() {
		this.parent();
        this.pos.x = ig.input.mouse.x
        this.pos.y = ig.input.mouse.y
	}
});

});