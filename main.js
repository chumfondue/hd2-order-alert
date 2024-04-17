// Setup instructions are written in the markdown!
const discordID = "YOUR DISCORD ID HERE";
const discordWebhook = "https://discordapp.com/api/webhooks/(INSERT WEBHOOK HERE)";


async function main(){
    const data = fetchResults();

    notification = writeNotification(data)

    postWebhook(notification)
}


function fetchResults() {
    let urls = ['https://helldivers-2-dotnet.fly.dev/api/v1/assignments','https://helldivers-2-dotnet.fly.dev/api/v1/campaigns'];

    let responses = urls.map(url => UrlFetchApp.fetch(url));
    let data = [];

    for (let i = 0; i < responses.length; i++) {
        let response = responses[i];
        let json = JSON.parse(response.getContentText());
        data.push(json);
    }
    return data
}

function writeNotification(data){
    briefingDesc = data[0][0]['briefing']
    rewardMedals = data[0][0]['reward']['amount']

    let response = `# MAJOR ORDER\n## ${briefingDesc}\n### Reward for Completion: ${rewardMedals} Medals.\nAvailable Planets :`

    availablePlanets = []
    for(let i=0;i<data[1].length;i++){
        let obj = [data[1][i]['planet']['name'],data[1][i]['planet']['currentOwner']]
        if(obj[1] == "Automaton"){
            availablePlanets.unshift(`\n- ${obj[0]} being controlled by ${obj[1]}.`)
        }else{
            availablePlanets.push(`\n- ${obj[0]} being controlled by ${obj[1]}.`)
        }
    }

    for(let i=0;i<availablePlanets.length;i++){
        response += availablePlanets[i]
    }
    return response

}

    function postWebhook(data) {

    let payload = JSON.stringify({
        'username': 'Helldivers Alert',
        'avatar_url': 'https://pbs.twimg.com/profile_images/1661464871777517569/ehRFQcg1_400x400.jpg',
        'content': data
    });

    const options = {
        method: 'POST',
        contentType: 'application/json',
        payload: payload,
        muteHttpExceptions: true
    };

    UrlFetchApp.fetch(discordWebhook, options);
}
