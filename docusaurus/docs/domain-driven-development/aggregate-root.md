---
sidebar_position: 1
sidebar_label: Aggregate Root
description: "Aggregate Root"
---

# Aggregate Root

> #### Definition of Aggregate Root
>
> An **Aggregate Root** is a specific entity within an aggregate that serves as the _access point_ and handler for all interactions involving the aggregate's entities and value objects. It is the only member of the aggregate that external objects are allowed to hold references to and interact with directly.

### What is an Aggregate?

An aggregate is a cluster of domain objects (entities and value objects) that can be treated as a single unit. An aggregate defines a consistency boundary, meaning that any business rule or data modification must ensure consistency within the boundary but not necessarily immediately outside of it.

### References

1. [Martin Fowler's discussion on DDD Aggregates](https://martinfowler.com/bliki/DDD_Aggregate.html)
