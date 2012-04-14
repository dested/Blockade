

function Manager(mainCanvas, resize) {
    Engine.canvasWidth = $(window).width();
    Engine.canvasHeight = $(window).height();
    window.Manager = this;

    this.mainCanvas = mainCanvas;

    this.forceResize = resize;

    this.tickCount = 0;
    this.drawTickCount = 0;



    var self = this; //internetexplorer doesnt take a this param in setinterval
    this.tick = function () {
        if (self.loading) return;

        self.tickCount++;
        try {
            //main game tick
        }
        catch (exc) {
            var txt = "There was an error on this page.\n\n";
            txt += "Error description: " + exc.message + "\n\n";
            txt += "Stack: " + exc.stack + "\n\n";
            txt += "Click OK to continue.\n\n";

            alert(txt);
            throw exc;
        }
        finally {

        }

    };
    this.onClick = function () {

    };
    this.onMouseMove = function () {

    };

    this.draw = function (canvas) {

        _H.save(canvas);

        this.drawTickCount++;

        _H.restore(canvas);

    };

}

