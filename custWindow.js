/** Please update below coming for future functionalites.
 * 5/7/2020 - HBA- Support Coordinator- Current Functionality of this event is to close the converation when the Consumer is Idle for 3 mins.
 * 5/7/2020 - BFO - Current Functionality of this event is to close the converation when the Consumer is Idle for 15 mins.
 * 10/10/2020 - Consumer Sales - Fallback for the Prioritizer bot.  Conversations stuck in in the Prioritization skills will be transferred.
 * 06/09/2021 - Consumer Sales - Temporary AutoCloser
 */

async function lambda(input, callback) {
    console.info("Converation Idle Event Triggered.")
    // Set conversation data.
    let conversation = input.payload;
    let conversationId = conversation.general.convId;
    let lastMessageTs = conversation.general.lastMessageTs;
    let now = new Date().getTime()
    let idleTime = now - lastMessageTs;
    let result = [];
    // Some processing ...
    // Result can be either an object or array.
    // Hint: Make sure to only return each type once.

    /**
     * Consumr - Mobile
     * Mobile_PAC - 2095318930
     * sc_pac = 2099083530
     */
    let core_skill = ["2095318930", "2099083530"]; 

    // support_Coordinator_Skills = Support Coordinator Skill
    let support_Coordinator_Skills = ["1943520230","1943529330", "1943537530", "2469054430", "3264234130"];

    /* bfo_skills = BFO Skill
    * BFO_GeneralProfile = 1965166130
    * BFO_MyBiz = 1965166230
    * BFO_OCC = 1965166330
    * BFO_POC = 1965166630
    * BFO_PurchaseOrders = 1965167430
    */
    let bfo_skills = ["1965166130","1965166230","1965166330","1965166630","1965167430"];

    // currentSkill = current skill of the conversation
    let currentConversationSkill = conversation.routing.newSkillId;
    let lastMessageFromConsumer = conversation.idle.lastConsumerMsgTs;
    // let lastMessageFromConsumer = conversation.general.lastMessageComposer === "CONSUMER"

    // BEGIN Sales Prioritizer fallback config
    let transferRules = [
	  { "sourceId": "1998453130", "sourceName": "~Home Priority Sales: P1", "destinationName": "Home Priority Sales", "destinationId": "1998451130" },
	  { "sourceId": "1998455430", "sourceName": "~Home Priority Sales: P2", "destinationName": "Home Priority Sales", "destinationId": "1998451130" },
	  { "sourceId": "1998456030", "sourceName": "~Home Priority Sales: P3", "destinationName": "Home Priority Sales", "destinationId": "1998451130" },
	  { "sourceId": "1998462530", "sourceName": "~Home Priority Sales: P4", "destinationName": "Home Priority Sales", "destinationId": "1998451130" },
	  { "sourceId": "1998465230", "sourceName": "~Home Priority Sales: P5", "destinationName": "Home Priority Sales", "destinationId": "1998451130" },
	  { "sourceId": "1998465730", "sourceName": "~Home Sales: P1", "destinationName": "Home Sales", "destinationId": "1998451330" },
	  { "sourceId": "1998468530", "sourceName": "~Home Sales: P2", "destinationName": "Home Sales", "destinationId": "1998451330" },
	  { "sourceId": "1998468930", "sourceName": "~Home Sales: P3", "destinationName": "Home Sales", "destinationId": "1998451330" },
	  { "sourceId": "1998469130", "sourceName": "~Home Sales: P4", "destinationName": "Home Sales", "destinationId": "1998451330" },
	  { "sourceId": "1998469530", "sourceName": "~Home Sales: P5", "destinationName": "Home Sales", "destinationId": "1998451330" },
	  { "sourceId": "1998470130", "sourceName": "~Home SMB Sales: P1", "destinationName": "Home SMB Sales", "destinationId": "1998451730" },
	  { "sourceId": "1998471130", "sourceName": "~Home SMB Sales: P2", "destinationName": "Home SMB Sales", "destinationId": "1998451730" },
	  { "sourceId": "1998471430", "sourceName": "~Home SMB Sales: P3", "destinationName": "Home SMB Sales", "destinationId": "1998451730" },
	  { "sourceId": "1998471830", "sourceName": "~Home SMB Sales: P4", "destinationName": "Home SMB Sales", "destinationId": "1998451730" },
	  { "sourceId": "1998472430", "sourceName": "~Home SMB Sales: P5", "destinationName": "Home SMB Sales", "destinationId": "1998451730" },
	  { "sourceId": "1998471930", "sourceName": "~Mobile Sales 5G: P1", "destinationName": "Mobile Sales 5G", "destinationId": "1998452530" },
	  { "sourceId": "1998471330", "sourceName": "~Mobile Sales 5G: P2", "destinationName": "Mobile Sales 5G", "destinationId": "1998452530" },
	  { "sourceId": "1998470330", "sourceName": "~Mobile Sales 5G: P3", "destinationName": "Mobile Sales 5G", "destinationId": "1998452530" },
	  { "sourceId": "1998469430", "sourceName": "~Mobile Sales 5G: P4", "destinationName": "Mobile Sales 5G", "destinationId": "1998452530" },
	  { "sourceId": "1998468730", "sourceName": "~Mobile Sales 5G: P5", "destinationName": "Mobile Sales 5G", "destinationId": "1998452530" },
	  { "sourceId": "1998468330", "sourceName": "~Mobile Sales: P1", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "1998467630", "sourceName": "~Mobile Sales: P2", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "1998467430", "sourceName": "~Mobile Sales: P3", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "1998467230", "sourceName": "~Mobile Sales: P4", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "1998466630", "sourceName": "~Mobile Sales: P5", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
      { "sourceId": "3533394130", "sourceName": "~Mobile Sales: P6", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "3533394530", "sourceName": "~Mobile Sales: P7", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "3533395230", "sourceName": "~Mobile Sales: P8", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "3533395630", "sourceName": "~Mobile Sales: P9", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "3533396430", "sourceName": "~Mobile Sales: P10", "destinationName": "Mobile Sales", "destinationId": "1998452330" },
	  { "sourceId": "2324663430", "sourceName": "~Mobile Sales 4G/5G Home Internet: P1", "destinationName": "Mobile Sales 4G/5G Home Internet", "destinationId": "2324593430" },
	  { "sourceId": "2324663530", "sourceName": "~Mobile Sales 4G/5G Home Internet: P2", "destinationName": "Mobile Sales 4G/5G Home Internet", "destinationId": "2324593430" },
	  { "sourceId": "2324663930", "sourceName": "~Mobile Sales 4G/5G Home Internet: P3", "destinationName": "Mobile Sales 4G/5G Home Internet", "destinationId": "2324593430" },
	  { "sourceId": "2324664330", "sourceName": "~Mobile Sales 4G/5G Home Internet: P4", "destinationName": "Mobile Sales 4G/5G Home Internet", "destinationId": "2324593430" },
	  { "sourceId": "2324664630", "sourceName": "~Mobile Sales 4G/5G Home Internet: P5", "destinationName": "Mobile Sales 4G/5G Home Internet", "destinationId": "2324593430" },
      { "sourceId": "3481715630", "sourceName": "~Mobile Sales SPA: P1", "destinationName": "Mobile Sales SPA", "destinationId": "3481713030" },
      { "sourceId": "3481716230", "sourceName": "~Mobile Sales SPA: P2", "destinationName": "Mobile Sales SPA", "destinationId": "3481713030" },
      { "sourceId": "3481716430", "sourceName": "~Mobile Sales SPA: P3", "destinationName": "Mobile Sales SPA", "destinationId": "3481713030" },
      { "sourceId": "3481717030", "sourceName": "~Mobile Sales SPA: P4", "destinationName": "Mobile Sales SPA", "destinationId": "3481713030" },
      { "sourceId": "3481719930", "sourceName": "~Mobile Sales SPA: P5", "destinationName": "Mobile Sales SPA", "destinationId": "3481713030" }
    ];
    let rule = transferRules.find(rule => {
        return rule.sourceId === currentConversationSkill
    })
    // END Sales Prioritizer fallback config

    // BEGIN Sales Temporary auto closer config
    const { Toolbelt } = require('lp-faas-toolbelt');
    const SecretStorage = Toolbelt.SecretClient();
    const mavenApiKey = await SecretStorage.readSecret('mavenApiKey');
    const httpClient = Toolbelt.HTTPClient();

    const autoCloseSkills = ["1998452330","2324593430","1998452530"];
    // END Sales Temporary auto closer config

    console.info(`conversationId=${conversationId}; Current Skill=${currentConversationSkill}; Last Consumer Message=${lastMessageFromConsumer}`);

    // BEGIN Sales Prioritizer fallback
    // check if current skill is associated with a sales rule.  If so, transfer to the relevant destination
    if (rule) {
        let salesIdleCloseThreshold = parseInt(process.env.SALES_IDLE_CLOSE_THRESHOLD)

        if (!isNaN(salesIdleCloseThreshold) && idleTime > salesIdleCloseThreshold) {
            console.info(`${conversationId} in ${rule.sourceName} has been idle for ${idleTime}: closing`)
            result = [{
                type: "closeConversation"
            }]
        } else {
            console.info(`${conversationId} in ${rule.sourceName} is being transferred to ${rule.destinationName}`)
            result = [{
                type: "transfer",
                skillId: rule.destinationId
            }]
        }

        callback(null, result);
    }
    // END Sales Prioritizer fallback

    // BEGIN Sales Temporary Auto Closer
    else if (autoCloseSkills.includes(currentConversationSkill)
      && conversation.general.lastMessageComposer === 'ASSIGNED_AGENT'
      && !conversation.idle.lastConsumerMsgTs
      && process.env.SALES_AUTO_CLOSE_ENABLED === "TRUE") {
        result = [
            {
                type: "systemMessage",
                text: "We haven’t heard from you in a while. We’ll close this conversation for now, but feel free to reopen if you need additional assistance. Thank you!"
            },
            {
                type: "closeConversation"
            }
        ]

        let logLine = `autoclose: conv ${conversationId} in skill ${currentConversationSkill} at ${new Date(now).toUTCString()} because last message was from ${conversation.general.lastMessageComposer}. idleTime is ${idleTime/1000}s (since last message from ANY participant).`
        console.info(logLine);

        try {
            let ds = new Date(now).toISOString();
            ds = ds.replace(/(\d+)\-(\d+)\-(\d+).+/,'$1$2$3');
            const patchResponse = await httpClient({
                method: 'PATCH',
                url: `https://z1.context.liveperson.net/v1/account/${process.env.ACCOUNT_ID}/${process.env.SALES_AUTOCLOSE_CW_NAMESPACE+'-'+ds}/${conversationId}/properties`,
                headers: {
                    'maven-api-key': mavenApiKey.value,
                },
                simple: false,
                json: true,
                resolveWithFullResponse: true,
                body: {
                    timestamp: now,
                    currentConversationSkill,
                    idleTime,
                    logLine
                }
            })
        } catch (e) {
            console.error(e.message)
        }

        callback(null, result);
    }
    // END Sales Temporary Auto Closer


    // check if current skill of support coordinator and  last message is not from consumer
    // backeup = else if(support_Coordinator_Skills.includes(currentConversationSkill) && lastMessageFromConsumer == false)
    else if(support_Coordinator_Skills.includes(currentConversationSkill) && (conversation.general.lastMessageComposer === 'CONSUMER' || conversation.general.lastMessageComposer === 'ASSIGNED_AGENT')){
        console.info(`conversationId=${conversationId};Idle conversation for Support Coordinator skills`);

        //if consumer non-responsive means AGENT is last to respond
        if(conversation.general.lastMessageComposer === 'ASSIGNED_AGENT'){
            result = [
                {
                    type: "systemMessage", 
                    text: "Due to no responses in the last 10 minutes, this conversation will close in the next few moments. If you need additional assistance please initiate a new conversation."
                },
                {
                    type: "closeConversation" // Closes the conversation.
                }
            ];

        }
        //if agent non-responsive means CONSUMER is last to respond
        if(conversation.general.lastMessageComposer === 'CONSUMER'){
            result = [
                {
                    type: "systemMessage", 
                    text: "We have not heard from you in a while. We will close this conversation."
                },
                {
                    type: "closeConversation" // Closes the conversation.
                }
            ];
        }
        
        callback(null, result);
    }
    // check if current skill is from BFO skill and last message is not from consumer
    else if(bfo_skills.includes(currentConversationSkill) && lastMessageFromConsumer == false){
        console.info(`conversationId=${conversationId};Consumer Idle for BFO skills`);
        result = [
            {
                type: "closeConversation" // Closes the conversation.
            }
        ];

        callback(null, result);
    }
    // check if current skill is from CORe skill and last message is not from consumer
    else if(core_skill.includes(currentConversationSkill) && lastMessageFromConsumer == false){
        console.info(`conversationId=${conversationId};Consumer Idle for CORe skills`);
        result = [
            {
                type: "closeConversation" // Closes the conversation.
            }
        ];

        callback(null, result);
    }
    else {
        console.warn(`conversationId=${conversationId};Conversation skill DID NOT match list of skills.`);
        callback(null, result);
    }


}
lpTag.newPage(document.URL, {
    section : ["L1:wireless", "L2:onedp", "L3:landing"]
    });
    