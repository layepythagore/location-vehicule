declare module "@salesforce/apex/Lv_ClientCnt.searchClient" {
  export default function searchClient(param: {numero: any, prenom: any, nom: any}): Promise<any>;
}
declare module "@salesforce/apex/Lv_ClientCnt.createClient" {
  export default function createClient(param: {client: any}): Promise<any>;
}
