hideLPChatbutton() {
    lpTag.events.hasFired('RENDERER_STUB', 'AFTER_CREATE_ENGAGEMENT_INSTANCE').forEach(function(e) {
        // checks engagement type of embedded
        if (e.data.eng.engData.engagementType === 5) {
            document.getElementById(e.data.eng.mainContainer.id).style.display="none";
        }
    });
}


// const CONST = {
//     NEW_AGENT_TYPING_INDICATOR: "Incoming message",
//     OLD_AGENT_TYPING_INDICATOR: "Agent is typing...",
//     CHAT_WITH_US: 'Chat with us',
//     MESSAGE_US: 'Message us'
// }
// window.onload = function() {
//     windowCustomizationInit()
// }
// // change window header
// let headerObserver = new MutationObserver(mutationsList => {
//     for (let mutation of mutationsList) {
//         // console.log(mutation);
//         mutation.addedNodes.forEach(node => {
//             if (node.nodeType === 3 && node.textContent === CONST.MESSAGE_US) {
//                 node.textContent = CONST.CHAT_WITH_US
//             }
//         })
//     }
// });
// // hide inspicio button
// let inspicioObserver = new MutationObserver(mutationsList => {
//     for (let mutation of mutationsList) {
//         // console.log(mutation.target);
//         mutation.target.style.display = 'none';
//     }
// });
// // change "agent is typing" message
// let agentTypingObserver = new MutationObserver(mutationsList => {
//     for (let mutation of mutationsList) {
//         // console.log(mutation);
//         if(mutation.target.textContent === CONST.OLD_AGENT_TYPING_INDICATOR) {
//             mutation.target.textContent = CONST.NEW_AGENT_TYPING_INDICATOR;
//         }
//     }
// });
// // Customize unified window based on its state
// function windowCustomizationInit () {
//     window.lpTag = window.lpTag || {};
//     lpTag.external = lpTag.external || {};
//     lpTag.events.bind({
//         eventName: "state",
//         appName: "lpUnifiedWindow",
//         func: function processThis(data) {
//             let headers = document.querySelectorAll("[data-lp-point='headerText']");
//             headers.forEach(header => headerObserver.observe(header, { childList: true }));
//             let inspicio = document.querySelectorAll("[data-lp-point='widget_sdk']");
//             inspicio.forEach(inspicio => inspicioObserver.observe(inspicio, { attributes: true }));
//             let agentTyping = document.querySelectorAll("[data-lp-point='agent_is_typing']");
//             agentTyping.forEach(agentTyping => agentTypingObserver.observe(agentTyping, { attributes: true }));
//         }
//     });
// }

// function hideLPChatButton() {
//     if (document.getElementById("emDiv")) {
//         document.getElementById("emDiv").id="changed";
//         console.log("id changed");
//     }
//     if (window.lpTag) {
//         window.lpTag.events.trigger("LP_OFFERS", "HIDE");
//     }
// }

