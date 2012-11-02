/** DEPENDENCIES
 * vectors
 * arrays+
 */

/**
 * Bullet Class
 */
BULLET_default_fill = "black";
BULLET_default_lineColor = "black";
BULLET_default_lineWidth = 1;
function Bullet(sender, props){
    this.points = 1;
    this.parent = sender;
    if (this.parent == undefined)
        throw "No parent given for Bullet";
    
    this.position = new Vector2d();
    this.velocity = new Vector2d();
    this.rotation = 0;
    this.radius = 5;
    this.ctxProperties = {
        fillColor: BULLET_default_fill,
        lineColor: BULLET_default_lineColor,
        lineWidth: BULLET_default_lineWidth
    };
    
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
        ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.ctxProperties.fillColor;
            ctx.lineWidth = this.ctxProperties.lineWidth;
            ctx.strokeStyle = this.ctxProperties.lineColor;
            ctx.arc(this.position.x, this.position.y, this.radius, 0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        ctx.restore();
    }
}

/**
 * Ship Class
 */
function Ship(props){
    this.canFireBomb = false;
    this.score = 0.1;
    
    this.healthBar = new ProgressBar();
    this.healthBar.position = new Vector2d(canvas.width/2 - 125, -canvas.height/2 + 5);
    this.healthBar.dimensions = new Vector2d( 115, 20);
    this.healthBar.value = this.healthBar.max;
    
    this.invincible = false;
    
    this.bullets = [];
    this.enemies = [];
    
    this.position = new Vector2d();
    this.velocity = new Vector2d();
    this.dimensions = new Vector2d(10,10);
    this.rotation = 0;
    
    if (props){
        for (var p in props){
            this[p] = props[p];
        }
    }
    
    /*
     * Updates the game object
     */
    this.update = function(){
        ship.rotation = Mouse_tracker.position.angle();
        
        // round off score to the tenth
        this.score = Math.round(this.score*10)/10;
        
        for (var b=this.bullets.length-1; b>=0; b--){
            this.bullets[b].update();
        }
        
        for (var e=this.enemies.length-1; e >=0; e--){
            this.enemies[e].update();
        }
    }
    
    /*
     * Draws the ship
     */
    this.draw = function(){
        ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.rotation);
            ctx.strokeRect(-this.dimensions.x/2, -this.dimensions.y/2, this.dimensions.x, this.dimensions.y);
            ctx.beginPath();
            ctx.arc(0,0,36, 0,Math.PI*2);
            ctx.closePath();
            ctx.strokeRect(10,-5,10,10);
        ctx.stroke();
        
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
        var XOff = 26*Math.cos(ship.rotation);
        var YOff = 26*Math.sin(ship.rotation);
        var pos = new Vector2d(ship.position.x + XOff, ship.position.y + YOff);
        ship.bullets.push(new Bullet(ship,{
            position: pos,
            velocity: new Vector2d().vector_from_angle(ship.rotation).scale(2)
        }));
    }
    
    this.fireBomb = function(){
        var offset = Math.random()
        for (var i=0; i<Math.PI*2; i+=.1){
            ship.bullets.push( new Bullet(ship, {
                position: ship.position,
                velocity: new Vector2d().vector_from_angle(i+offset).scale(2),
                points: 0.1
            }));
        }
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
ENEMY_default_fill = "white";
ENEMY_default_lineColor = "black";
ENEMY_default_lineWidth = 1;
function Enemy(sender){
    this.parent = sender || ship;
    this.bullets = [];
    this.dimensions = new Vector2d(10,10);
    this.ctxProperties = {
        fill: ENEMY_default_fill,
        strokeStyle: ENEMY_default_lineColor,
        strokeWidth: ENEMY_default_lineWidth
    };
    
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
        var side = Math.floor(Math.random() * 2);
        switch (side){
            case 0:
                newp.x = Math.pow(-1, Math.floor(Math.random() * 2))*(canvas.width/2 + this.dimensions.x/2);
                newp.y = Math.random()*(canvas.height + this.dimensions.y*2 - canvas.height/2 - this.dimensions.y);
                break;
            case 1:
                newp.x = Math.random()*(canvas.width + this.dimensions.x*2 - canvas.width/2 - this.dimensions.x);
                newp.y = Math.pow(-1, Math.floor(Math.random() * 2))*(canvas.height/2 + this.dimensions.y/2);
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
            this.parent.healthBar.value--;
        }
        
        // check if colliding with a bullet
        for (var b=this.parent.bullets.length-1; b>=0; b--){
            // if bullet and enemy colliding
            if (this.position.distanceFrom(this.parent.bullets[b].position) <= this.dimensions.x){
                if (!this.parent.invincible) this.parent.score += this.parent.bullets[b].points;
                
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

/**
 * ProgressBar Class
 */
PROGRESSBAR_default_bgColor = "red";
PROGRESSBAR_default_barColor = "green";
PROGRESSBAR_default_lineWidth = 1;
PROGRESSBAR_default_lineColor = "black";
function ProgressBar(props){
    this.max = 100;
    this.value = 0;
    this.position = new Vector2d();
    this.dimensions = new Vector2d();
    this.ctxProperties = {
        bgColor: PROGRESSBAR_default_bgColor,
        barColor: PROGRESSBAR_default_barColor,
        lineWidth: PROGRESSBAR_default_lineWidth,
        lineColor: PROGRESSBAR_default_lineColor
    };
    
    if (props){
        for (var p in props){
            this[p] = this.ctxProperties[p];
        }
    }
    
    this.draw = function(){
        ctx.save();
            // background
            ctx.fillStyle = this.ctxProperties.bgColor;
            ctx.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
            
            // bar
            ctx.fillStyle = this.ctxProperties.barColor;
            ctx.fillRect(this.position.x, this.position.y, this.dimensions.x*(this.value/this.max), this.dimensions.y);
            
            // outline
            ctx.strokeStyle = this.ctxProperties.lineColor;
            ctx.lineWidth = this.ctxProperties.lineWidth;
            ctx.strokeRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        ctx.restore();
    }
}