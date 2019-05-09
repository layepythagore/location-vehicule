/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import searchClient from '@salesforce/apex/Lv_ClientCnt.searchClient';
export default class ClientSearchComponent extends LightningElement {

    @api numero;
    @api prenom;
    @api nom;

    search(){
        searchClient({numero: this.numero, prenom: this.prenom,  nom: this.nom}).then(result => {
            console.log(JSON.stringify(result));
        }).catch(error => {
            console.log(JSON.stringify(error));
        })
    }
}