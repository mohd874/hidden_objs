ig.module( 
	'game.entities.staticText'
)
.requires(
	'impact.entity',
    'impact.font'
)
.defines(function(){

EntityStaticText = ig.Entity.extend({
	_wmDrawBox: true,
	_wn_BoxColor: "#FF4400",
	size: {x: 64, y: 16},
	init: function(x, y, settings) {
        this.parent(x, y, settings)
        if(settings.text){
            this.text = settings.text
        }else{
            this.text = "Static Text"
        }

	    this.font = new ig.Font( 'media/font_ar.png' )
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	    this.font.draw(this.text, this.pos.x, this.pos.y)	
	}
});

});