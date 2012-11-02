function AnimatedSprite(config){
    
    // set Defaults
    this.fps = 1;
    
    this.frame_count = 1;
    
    this.currentFrame = 0;
    
    this.source_image = undefined;
    
    this.source_X = 0;
    this.source_Y = 0;
    
    // if configuration properties are supplied
    if (config!=null){
        for (var i in config){
            this[i] = config[i];
        }
    }
    
    if (this.frameWidth==undefined) this.frameWidth = this.source_image.width / this.frame_count;
    if (this.frameHeight==undefined) this.frameHeight = this.source_image.height;
    
    this.stepSprite = function(sender){
        if (sender==undefined) sender = this;
        sender.source_X = sender.frameWidth * sender.currentFrame;
        
        sender.currentFrame++;
        sender.currentFrame = sender.currentFrame % sender.frame_count;
    }
    
    //this.stepSprite();
    this.t = setInterval(this.stepSprite, 1000/this.fps, this);
    
    this.stopAnimation = function(){
        clearInterval(this.t);
        this.t = null;
    }
    
    this.restartAnimation = function(){
        this.stopAnimation();
        this.t = setInterval(this.stepSprite, 1000/this.fps, this);
    }
    
    this.resetFPS = function(newFPS){
        this.fps = newFPS;
        this.restartAnimation();
    }
    
    this.drawMe = function(x,y,width,height){
        ctx.drawImage(this.source_image, this.source_X, this.source_Y, this.frameWidth, this.frameHeight, x, y, width, height);
    }
    
}