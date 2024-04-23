---
sidebar_position: 5
sidebar_label: 0005 SerenityJS
description: "Use SerenityJS to create business-focused test scenarios, automate acceptance criteria, test domain layer, and generate living documentation."
# These are optional elements. Feel free to remove any of them.
status: proposed
contact: nguyenduy
date: 2024-04-22  
deciders: nguyenduy, ikeem07
consulted: gidich, mgupta83
informed: etang93, heruwala, anil
---

# Use SerenityJS to ensure delivering right features

## Context and Problem Statement

When developing a project, it is essential to ensure that the features being developed are what the business wants. This requires a way to document the features in a document as a contract that can be reviewed and understood by both the development team and the business stakeholders. As a result, the project needs a tool that can create business-focused test scenarios to automate acceptance tests, test the domain layer (which captures the objects and business logic/rules in the system), and produce living documentation.

## Decision Drivers

- **Business Focus**: Ensure that the project's features align with the business requirements and expectations.
- **Timely Feedback**: Provide timely feedback to the development team and business stakeholders on the project's progress and quality.
- **Keep track of the project's features**: Document the project's features in a way that is understandable and accessible to all stakeholders and team members.
- **Automated Testing**: Automate acceptance criteria to ensure that the project's features are tested thoroughly.
- **Domain Layer Testing**: Test the domain layer to ensure that the business logic/rules are correctly implemented.
- **Living Documentation**: Generate living documentation that is always up-to-date and reflects the current state of the project's features.

## Considered Options

**Option #1: Use SerenityJS**

- **Description**: SerenityJS with the popular Screenplay pattern provides a high-quality, user-centered approach in automating acceptance tests, testing the domain layer, and generating living documentation. It provides a business-readable DSL (Domain-Specific Language) that can be understood by both developers and business stakeholders.

## Decision Outcome

Chosen option: **Option #1: Use SerenityJS**


## Pros and Cons of the Options

Pros of SerenityJS:

- **Free and open-source**: SerenityJS is free and open-source, making it accessible to all teams.

- **Business-focused test scenarios**: SerenityJS allows for the creation of business-focused test scenarios that can be understood by both developers and business stakeholders.

- **Automated acceptance tests**: SerenityJS enables the automation of acceptance tests, ensuring that the project's features are thoroughly tested.

- **Domain layer testing**: SerenityJS allows for the testing of the domain layer, ensuring that the business logic/rules are correctly implemented.

- **Living documentation**: SerenityJS generates living documentation that is always up-to-date and reflects the current state of the project's features.

Cons of SerenityJS:

- **Learning curve**: SerenityJS may have a learning curve for team members who are new to the tool.

- **Complexity**: SerenityJS may introduce additional complexity to the project, especially when defining test scenarios and maintaining the living documentation.

- **Maintenance**: SerenityJS may require additional maintenance to keep the test scenarios and living documentation up-to-date.

## Links

- [SerenityJS](https://serenity-js.org/)

