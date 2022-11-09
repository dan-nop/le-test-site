lpTag.external = lpTag.external || {};
lpTag.external.updateZIndex = {
    overideZIndex: function (data) {
        let stickyBtn = document.querySelector("[id^='LPMcontainer'][role='button']");
        console.log(stickyBtn);
    }
}

lpTag.events.bind('RENDERER_STUB','AFTER_CREATE_ENGAGEMENT_INSTANCE',lpTag.external.updateZIndex.overideZIndex)