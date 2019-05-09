/**
 * ************************************************************
 *     * @Author abdoulaye.diop@/terangacloud.com
 *     * @date  08/05/2019
 *     * @description Wizard Controller for Lv_Client component
 * ************************************************************
 **/
public with sharing class Lv_ClientCnt {
    
    /**
     * @Author AD
     * @date  08/05/2019
     * @description Method to search a client
     * @param Integer numero, 
     * @param String prenom,
     * @param String nom
     **/
    @AuraEnabled
    public static Map<String, Object> searchClient(Integer numero, String prenom, String nom){
        Map<String, Object> response = new Map<String, Object>();
        prenom = '%' + prenom + '%';
        nom = '%' + nom + '%';

        try {
            List<Lv_Client__c> clients = [SELECT Id, Lv_Prenom__c, Name, Lv_Identification_Numero__c FROM Lv_Client__c
            WHERE Lv_Identification_Numero__c =:numero  OR Lv_Prenom__c LIKE :prenom OR Name LIKE :nom];

            response.put('clients', JSON.serialize(clients));
            response.put('error', false);
        } catch (Exception e) {
            response.put('error', true);
            response.put('message', e.getMessage());
            response.put('trace', e.getCause() + ' '+ e.getStackTraceString());
        }
        return response;
    }

    /**
     * @Author AD
     * @date  08/05/2019
     * @description Method to search a client
     * @param none
     **/
    @AuraEnabled
    public static Map<String, Object> createClient(Lv_Client__c client){
        Map<String, Object> response = new Map<String, Object>();
        try {
            insert client;
            response.put('client', client);
            response.put('error', false);
        } catch (Exception e) {
            response.put('error', true);
            response.put('message', e.getMessage());
            response.put('trace', e.getCause() + ' '+ e.getStackTraceString());
        }
        return response;
    }
    
}
