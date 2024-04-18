# hd2-order-alert
A lightweight and secure script that reminds and notifies you of the current Major Order and Planets available to play in Helldivers 2. Automation is configurable.

## Features
* **Lightweight** - With only ±65 lines of code, this script requires minimal resources.
* **Free & Secure** - Google Apps Script is a service that is currently free and very secure.
* **Ease** - After setting it up, the script can run without a browser or you being online. If configured correctly, you won't need to maintain and look at the code again.

## Prerequisites
### Discord ID
1. Open [Discord](https://discord.com/channels/@me) through the app or through the web.
2. Click your profile picture on the bottom left.
3. Copy and save your User ID.

### Discord Webhook
1. Go to a server you want the alert to be in (you MUST have the "Manage Webhook" permission).
2. Click/create a text channel you want the alert to be in.
3. Edit the channel and click Integrations.
4. Create a webhook, then copy and save the URL.

## Setup
1. Open [Google Apps Script](https://script.google.com/home/start) and create a new project with your desired name.
2. Select the editor and paste the main.js code. Refer to the instructions in the code to put your Discord ID and Webhook.
3. Select "main" and run the code with the button at the top to confirm that the code is configured and running correctly.
4. Open the 'Triggers' menu on the left sidebar to add a new trigger.
5. The function to run should be "main", configure the code to be your desired frequency.
