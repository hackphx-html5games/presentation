dojo.provide("mwe.box2d.Entity");

dojo.declare("mwe.box2d.Entity", null, {
        id: 0,
        x: 0,
        y: 0,
        angle: 0,
        center: 0,
        restitution : 0.3,
	    density : 1.0,
	    friction : 0.9,
	    linearDamping : 0,
		angularDamping : 0,
		staticBody : false,
		color: 'rgba(128,128,128,0.5)',
		hidden: false,
		
        constructor: function(/* Object */args){
            dojo.safeMixin(this, args);
        },
        update: function(state){
            dojo.mixin(this, state);
        },
        draw: function(ctx){
        	
          //black circle in entity's location 	
          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(this.x * SCALE, this.y * SCALE, 4, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          
          //yellow circle in entity's geometric center
          ctx.fillStyle = 'yellow';
          ctx.beginPath();
          ctx.arc(this.center.x * SCALE, this.center.y * SCALE, 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();        
        },
        build : function(def) {
          if (def.radius) {
            return new CircleEntity(def);
          } else if (def.points) {
            return new PolygonEntity(def);
          } else if (def.img) {
            return new ImageEntity(def);
          }else {
            return new RectangleEntity(def);
          }
        }
    });
