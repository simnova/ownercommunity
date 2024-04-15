---
sidebar_position: 2
---

# Domain Driven Design
Owner Community is a platform designed to support the management and communication needs of community associations. The platform is built around the principles of Domain-Driven Design (DDD), a software development methodology that focuses on the core domain and logic of a business.

The domain of community associations is complex, with many interconnected concepts and relationships. By using DDD, we can model this domain in a way that is both understandable and maintainable. This allows us to build a platform that is flexible, scalable, and easy to extend.

## Ubiquitous Language

One of the key concepts of DDD is the use of a Ubiquitous Language. This is a shared language that is used by all members of the development team, as well as stakeholders in the business. The Ubiquitous Language is used to describe the core concepts of the domain, and ensures that everyone has a common understanding of the business logic.

### Contexts

The Owner Community platform is divided into several contexts, each of which represents a different aspect of the domain. These contexts are defined by the core concepts of the domain, and are used to organize the codebase and ensure that each part of the platform is focused on a specific area of functionality.

- Community
   - [GitHub][community-context]
- IAM (Identity and Access Management)
   - [GitHub][iam-context]
- Property 
   - [GitHub][property-context]
- Service Ticket 
   - [GitHub][service-ticket-context]
- User 
   - [GitHub][user-context]


[community-context]: https://github.com/simnova/ownercommunity/tree/main/data-access/src/app/domain/contexts/community/README.md
[iam-context]: https://github.com/simnova/ownercommunity/tree/main/data-access/src/app/domain/contexts/iam
[property-context]: https://github.com/simnova/ownercommunity/tree/main/data-access/src/app/domain/contexts/property/README.md
[service-ticket-context]: https://github.com/simnova/ownercommunity/tree/main/data-access/src/app/domain/contexts/service-ticket/README.md
[user-context]: https://github.com/simnova/ownercommunity/tree/main/data-access/src/app/domain/contexts/user 