lpTag.external = lpTag.external || {};
lpTag.external.dynamicOpeners = {
    proactiveEngagements: [],
    identifyProactiveEngagementContainer: function (data) {
        console.log("indentifyProactiveEng", data);
        // is proactive
        if (data?.conf?.type === 1) {
            // store the engagementId:container mapping
            let eng = {
                engagementId: data?.eng?.engData?.engagementId,
                container: data?.eng?.containerId,
                modified: false
            }
            lpTag.external.dynamicOpeners.proactiveEngagements.push(eng)
            // if we already have a new opener change it immediately

            let = _newOpener = 'This is a test! and it"s working';

            if (_newOpener) lpTag.external.dynamicOpeners.updateEngagementText(eng.engagementId, _newOpener)
        }
    },
    // this is a separate function so that, if desired in the future, proactive wording can be changed at any time
    updateEngagementText: function (engagementId, newOpener) {
        try {
            // find the relevant entry in the engagementId:container mapping
            let eng = lpTag.external.dynamicOpeners.proactiveEngagements.reverse().find(eng => {
                return eng.engagementId === engagementId
            })

            // get the container
            async function defineContainer() {
                let container = document.getElementById(eng.container);
                return container
            }
            
            defineContainer().then(function(container) {
                console.log("CONTAINER", container);
                // get the current opener text node
                let nodeList = container?.children[0]?.children[0]?.childNodes;
                console.log(nodeList);
                if (!nodeList) { return false }
                let currentOpener = nodeList[3].innerText;

                // how tall is the container for the displayed engagement?
                let currentHeight = parseInt(container.children[0].style.height);
                // how tall is the speech bubble on the displayed engagement?
                let currentBubbleHeight = container.children[0].children[0].clientHeight;

                // replace the engagement text
                if (currentOpener) {
                    nodeList[3].innerText = newOpener;
                    // how much has the height of the bubble changed due to the new text?
                    let newBubbleHeight = container.children[0].children[0].clientHeight;
                    // change the height of the engagement to account for the new bubble size and keep it aligned to the sticky
                    let newHeight = currentHeight - (currentBubbleHeight - newBubbleHeight);
                    container.children[0].style.height = newHeight+'px';
                    // identify that this engagement was modified in the mapping
                    eng.modified = true;
                    eng.newOpener = newOpener;
                }
            });
        }
        catch (e) {
            console.error(e)
        }
    },
    updateWelcomeMessage: function (event) {
        // only act if the window is in the "waiting" state
        if (lpTag.events.hasFired('lpUnifiedWindow','state').reverse()[0].data.state !== 'waiting') return;

        // find the ID of the most recently clicked engagement
        let clickedEngagementId = lpTag.events.hasFired('LP_OFFERS', 'OFFER_CLICK').reverse()[0]?.data?.engagementId
        // if either
        //  the clicked engagement in the mapping && we modified the engagement wording
        //  OR "dynamicOpeners.windowModified" is true in local storage (this window was left open for a navigation/reload after modification)
        // modify the welcome message
        let modifiedEngagement = lpTag.external.dynamicOpeners.proactiveEngagements.find(eng => { return eng.engagementId === clickedEngagementId && eng.modified })
        if (modifiedEngagement || window.localStorage.getItem('dynamicOpeners.modifiedWelcomeMessage')) {
            event.data.lines.forEach(line => {
                if (!line.isWelcomeMessage) return
                let newOpener = modifiedEngagement.newOpener || window.localStorage.getItem('dynamicOpeners.modifiedWelcomeMessage')
                if (modifiedEngagement.newOpener) {
                    line.text = newOpener
                    window.localStorage.setItem('dynamicOpeners.modifiedWelcomeMessage', newOpener)
                }
            })
        }
    }
};

// do stuff
lpTag.events.bind('RENDERER_STUB','AFTER_CREATE_ENGAGEMENT_INSTANCE',lpTag.external.dynamicOpeners.identifyProactiveEngagementContainer)
lpTag.events.bind('lpUnifiedWindow','windowClosed', () => window.localStorage.removeItem('dynamicOpeners.modifiedWelcomeMessage'))
lpTag.hooks.push({ name: 'AFTER_GET_LINES', callback: lpTag.external.dynamicOpeners.updateWelcomeMessage })
