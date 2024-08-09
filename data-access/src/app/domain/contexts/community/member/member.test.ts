import { Member, MemberProps } from './member';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { DomainVisa } from '../../../domain.visa';
import { CommunityVisa } from '../community.visa';
import { CommunityEntityReference } from '../community/community';

describe('domain.contexts.member', () => {
  describe('when creating a new member', () => {
    const givenValidCommunity = jest.mocked({} as CommunityEntityReference);
    const givenValidName = 'John Doe';
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
    givenValidContext.domainVisa.forMember = jest.fn(() => jest.mocked({} as CommunityVisa));

    it('should reject an invalid name', () => {
      // Arrange
      const givenInvalidName = 'x'.repeat(201);
      const memberProps = jest.mocked({} as MemberProps);
      
      // Act
      const creatingInvalidMember = () => { 
        Member.getNewInstance(memberProps, givenInvalidName, givenValidCommunity, givenValidContext); 
      };

      // Assert
      expect(creatingInvalidMember).toThrowError('Too long');
    });

    it('should accept valid input', () => {
      // Arrange
      const memberProps = jest.mocked({ setCommunityRef(community) {
        community;
      },} as MemberProps);
      
      // Act
      const creatingValidMember = () => { 
        Member.getNewInstance(memberProps, givenValidName, givenValidCommunity, givenValidContext); 
      };

      // Assert
      expect(creatingValidMember).not.toThrow();
    });

  });

  describe('when updating a member', () => {
    const memberProps = jest.mocked({} as MemberProps);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
    givenValidContext.domainVisa.forMember = jest.fn(() => jest.mocked({ determineIf(func) {
      return func({isEditingOwnMemberAccount: true, canEditOwnMemberProfile: true});
    },} as CommunityVisa));


    it('should reject an invalid email', () => {
      // Arrange
      const member = new Member(memberProps, givenValidContext);
      const givenInvalidEmail = 'bad-email';
      
      // Act
      const updatingUserWithInvalidProperty = () => { 
        member.profile.Email=(givenInvalidEmail);
      };

      // Assert
      expect(updatingUserWithInvalidProperty).toThrowError('Value doesn\'t match pattern');
    });

    it('should reject an invalid cybersource id', () => {
      // Arrange
      const member = new Member(memberProps, givenValidContext);
      const givenInvalidCybersourceId = 'x'.repeat(51);
      
      // Act
      const updatingUserWithInvalidProperty = () => { 
        member.CyberSourceCustomerId=(givenInvalidCybersourceId);
      };

      // Assert
      expect(updatingUserWithInvalidProperty).toThrowError('Too long');
    });

    it('should reject an invalid name', () => {
      // Arrange
      givenValidContext.domainVisa.forMember = jest.fn(() => jest.mocked({ determineIf(func) {
        return func({canManageMembers: true});
      },} as CommunityVisa));
      const member = new Member(memberProps, givenValidContext);
      const givenInvalidName = 'x'.repeat(501);
      
      // Act
      const updatingUserWithInvalidProperty = () => { 
        member.MemberName=(givenInvalidName);
      };

      // Assert
      expect(updatingUserWithInvalidProperty).toThrowError('Too long');
    })

  });

  it('should reject an invalid bio', () => {
    // Arrange
    const memberProps = jest.mocked({} as MemberProps);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
    givenValidContext.domainVisa.forMember = jest.fn(() => jest.mocked({ determineIf(func) {
      return func({isEditingOwnMemberAccount: true, canEditOwnMemberProfile: true});
    },} as CommunityVisa));
    const member = new Member(memberProps, givenValidContext);
    const givenInvalidBio = 'x'.repeat(2001);
    
    // Act
    const updatingUserWithInvalidProperty = () => { 
      member.profile.Bio=(givenInvalidBio);
    };

    // Assert
    expect(updatingUserWithInvalidProperty).toThrowError('Too long');
  })

  it('should reject more than 20 interests', () => {
    // Arrange
    const memberProps = jest.mocked({} as MemberProps);
    const givenValidContext = jest.mocked({} as DomainExecutionContext);
    givenValidContext.domainVisa = jest.mocked({} as DomainVisa);
    givenValidContext.domainVisa.forMember = jest.fn(() => jest.mocked({ determineIf(func) {
      return func({isEditingOwnMemberAccount: true, canEditOwnMemberProfile: true});
    },} as CommunityVisa));
    const member = new Member(memberProps, givenValidContext);
    const givenInvalidInterests = Array(21).fill('interest');
    
    // Act
    const updatingUserWithInvalidProperty = () => { 
      member.profile.Interests=(givenInvalidInterests);
    };

    // Assert
    expect(updatingUserWithInvalidProperty).toThrowError('Too long');
  });

});