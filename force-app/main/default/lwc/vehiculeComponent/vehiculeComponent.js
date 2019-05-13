import { LightningElement, track, api } from 'lwc';

export default class VehiculeComponent extends LightningElement {
    @track
    vehicule;

    @api
    get vehicule(){
        return this.vehicule;
    }

    selectVehicule(){
        const selectVehiculeEvent = new CustomEvent('selectvehiculeevent', {
            detail: this.vehicule.Id
        });
        this.dispatchEvent(selectVehiculeEvent);
    }

}