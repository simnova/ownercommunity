# Context: Community 

## Domain Structure:
- **Community** (aggregate root)
- Member (aggregate root)
  - Profile
  - Accounts [Account]
  - Role (entity reference)
  - Community (entity reference)
- Role (aggregate root)
  - Permissions
  - Community (entity reference)