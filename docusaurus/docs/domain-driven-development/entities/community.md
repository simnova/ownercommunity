---
sidebar_position: 2
sidebar_label: Community
description: ""
---

# Community

The `Community` class is an [Aggregate Root](../aggregate-root) that encapsulates the core functionalities and properties of a community within the system. It manages community-related data and behaviors, ensuring that all changes to the community adhere to the business rules.

> **Location:** `ownercommunity/data-access/src/app/domain/contexts/community/community.ts`

#### Why is the Community class an Entity from the DDD persepective?

From a Domain-Driven Design (DDD) perspective, the `Community` class qualifies as an entity becuase the class has a unique identifier (`id`) that distinguishes one instance of `Community` from another. Secondly, the `Community` entity encapsulates business rules and behaviors that are specific to the community concept in the domain. For example, it manages permissions through the `CommunityVisa` and enforces rules in property setters, ensuring that any changes to the community's state adhere to defined business rules and access controls.

#### Why is the Community class an Aggregate Roote from the DDD persepective?

The `Community` class qualifies as an [Aggregate Root](../aggregate-root) for several reasons:

1. **Cluster of Entities and Value Objects:** The Community class manages various entities and value objects that together form the concept of a "community" in the domain.
2. **Single Point of Entry:** From a DDD perspective, Aggregate Roots are the only members of an aggregate that external objects are allowed to hold references to. This means that any interactions with the internal components of a community must go through the `Community` class.
