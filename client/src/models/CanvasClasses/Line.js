class Line {
    constructor(xpos,ypos,x_moveTo,y_moveTo,Color="white",lineWidth="1"){
        this.xpos=xpos
        this.ypos=ypos
        this.x_moveTo=x_moveTo
        this.y_moveTo=y_moveTo
        this.Color=Color
        this.lineWidth =parseInt(lineWidth)
    }

    drawLine(context){
        context.beginPath();
        context.lineWidth = this.lineWidth ;
        context.strokeStyle = this.Color;
        context.moveTo(this.xpos,this.ypos)
        context.lineTo(this.x_moveTo,this.y_moveTo);
        context.stroke();
    }
  
    static clearBoard(canvas,context){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

}

export default Line


