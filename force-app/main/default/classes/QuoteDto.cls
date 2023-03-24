public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date  startdate;
  
  @AuraEnabled
  public Date endDate;

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startdate=quote.Start_Date__c;

  }

  public override SObject refreshSo() {
    return null;
  }


@AuraEnabled(cacheable=true)
public static QuoteDto getquote(id recordId,date startdate, date endDate){
  Quote__c quote_record=[select Start_Date__c,EndDate__c from Quote__c where id=:recordId];
  QuoteDto  add_into_wrapper=new QuoteDto();
  add_into_wrapper=new QuoteDto(quote_record);
  return add_into_wrapper;
}


@AuraEnabled
public static void upatequoterecord(id recordId,date startdate, date endDate){

  Quote__c quote_record=[select Start_Date__c,EndDate__c from Quote__c where id=:recordId];
  quote_record.Start_Date__c=this.startdate;
  quote_record.EndDate__c=this.endDate;


  update quote_record;

}





}
