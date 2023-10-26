# Geo-Guard Emergency App

Geo-Guard Emergency App is a full-stack application designed to provide swift assistance during emergencies. The app offers the following key features:

## Features

1. **Automatic Location Detection:** The app automatically selects the user's current location on a map, ensuring accuracy and speed in times of need.

2. **Custom Location Selection:** Users have the flexibility to choose a different location on the map if necessary.

3. **Emergency Reporting:** In the event of an emergency, such as accidents or fires, users can add a description of the situation and press the submit button.

4. **Real-time Visibility:** Leveraging Socket.IO and MongoDB, the app displays accidents and their descriptions on the map in real-time. This information is accessible to all users of the app. Currently, Socket.IO implementation is underway due to a shortage of time, but MongoDB and Auth and the submission of an incident are fully implemented.

5. **Web Push Notifications:** The app will send web push notifications to alert users about emergencies in their vicinity, enabling them to offer help or seek assistance quickly.

6. **Future Expansion:** I'm considering implementing email notifications using AWS or Firebase in the future to further enhance communication and response during emergencies.
