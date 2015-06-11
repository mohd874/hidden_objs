ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    // Levels
    'game.levels.test',
    'game.levels.test2',

    // Entities
    'game.entities.flyingScore',
    
    // Plugins
    //'plugins.perpixel',

    // Debug
    'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/font_ar.png' ),

    timer: new ig.Timer(3),
    score: 0,
    combo: 0,
    hiddenObjNames: [],
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.MOUSE1, 'leftClick')
        this.loadLevel(LevelTest2)
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		if(this.timer.delta() >= 0){
            this.timer.pause()
            this.combo = 0
        }
		// Add your own, additional update code here
       this.updateStatics()

        // TEMP
	},

    updateHiddenObjNames: function(entity){
       //this.hiddenObjNames = this.removeAtIndex(this.hiddenObjNames, entity.nameIndex) 
       this.hiddenObjNames[entity.nameIndex] = undefined
    },
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Add your own drawing code here
		
        this.drawTimer()
		this.drawScore()
		this.font.draw( 'Combo: '+this.combo, 10, 30, ig.Font.ALIGN.LEFT )
	},

    drawTimer: function(){
		this.font.draw( 'Timer: '+this.timer.delta().toFixed(2), 10, 10, ig.Font.ALIGN.LEFT )
    },

    drawScore: function(){
        this.font.draw('Score: '+this.score, 10, 20, ig.Font.ALIGN.LEFT)
    },

    updateStatics: function(){
        var names = ''
        var i = 0
        var loop = 0
        var statics = this.getEntitiesByType('EntityStaticText')
        while(i < 4 && loop < this.hiddenObjNames.length){
            var n = this.hiddenObjNames[loop]
            var t = statics[i]
            if(n){
                t.text = n
                i++
            }
            loop++
        }
        
        while(i < 4){
            statics[i].text = ""
            i++
        }
        //this.font.draw('Find These: '+names, 8, 224, ig.Font.ALIGN.LEFT);
    },

    loadLevel: function(level){
        this.parent(level)
        this.hiddenObjNames = []
        var objs = this.getEntitiesByType('EntityHiddenObj')
        for (i in objs){
            this.hiddenObjNames.push(objs[i].name)
            objs[i].nameIndex = this.hiddenObjNames.length - 1
        }
        ig.log(this.hiddenObjNames)
    },

    removeAtIndex: function (arr, i){
        var t = arr.splice(i+1)
        arr.pop()
        return arr.concat(t)
    },

    shouldBeFoundObjectsArr: function(){
        var arr = []
        var i = 0
        var len = 0
        while(arr.length < 4 && i < this.hiddenObjNames.length){
            var n = this.hiddenObjNames[i]
            if(n){
                arr.push(n)
            }
            i++
        }
        return arr
    }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 540, 720, 1 );

});
