window.genericArea = function () {
    UIManager.genericArea = new UiArea(100, 100, 300, 300, UIManager, true);
    UIManager.genericArea.visible = true;
    UIManager.UIAreas.push(UIManager.genericArea);
};