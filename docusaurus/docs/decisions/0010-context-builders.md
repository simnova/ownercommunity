---
sidebar_position: 10
sidebar_label: 0010 Context Builders
description: "Azure Function Context Builders"
# These are optional elements. Feel free to remove any of them.
status: accepted
contact: mgupta83
date: 2024-07-02
deciders: mgupta83
consulted: nnoce14
---

# Azure Function Context Builders

## Problem Statement
Design a structured hierarchy for Context Builders to allow for both general and custom-use cases, depending on the needs of the given Azure Function.

We initially only designed our Context Builder specifically for our GraphQL endpoint, which is served as an HTTP Azure Function. We needed to accommodate Context Builders for Queue and Timer Azure Functions, as well as a generic HTTP context builder for any other HTTP endpoints we may have.

## Decision Drivers
- **Flexibility**: Different Azure Functions have distinct needs for their context objects. Each type of Azure Function has a seedwork file for a context builder for that specific function type. These classes can be extended as needed to accommodate for any use case a specific function may have.
- **Abstraction**: Context Builders inherit from a shared `BaseContextBuilder` class which contains shared logic common to all context builders. 

## Decision
We will implement abstract Context Builder classes for each type of Azure Function. These are seedwork files that are intended to be portable to other projects. These abstract classes can be extended to serve the needs of specific Azure Functions for any given project. 

There are three layers to our hierarchy. The first being the `AppContextBuilder`, which is designed to encapsulate the domain rules of the project and is specific to the needs of the project. This `AppContext` is used to make determinations regarding business logic throughout the domain layer of the project.

The second layer is the seedwork Context Builder classes, which are `HttpContextBuilder`, `QueueContextBuilder`, and `TimerContextBuilder`. There is a fourth class called `BaseContextBuilder` which is extended by the other three and contains common fields and functions shared across all context builders. These classes are abstract and intended to be portable across all projects.

The third layer is the route Context Builder classes which extend the abstract classes to provide the implementation details that are specific to the project. In this case, those functions are `setAppContext()` and `setVerifiedUser()` which depend on the azure function the context will be used for as well as implementation details specific to the project. 


### AppContextBuilder

- Location: `/src/app/init/app-context-builder.ts`


Shared structure for all Context Builder classes. Exists as a member field on the abstract context builder classes. The idea is this context is referenced all throughout the domain layer in regards to business logic and making decisions based off the permissions of the user. The fields on this context may vary as they are domain specific to each project, and thus cannot be 100% portable. The `AppContextBuilder` will exist in all projects, but it's interface and implementation details will be specific to each project.

### Seedwork Context Builders
Abstract classes which are meant to serve as a generic template for Route Context Builders to extend based on the type of Azure Function being used. Currently, there are three types of Seedwork Context Builders: 

- `HttpContextBuilder` 
  - Location: `/seedwork/seedwork-az-function-handler_http/http-context-builder.ts`
- `QueueContextBuilder` 
  - Location: `/seedwork/seedwork-az-function-handler_http/http-context-builder.ts`
- `TimerContextBuilder` 
  - Location: `seedwork/seedwork-az-function-handler_timer/timer-context-builder.ts`

The functions on the classes as well as the interfaces will be consistent across all projects. 
There is also an additional class `BaseContextBuilder` which contains shared logic for all the Seedwork Context Builder classes and is extended by them.

- `BaseContextBuilder` Location: `/seedwork/seedwork-az-function-handler_base/base-context-builder.ts`

### Route Context Builders
These classes extend one of the Seedwork Context Builder classes depending on the type of Azure Function. Their implementation is specific to each project, depending on the use case and needs of that Azure Function. A common one we will be using in our projects is `GraphqlContextBuilder`, which extends the seedwork class `HttpContextBuilder`, since it is an HTTP Azure Function endpoint. 

- `GraphqlContextBuilder` Location: `/src/graphql/init/graphql-context-builder.ts`

These Route Context Builders are also meant to be flexible. If we have multiple queue or timer functions, we can create a `QueueContextBuilderImpl` class which can be used by multiple different Azure Functions. So the idea is we can have generic Route Context Builders, and also be able to create specific ones for more involved Azure Functions as needed. 

- `QueueContextBuilderImpl` Location: `/src/queue/init/queue-context-builder-impl.ts`


### Implementing Route Context Builder

Here is a quick example of implementing a route context builder for a generic Azure Function queue.

To begin, extend the seedwork class `QueueContextBuilder`.

```typescript
export class QueueContextBuilderImpl extends QueueContextBuilder implements QueueContext {}
```

There are two abstract methods on `QueueContextBuilder` which need to be implemented: `setVerifiedUser()` and `setAppContext()`.

The notion of a `VerifiedUser` and `AppContext` will exist across all projects. However, the implementations of these are specific to each project, and vary depending on the type of Azure Function being used. 

In this case, the `VerifiedUser` is a "SYSTEM" instead of being an authorized user through a JWT. `setVerifiedUser()` can be implemented like this.

```typescript
protected async setVerifiedUser(): Promise<void> {
    this._verifiedUser = {
        verifiedJWT: {},
        openIdConfigKey: 'SYSTEM'
    };
}
```

For `setAppContext()`, the `AppContextBuilder` is constructed and initialized. In this case, some of the constructor fields are null due to `QueueContextBuilderImpl` being a system user. This is specific to the project and the constructor for `AppContextBuilder` will be different in your case. 

```typescript
protected async setAppContext(): Promise<void> {
    this._appContext = new AppContextBuilder(
        this._verifiedUser,
        null,
        null,
        this._infrastructureServices
    );
    await this._appContext.init();
}
```

Here is the class all together.

```typescript
import { InvocationContext } from "@azure/functions";
import { QueueContext, QueueContextBuilder } from "../../../seedwork/seedwork-az-function-handler_queue/queue-context-builder";
import { AppContextBuilder } from "../../app/init/app-context-builder";
import { InfrastructureServicesBuilder } from "../../init/infrastructure-services-builder";

export class QueueContextBuilderImpl extends QueueContextBuilder implements QueueContext {
  constructor(queueItem: any, context: InvocationContext, infrastructureServices: InfrastructureServicesBuilder) {
    super(queueItem, context, infrastructureServices);
  }

  protected async setVerifiedUser(): Promise<void> {
    this._verifiedUser = {
      verifiedJWT: {},
      openIdConfigKey: 'SYSTEM'
    };
  }

  protected async setAppContext(): Promise<void> {
    this._appContext = new AppContextBuilder(
      this._verifiedUser,
      null,
      null,
      this._infrastructureServices
    );
    await this._appContext.init();
  }
}
```

### Extending Context Interfaces and Initialization

For more involved Azure Functions which may require additional fields to be present on the context, you are able to extend the generic context interfaces defined in the seedwork files. 

In this example, we will go through the `GraphqlContextBuilder` class to showcase how to extend the context interface as well as provide additional functionality on the context initialization.

Since our GraphQL Azure Function is an HTTP endpoint, we implement the `GrapqhlContext` interface by extending the `HttpContext` interface, which provides some common fields needed for all HTTP contexts such as the `HttpRequest` object.

```typescript
export interface GraphqlContext extends HttpContext {
  communityId: string;
}
```

Now instead of having the class implement `HttpContext`, it implements the `GraphqlContext` interface.
Therefore, whichever fields are exposed on the `GraphqlContext` can be used in the handler for the Azure Function.

```typescript 
export class GraphqlContextBuilder extends HttpContextBuilderImpl implements GraphqlContext {
```

If necessary, the `init()` method from `BaseContextBuilder` can be overridden if some additional steps are necessary on context startup. In the case of `GraphqlContextBuilder`, we need to modify some headers on the request object. 

We can define a method on the class to modify the request object, which is a member on the class due to inheritance from the `HttpContextBuilder`.

```typescript
private async setReqHeaders(): Promise<void> {
    this._req.headers.set('x-ms-privatelink-id', '');
    this._req.headers.set('server', null);
}
```

To ensure this method is invoked on context startup, we can override the `init()` method defined in `BaseContextBuilder`, and use `super.init()` to make sure that method is still called on startup, so the `GraphqlContextBuilder` behaves correctly.

```typescript
public async init() {
    // execute following in order
    await this.setReqHeaders();
    await super.init();
}
```