let jkr = require("Jkr");

cc.Class({
    extends: cc.Component,

    properties: {
        playerNameLabel: cc.Label,

        otherSourceName: cc.Label,

        bg1Sprite: cc.Node,
        bg2Sprite: cc.Node,

        acceptIconNode: cc.Node,
        waitingNode: cc.Node,
        waitingBars: [cc.Node],
    },

    start() {
        // 0:等待回应; 1:接受;
        this.status = 0;
        this.runWaitingBars();
        this.switchStatusIcon();
    },

    initRobItem: function(roleIndex, sourceNum) {
        this.roleIndex = roleIndex;
        let roleData = jkr.player.getRoleData(roleIndex);
        this.playerNameLabel.string = roleData.roleName;
        this.bg1Sprite.color = jkr.Utils.hex2color(roleData.color);
        this.bg2Sprite.color = jkr.Utils.hex2color(roleData.color);
        this.otherSourceName.string = roleData.sourceCardNum + "";
    },

    runWaitingBars: function() {
        for (let i = 0; i < this.waitingBars.length; i++) {
            let delayTime = i * 0.2 + 0.01;
            let barNode = this.waitingBars[i];
            this.scheduleOnce(() => {
                barNode.height = 16;
                cc.tween(barNode)
                    .repeatForever(
                        cc.tween()
                            .to(0.4, {height: 40})
                            .to(0.4, {height: 16})
                    ).start();
            }, delayTime);
        }
    },

    switchStatusIcon: function() {
        this.acceptIconNode.active = this.status === 1;
        this.waitingNode.active = this.status === 0;
    },

    robFinished: function() {
        this.status = 1;
        this.switchStatusIcon();
    }

});