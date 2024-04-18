// Setup instructions are written in the markdown!
const discordID = "YOUR DISCORD ID HERE";
const discordWebhook = "https://discordapp.com/api/webhooks/(INSERT WEBHOOK HERE)";


async function main() {
  const data = await fetchResults();

  const notification = writeNotification(data);

  postWebhook(notification);
}

async function fetchResults() {
  const urls = [
    'https://helldivers-2-dotnet.fly.dev/api/v1/assignments',
    'https://helldivers-2-dotnet.fly.dev/api/v1/campaigns'
  ];

  const responses = await Promise.all(urls.map(url => UrlFetchApp.fetch(url)));
  return responses.map(response => JSON.parse(response.getContentText()));
}

function writeNotification(data) {
  const { briefing, reward, expiration } = data[0][0];
  const rewardMedals = reward.amount;
  const formattedExpiration = Math.floor(new Date(expiration).getTime() / 1000).toString();

  let response = `# MAJOR ORDER\n## ${briefing} It ends in <t:${formattedExpiration}:R> \n### Reward for Completion: ${rewardMedals} Medals.\nAvailable Planets :`;

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

  return response;
}

function postWebhook(data) {
  const payload = JSON.stringify({
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
