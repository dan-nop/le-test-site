lpTag.external = lpTag.external || {};
lpTag.external.updateZIndex = {
    overideZIndex: function (data) {
        // console.log("DATA", data);
        console.log("ENG. EngType", data.msg.engagementType);
        if (data.msg.engagementType === 6) {
            setTimeout (update)
            let stickyBtn = document.querySelector('div[id^="LPMcontainer"][role="button"]');
            console.log(stickyBtn);
            if (stickyBtn === null) {
            return;
            } else {
            stickyBtn.style.zIndex = "100000";
            }
        } else {
            return;
        }
        
    }
}

lpTag.events.bind('RENDERER_STUB','AFTER_CREATE_ENGAGEMENT_INSTANCE',lpTag.external.updateZIndex.overideZIndex);