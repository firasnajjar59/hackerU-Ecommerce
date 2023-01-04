class Circles {
    constructor(xpos,ypos,radius,degStart,degFinish,Color="white",lineWidth="1"){
        this.xpos=xpos
        this.ypos=ypos
        this.radius=radius
        this.degStart=degStart
        this.degFinish=degFinish
        this.Color=Color
        this.lineWidth =parseInt(lineWidth)
    }

    drawStroke(context){
        context.beginPath();
        context.lineWidth =this.lineWidth ;
        context.strokeStyle = this.Color;
        context.arc(this.xpos,this.ypos ,this.radius,this.degStart,this.degFinish);
        context.stroke();
    }
    drawFill(context){
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.Color;
        context.arc(this.xpos,this.ypos ,this.radius,this.degStart,this.degFinish);
        context.fill();
    }
    static clearBoard(canvas,context){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

}

export default Circles


