window.genericArea = function () {
    UIManager.genericArea = new UiArea(100, 100, 300, 300, UIManager, true);
    UIManager.genericArea.visible = true;
    UIManager.UIAreas.push(UIManager.genericArea);
    UIManager.genericArea.addControl(new Button(40, 50, 100, 30, "Run Game", UIManager.buttonFont, "red", function (e) {
        alert("Soon...");
    }));
    UIManager.genericArea.addControl(new TextArea(20, 20, "Run Game", UIManager.textFont, "Blue"));
};