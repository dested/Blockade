window.genericArea = function () {
    UIManager.genericArea = new UiArea(100, 100, 400, 300, UIManager, true);
    UIManager.genericArea.visible = true;
    UIManager.UIAreas.push(UIManager.genericArea);
    UIManager.genericArea.addControl(new TextArea(20, 20, "Blockade", UIManager.textFont, "Blue"));
    
    UIManager.genericArea.addControl(new TextArea(20, 75, "Username:", UIManager.textFont, "Black"));
    UIManager.genericArea.addControl(new Button(290, 54, 100, 25, "Login", UIManager.buttonFont, "red", function (e) { 
        window.Engine.socket.emit('Area_Main_Login', { user: UIManager.genericArea.txtUserName.text });
    }));
    UIManager.genericArea.addControl(UIManager.genericArea.txtUserName=new TextBox(140, 53, 130, 30, "Dested", UIManager.textFont, "Blue"));

};