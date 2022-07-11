lpTag.external = lpTag.external || {};
lpTag.external.fallback = {
    CONST: {
        SECTION: "fallback",
        WAIT_TIME_MS: 10000
    },
    binds: {},
    showEventsAtSP: 0,
    startTime: lpTag._timing.domReady || lpTag._timing.start,
    updateStart: function () {
        lpTag.external.fallback.startTime = new Date().getTime()
        // don't count show events from previous SPA pageloads at the next check
        lpTag.external.fallback.showEventsAtSP = lpTag.events.hasFired('LE_ENGAGER','SHOW').length
        // unbind if necessary
        if (lpTag.external.fallback.binds.checkEng) {lpTag.events.unbind(lpTag.external.fallback.binds.checkEng)}
        // bind again if necessary
        if (lpTag.section.indexOf(lpTag.external.fallback.CONST.SECTION) < 0) lpTag.external.fallback.binds.checkEng = lpTag.events.bind('lp_monitoringSDK','REQUEST_COMPLETE',lpTag.external.fallback.checkForEngagements)
    },
    checkForEngagements: function () {
        console.log('checking for engagements')
        // if a new engagement has been rendered since SP, unbind the check
        if (lpTag.events.hasFired('LE_ENGAGER','SHOW').length > lpTag.external.fallback.showEventsAtSP) {
            console.log('an engagement has been displayed, unbinding!')
            lpTag.events.unbind(lpTag.external.fallback.binds.checkEng)
        // if not, check if time has been exceeded and do the needful
        } else if (new Date().getTime() - lpTag.external.fallback.startTime > lpTag.external.fallback.CONST.WAIT_TIME_MS) {
            console.log('wait time exceeded!')
            // lpTag.newPage with the fallback section added
            lpTag.newPage(document.URL, {
                section: [lpTag.external.fallback.CONST.SECTION].concat(lpTag.section)
            })
        }
    }
};

// do stuff
lpTag.events.bind('lp_monitoringSDK','SP_SENT',lpTag.external.fallback.updateStart)
lpTag.external.fallback.binds.checkEng = lpTag.events.bind('lp_monitoringSDK','REQUEST_COMPLETE',lpTag.external.fallback.checkForEngagements)
