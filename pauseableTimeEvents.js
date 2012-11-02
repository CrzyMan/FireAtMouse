function PauseableTimeout(func, delay){
    this.func = func;
    
    var _now = new Date().getTime();
    this.triggerTime = _now + delay;
    
    this.t = window.setTimeout(this.func,delay);
    
    this.paused_timeLeft = 0;
    
    this.getTimeLeft = function(){
        var now = new Date();
        return this.triggerTime - now;
    }
    
    this.pause = function(){
        this.paused_timeLeft = this.getTimeLeft();
        window.clearTimeout(this.t);
        this.t = null;
        this.running = false;
    }
    
    this.resume = function(){
        if (this.t == null){
            this.t = window.setTimeout(this.func, this.paused_timeLeft);
            this.running = true;
        }
    }
    
    this.clearTimeout = function(){ window.clearTimeout(this.t);}
    
    this.isRunning = function(){
        return this.t!=null;
    }
}

function PauseableInterval(func, delay){
    this.func = func;
    this.delay = delay;
    
    this.triggerSetAt = new Date().getTime();
    this.triggerTime = this.triggerSetAt + this.delay;
    
    this.i = window.setInterval(this.func, this.delay);
    
    this.t_restart = null;
    
    this.paused_timeLeft = 0;
    
    this.getTimeLeft = function(){
        var now = new Date();
        return this.delay - ((now - this.triggerSetAt) % this.delay);
    }
    
    this.pause = function(){
        this.paused_timeLeft = this.getTimeLeft();
        this.clearInterval();
        this.i = null;
    }
    
    this.restart = function(sender){
        if (!sender) sender = this;
        
        sender.clearInterval();
        sender.i = window.setInterval(sender.func, sender.delay);
    }
    
    this.resume = function(){
        if (this.i == null){
            this.i = window.setTimeout(this.restart, this.paused_timeLeft, this);
        }
    }
    
    this.clearInterval = function(){
        window.clearInterval(this.i);
    }
    
    this.isRunning = function(){
        return this.i!=null;
    }
}