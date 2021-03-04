class Tableau {
    static colors = ["#C9A5F3", "#F87060", "#FFB400", "#42BFDD", "#A6FFA1"]
    static textSize = 30;

    get position() { return [this.gridX * Grid.unit, this.gridY * Grid.unit]; }

    constructor(gridX, gridY, shape) {
        this.gridX = gridX;
        this.gridY = gridY;
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
        Renderer.translate(...this.position);
        Renderer.newRenderable(Layers.Tableau, _stubs => {
            fill(color(this.color));
            beginShape();
            vertex(0, 0);
            for (let i = 0; i < this.shape.length; i++) {
                const len = this.shape[i];
                vertex(len * Grid.unit, i       * Grid.unit);
                vertex(len * Grid.unit, (i + 1) * Grid.unit);
            }
            vertex(0, this.shape.length * Grid.unit);
            endShape(CLOSE);

            fill("#102542");
            textSize(Tableau.textSize);
            for (let i = 0; i < this.labels.length; i++) {
                text(this.labelStrings[i], 2, i * Grid.unit + Renderer.textHeight(Tableau.textSize) * 0.8);
            }
        });
        Renderer.pop(this);
    }

    contactPoints() {
        let points = [];
        for (let i = 0; i < this.shape.length - 1; i++) {
            const diff = this.shape[i] - this.shape[i + 1];
            for (let j = 0; j < diff; j++) {
                points.push([this.shape[i] + j - diff, i])
            }
        }

        for (let i = 0; i < Array.last(this.shape); i++) {
            points.push([i, this.shape.length - 1]);
        }

        return points.map(arr => [this.gridX + arr[0], this.gridY + arr[1] + 1]);
    }
}