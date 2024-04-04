# Domain

## Introduction
The domain layer is the heart of the application. It contains:
 - the business logic
 - entities
 - value objects
 - domain events
 
 This layer should be kept free of any infrastructure concerns.

 ## Dependencies
 Following dependencies are used in the domain layer:

 - domain-seedwork
 - event-bus-seedwork-node
 - @lucaspaganini/value-objects

## Package Structure

### contexts
A context is a way to group related entities and value objects together.

This folder contains the aggregate roots, repositories and unit-of-works of the domain.

### events
Domain events are a way to communicate changes that occur within the domain to other parts of the system.

This folder contains the types and handlers of domain events.

### infrastructure
This folder contains the interfaces for the infrastructure that the domain layer needs, such as datastore, queues, blobs, etc.

## How To Initialize
Execute following method to initialize the domain layer:

```typescript
InitializeDomain(infrastructure: DomainInfrastructureImplInstance)
```
This will perform the following tasks:
- register all domain event handlers