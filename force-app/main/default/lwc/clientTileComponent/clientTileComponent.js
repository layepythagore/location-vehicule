import { LightningElement, track, api } from 'lwc';

export default class ClientTileComponent extends LightningElement {
    @track client;

    @api
    get client(){
        return this.client;
    }

    selectClient(){
        const selectClientEvent = new CustomEvent('selectclientevent', {
            detail: this.client.Id
        });
        this.dispatchEvent(selectClientEvent);   
    }
}