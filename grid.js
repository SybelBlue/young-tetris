class Grid {
    static dimensions = [16, 30]
    static unit;

    constructor(x, y) {
        Grid.unit = Renderer.textWidth("0", Tableau.textSize) * 1.15;
        this.position = [x, y];

        this.tableauxMask = Array.from({length: Grid.dimensions[1]}, () => 0);
        this.tableaux = [];

        ([   new Tableau(0, 0, [4, 2, 1]),
            new Tableau(6, 0, [4, 2, 2, 1]),
            new Tableau(12, 0, [2, 2])
        ]).forEach(t => this.placeTableau(t))
    }

    draw() {
        Renderer.push(this);
        Renderer.translate(...this.position);
        this.tableaux.forEach(t => t.draw())

        Renderer.newRenderable(Layers.Grid, _stubs => {
            fill("#290E2F");
            rect(0, 0, ...Grid.dimensions.map(x => x * Grid.unit));
        });
        Renderer.pop(this);
    }

    placeTableau(tab) {
        for (let i = 0; i < tab.shape.length; i++) {
            const width = tab.shape[i];
            for (let j = 0; j < width; j++) {
                this.tableauxMask[tab.gridY + i] |= 1 << (tab.gridX + j);
            }
        }
        this.tableaux.push(tab);
    }

    viewMask() {
        this.tableauxMask.forEach((row, i) => {
            var s = "" + i;
            if (i < 10) { s += " "; }
            s += "| ";
            for (let i = 0; i < Grid.dimensions[0]; i++) {
                s += row & (1 << i) ? "*" : " ";
                s += " ";
            }
            console.log(s + "|");
        })
    }
}