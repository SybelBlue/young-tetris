class Tableau {
    static colors = ["#C9A5F3", "#F87060", "#FFB400", "#42BFDD", "#A6FFA1"]
    static gridUnit;
    static gridPosition = [200, 500];
    static textSize = 30;

    constructor(gridX, gridY, shape) {
        Tableau.gridUnit = Renderer.textWidth("0", Tableau.textSize) * 1.15;
        this.position = [gridX * Tableau.gridUnit, gridY * Tableau.gridUnit];
        this.shape = shape;
        this.color = random(Tableau.colors);
        this.labels = this.shape
            .reduce(
                function(acc, size) {
                    acc.labels.push(Array.from({ length: size }, () => {
                        const i = random(Array.range(acc.remaining.length));
                        const out = acc.remaining[i];
                        acc.remaining.splice(i, 1);
                        return out + 1;
                    }));
                    acc.last += size;
                    return acc;
                }, 
                { labels: [], remaining: Array.range(Array.sum(this.shape)) }
            )
            .labels;
        this.labelStrings = this.labels
            .map(row => Array.sum(row.map(x => x + ""), ""));
    }

    draw() {
        Renderer.push(this);
        Renderer.translate(...Tableau.gridPosition);
        Renderer.translate(...this.position);
        Renderer.newRenderable(Layers.Tableau, _stubs => {
            fill(color(this.color));
            beginShape();
            vertex(0, 0);
            for (let i = 0; i < this.shape.length; i++) {
                const len = this.shape[i];
                vertex(len * Tableau.gridUnit, i       * Tableau.gridUnit);
                vertex(len * Tableau.gridUnit, (i + 1) * Tableau.gridUnit);
            }
            vertex(0, this.shape.length * Tableau.gridUnit);
            endShape(CLOSE);

            fill("#102542");
            textSize(Tableau.textSize);
            for (let i = 0; i < this.labels.length; i++) {
                text(this.labelStrings[i], 2, i * Tableau.gridUnit + Renderer.textHeight(Tableau.textSize) * 0.8);
            }
        });
        Renderer.pop(this);
        console.log(this.labels);
    }
}