import * as mqtt from 'mqtt/dist/mqtt.min';
import { currentActivity } from '../stores/currentActivity';
import { tasksLog } from '../stores/dayViewSelectedDay';

let currentActivityActual = {};

currentActivity.subscribe(ca => {
    currentActivityActual = ca;
})

function startConnection() {
    const options = {
        username: 'rlinky',
        password: 'Rinoancvv__$5252_'
    };
    const client = mqtt.connect(
        'wss://0a9f6c7b687745f5b2d3b8025842c1ba.s1.eu.hivemq.cloud:8884/mqtt',
        options
    );
    client.on('connect', () => {
        console.log('connected');
        // client.subscribe(localStorage.getItem('accountID'), (err, v) => {
        //     if (!err) {
        //         console.log(v);
        //     }
        // });
    });
    client.on('message', (topic, message) => {
        console.log(topic, message)
        if (topic === localStorage.getItem('accountID')) {
            try {
                const parsedMessage = JSON.parse(message.toString());
                console.log(parsedMessage)
                if (parsedMessage.currentActivityUpdate !== undefined) {
                    if (parsedMessage.currentActivityUpdate === 'null') {
                        tasksLog.update((old) => {
                            return [
                                ...old,
                                {
                                    taskID: currentActivityActual.taskID,
                                    taskStartUnix: currentActivityActual.taskStartUnix,
                                    taskEndUnix: Date.now()
                                }
                            ];
                        });
                        localStorage.setItem('currentActivity', 'null');
                        currentActivity.set(null);
                    } else {
                        currentActivity.set(parsedMessage.currentActivityUpdate)
                    }
                }
            } catch (e) {

            }
        }
    });
    return client;
}

export { startConnection }