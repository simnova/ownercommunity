---
sidebar_position: 3
sidebar_label: Contexts
description: ""
---

# Contexts

Contexts within the Owner Community framework involve multiple levels of abstraction, primarily focusing on the management and execution of domain-related actions. These contexts are part of a security and permissions framework but are independent of the Domain-Driven Design (DDD) framework.

## Levels of Abstraction

### Domain Execution Context

The Domain Execution Context is the top-level abstraction responsible for executing any action related to the domain. This context utilizes an instance of Passport to manage permissions and ensure that actions are carried out within the correct security protocols.

### System Execution Context

The SystemExecutionContext is an implementation of the DomainExecutionContext interface, utilizing a SystemPassport. This context is designed for backend communications, such as publishing messages to a queue, where elevated privileges are typically required. It facilitates operations that are internal to the system, providing necessary permissions to execute system-level tasks.

### ReadOnlyContext

The `ReadOnlyContext` also implements the `DomainExecutionContext` interface, but it uses a `ReadOnlyPassport`. This context serves as a security layer for operations that should be accessible without authentication or authorization, such as viewing data without the ability to modify it. It is particularly useful in scenarios where data integrity and security are paramount, but user interaction is limited to **_read-only access_**.

## Usage
