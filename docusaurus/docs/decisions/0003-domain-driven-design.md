---
sidebar_position: 5
sidebar_label: 0003 Domain Driven Design
description: "Domain Driven Design Decisions."
# These are optional elements. Feel free to remove any of them.
status: accepted
contact: mgupta83
date: 2024-04-18
deciders: gidich, mgupta83
consulted: 
informed: ikeem07, nguyenduy, heruwala
---

# Use DDD Framework to build the data-access project

## Problem Statement
Create a code framework:
- that is easier to maintain and test.
- that can scale and evolve the system over time.
- that aligns with the terminology used by domain experts and users.

## Decision Drivers
- **Reduced Complexity**: DDD breaks down complex business logic into smaller, more manageable pieces (aggregate roots, entities, value objects, etc.).
- **Easier Mocking**: DDD's emphasis on interfaces and abstraction makes it easier to mock dependencies, reducing the complexity of testing.
- **Separation of Concerns**: DDD separate Business Logic from Infrastructure layer, making it easier to test the business logic without worrying about the underlying infrastructure.
- **Ubiquitous Language**: DDD promotes a common shared language between developers, domain experts and users, thereby avoiding ambiguity/confusion in communication.
- **Anti-Corruption Layer**: DDD provides a way to isolate the domain layer from external systems, reducing the impact of changes in external systems on the domain layer.

## Decision
We will implement a DDD framework using the following components:
- **Domain Layer**: This layer will contain the business logic and domain models. We will use JavaScript classes to define our aggregate roots, entities, and value objects.
- **Application Layer**: This layer will contain the use cases and interfaces for our domain models. We will use JavaScript classes to define our application services.
- **Infrastructure Layer**: This layer will contain the data access and infrastructure code. We will use MongoDB as our datastore.
- **Interface Adapters**: We will use interface adapters to connect our application layer to our infrastructure layer. For example, we will use a MongoDB adapter to connect our application layer to our MongoDB database.

## Consequences
- We will need to invest time in learning and implementing DDD principles and patterns.
- We will need to ensure that our domain models are correctly defined and separated from the infrastructure.
- We will need to use interface adapters to connect our application layer to our infrastructure layer.


## More Information

- [Domain-Driven Design: Tackling Complexity in the Heart of Software by Eric Evans](https://learning.oreilly.com/library/view/domain-driven-design-tackling/0321125215/)
- [Domain Driven Design - Martin Fowler](https://martinfowler.com/bliki/DomainDrivenDesign.html)