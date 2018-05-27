(function() {

    var APP_NAME = "Avatars";
    var APP_URL = "YOUR_APP_HTML_FILE_URL";
    var APP_ICON = "YOUR_APP_ICON_IMAGE_HERE"

    // Link to our avatar options
    var AVATARURL1 = "AVATAR_FST_FILE_LINK_1";
    var AVATARURL2 = "AVATAR_FST_FILE_LINK_2";

    // Get a reference to the tablet 
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton({
            text: APP_NAME,
            icon: APP_ICON
        });

    function clicked(){
        tablet.gotoWebScreen(APP_URL);
    }
    button.clicked.connect(clicked);

    function onWebEventReceived(event){
        print("Received Web Event: " + event);

        if(typeof event === "string"){
            event = JSON.parse(event);
        }

        if(event.type === "click")
        {
            if(event.data === "Avatar 1"){
                print("Avatar 1 data");
                MyAvatar.skeletonModelURL = AVATARURL1;
            }
            else if(event.data === "Avatar 2"){
                print("Avatar 2 data");
                MyAvatar.skeletonModelURL = AVATARURL2;
            }
        }
    }
    tablet.webEventReceived.connect(onWebEventReceived);
    function cleanup() {
        tablet.removeButton(button);
    }
    Script.scriptEnding.connect(cleanup);
}());