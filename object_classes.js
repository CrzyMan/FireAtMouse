/** DEPENDENCIES
 * vectors
 * arrays+
 */

/**
 * Bullet Class
 */
function Bullet(sender, props){
    this.parent = sender;
    if (this.parent == undefined)
        throw "No parent given for Bullet";
    
    this.position = new Vector2d();
    this.velocity = new Vector2d();
    this.rotation = 0;
    this.radius = 5;
    
    for (p in props){
        this[p] = props[p];
    }
    
    /*
     * Updates the game object
     */
    this.update = function(){
        this.position = this.position.add(this.velocity);
        if (this.position.x < 0 - canvas.width/2 - 10 || this.position.x > canvas.width/2 + 10 ||
            this.position.y < 0 -canvas.height/2 - 10 || this.position.y > canvas.height/2+ 10){
            this.parent.bullets.removeElement(this);
        }
    }
    
    /*
     * Draws the game object on a given context
     */
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
        
    }
}

/**
 * Ship Class
 */
function Ship(){
    this.bullets = [];
    this.enemies = [];
    this.position = new Vector2d();
    this.velocity = new Vector2d();
    this.dimensions = new Vector2d(10,10);
    this.rotation = 0;
    
    /*
     * Updates the game object
     */
    this.update = function(){
        ship.rotation = Mouse_tracker.position.angle();
        
        for (var b=this.bullets.length-1; b>=0; b--){
            this.bullets[b].update();
        }
        
        for (var e=this.enemies.length-1; e >=0; e--){
            this.enemies[e].update();
        }
    }
    
    /*
     * Draws the game object on a given context
     */
    this.draw = function(){
        ctx.save();
        //ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.strokeRect(-this.dimensions.x/2, -this.dimensions.y/2, this.dimensions.x, this.dimensions.y);
        ctx.beginPath();
        ctx.arc(0,0,36, 0,Math.PI*2);
        ctx.closePath();
        ctx.stroke();
        //_ctx.stroke();
        ctx.restore();
        
        for ( var b=0; b<this.bullets.length; b++){
            this.bullets[b].draw();
        }
        
        for (var e=0; e<this.enemies.length; e++){
            this.enemies[e].draw();
        }
    }
    
    /**
     * Fires a bullet
     */
    this.fire = function(){
        ship.bullets.push(new Bullet(ship,{
            position: ship.position,
            velocity: new Vector2d().vector_from_angle(ship.rotation).scale(2)
        }));
    }
    
    /**
     * Makes new Enemy
     */
    this.newEnemy = function(){
        ship.enemies.push(new Enemy(ship));
    }
}

/**
 * Enemy Class
 */
function Enemy(sender){
    this.parent = sender || ship;
    this.bullets = [];
    this.dimensions = new Vector2d(10,10);
    
    this.getNewPosition = function(){
        var newp = new Vector2d();
        /*
         * two cases
         * x-max*(-1)^Math.floor(Math.random()*2)
         * y-max
         *
         * (x-max*(-1)^Math.floor(Math.random()*2))
         * (y-max*(-1)^Math.floor(Math.random()*2))
         */
        var side = Math.floor(Math.random() * 4);
        switch (side){
            case 0:
                newp.x = canvas.width/2 + this.dimensions.x/2;
                newp.y = Math.random()*(canvas.height + this.dimensions.y*2) - canvas.height/2 - this.dimensions.y;
                break;
            case 1:
                newp.x = Math.random()*(canvas.width + this.dimensions.x*2) - canvas.width/2 - this.dimensions.x;
                newp.y = -canvas.height/2 - this.dimensions.y/2;
                break;
            case 2:
                newp.x = -(canvas.width/2 + this.dimensions.x/2);
                newp.y = -(Math.random()*(canvas.height + this.dimensions.y*2) - canvas.height/2 - this.dimensions.y);
                break;
            case 3:
                newp.x = -(Math.random()*(canvas.width + this.dimensions.x*2) - canvas.width/2 - this.dimensions.x);
                newp.y = -(-canvas.height/2 - this.dimensions.y/2);
                break;
        }
        return newp;
    }
    
    this.position = this.getNewPosition();
    this.velocity = this.position.norm().scale(-1);
    this.rotation = this.position.angle();
    
    /*
     * Updates the game object
     */
    this.update = function(){
        this.position = this.position.add(this.velocity);
        
        //check if colliding with parent circle
        if (this.position.distanceFrom(this.parent.position) <= 36 + this.dimensions.x/2){
            this.parent.enemies.removeElement(this);
            // TODO: damgage
        }
        
        // check if colliding with a bullet
        for (var b=this.parent.bullets.length-1; b>=0; b--){
            // if bullet and enemy colliding
            if (this.position.distanceFrom(this.parent.bullets[b].position) <= this.dimensions.x){
                this.parent.bullets.splice(b,1);
                this.parent.enemies.removeElement(this);
                return;
            }
        }
    }
    
    /*
     * Draws the game object on a given context
     */
    this.draw = function(){
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.strokeRect(-this.dimensions.x/2, -this.dimensions.y/2, this.dimensions.x, this.dimensions.y);
        ctx.fillStyle = "white";
        ctx.fillRect(-this.dimensions.x/2, -this.dimensions.y/2, this.dimensions.x, this.dimensions.y);
        ctx.restore();
    }
    
    /**
     * Fires a bullet, not yet...
     *
    this.fire = function(){
        ship.bullets.push(new Bullet(ship,{
            position: ship.position,
            velocity: new Vector2d().vector_from_angle(ship.rotation).scale(4)
        }));
    }
    /* */
}