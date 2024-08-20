- check constraints on primitive fields 
=> business rules therefore can be added later

- confusion on PopulatedDoc setters for Domain Adapter: 
instruction use:
public setCommunityRef(community: CommunityEntityReference) {
    this.doc.set('community', community['props']['doc']);
}
actual code: 
setCommunityRef(community: CommunityEntityReference) {
  this.doc.set('community', community.id);
}
=> use the first one

- generate entity files
 
- generate value object files