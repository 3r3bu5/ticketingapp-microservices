import { Message, Stan} from 'node-nats-streaming'
import {Subjects} from '../const/subjects'

interface Event {
    subject: Subjects,
    data: any
}

export abstract class Listener<T extends Event> {

    abstract onMessage(data:T['data'], msg: Message) : void;
    abstract queueGroupName:string;
    abstract subject:T['subject'];
    private client:Stan;
    protected ackWait = 5 * 1000

    constructor (client: Stan){
        this.client = client
    }
    options = () => {
        return this.client
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName(this.queueGroupName)
        .setAckWait(this.ackWait)
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.options())
        
        subscription.on('message', (msg: Message) => {
            console.log(
                `Message Recieved: ${this.subject} | ${this.queueGroupName}`
            )
        const parsedData = this.parseData(msg)
        this.onMessage(parsedData, msg)
        })

    }
    parseData(msg: Message) {
        const data = msg.getData()
        return typeof data === 'string'
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf-8'))
    }
}
