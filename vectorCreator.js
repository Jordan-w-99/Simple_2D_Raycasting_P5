class VectorCreator {
    constructor() {
        this.lines = [];
        this.drawing = false;
        this.currentStart;
    }

    draw() {
        background(240);
        stroke(50);
        strokeWeight(2);

        if (this.drawing) {
            line(this.currentStart.x, this.currentStart.y, mouseX, mouseY);
        }

        for (let l of this.lines) {
            line(l.x1, l.y1, l.x2, l.y2);
        }

        noStroke();
        textAlign(LEFT, TOP);
        textSize(30);
        text("EDIT MODE", 10, 10);

        textAlign(RIGHT, TOP);
        textSize(20);
        text("'Enter' = New Shape\n'Spacebar' = Save\n'C' = Clear\n'Z' = Undo", width - 10, 10);

    }

    getVectors() {
        return this.lines;
    }

    mousePressed() {
        if (!this.drawing) {
            this.drawing = true;
        }
        else {
            this.lines.push({
                x1: this.currentStart.x,
                y1: this.currentStart.y,
                x2: mouseX,
                y2: mouseY,
            });
        }
        this.currentStart = createVector(mouseX, mouseY);
    }

    keyPressed() {
        if (keyCode == ENTER) {
            this.drawing = false;
        }
        else if (key == 'c') {
            this.lines = [];
        }
        else if (key == 'z') {
            if(this.lines.length > 0){
                this.lines.splice(this.lines.length - 1, 1);
                
                
                if(this.lines.length == 0){
                    this.drawing = false;
                }
                else{
                    this.currentStart.x = this.lines[this.lines.length - 1].x2;
                    this.currentStart.y = this.lines[this.lines.length - 1].y2;
                }
            }
        }
        // else if(key == " "){
        //     this.saveLines();
        // }
    }

    // saveLines(){
    //     saveJSON({lines: this.lines}, "lines.json");
    // }
}