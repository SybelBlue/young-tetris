function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);

    new Tableau(0, 0, [4, 2, 1]).draw()
    new Tableau(6, 0, [4, 2, 2, 1]).draw()
    new Tableau(12, 0, [2, 2]).draw()
}

function draw() {
    try {
        const focused = Renderer.renderAll().found;

        // if (clickThisFrame) {
        //     if (this.lastFocused && this.lastFocused != focused) {
        //         this.lastFocused.loseFocus && this.lastFocused.loseFocus();
        //     }

        //     this.lastFocused = focused;

        //     if (focused) {
        //         focused.gainFocus && focused.gainFocus();
        //     } else {
        //         SceneManager.tray.loadMachineOptions();
        //     }
        // }
    } catch (e) {
        console.error(e);
    } finally {
        Renderer.clearStack();
    }
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight);
}
