import { LightningElement, track, api } from 'lwc';

export default class VehiculeListComponent extends LightningElement {
    @track
    vehicules = [];

    @api
    get vehicules(){
        return this.vehicules;
    }

    handleSelectVehicule(event){
        const selectVehiculeEvt = new CustomEvent('selectvehiculeevt', {
            detail: event.detail
        });
        this.dispatchEvent(selectVehiculeEvt);
    }
}