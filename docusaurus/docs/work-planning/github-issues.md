# Managing Feature Requests and Developer Work with GitHub Issues

## Overview

This document describes the process of using GitHub Issues to track feature requests from the business, link them to developer work items, and manage the development and QA lifecycle. The workflow ensures that business needs are captured, development tasks are tracked, and QA has a clear process for testing and reporting bugs. Developers can also create new issues if additional work is identified.


## Process Overview

1. [Issue Types](#1-issue-types)
2. [Issue Priority](#2-issue-priority)
3. [Issue Lifecycle](#3-issue-lifecycle)


### 1. Issue Types

| Label | Description |
| --- | --- |
| `issue:feature` | Represents a high-level system feature requested by the business. Add a `tasklist` inside `feature` to create one or more `tasks` and/or `bugs`|  
| `issue:task` | Represents a granular developer work item that contributes to a feature. |
| `issue:bug` | Represents a bug identified during QA testing. |

### 2. Issue Priority

| Label | Description |
| --- | --- |
| `priority:high` | Indicates high business priority. |
| `priority:medium` | Indicates medium business priority. |
| `priority:low` | Indicates low business priority. |


### 3. Issue Lifecycle

#### Feature
| Label | Description | Set By |
| --- | --- | --- |
| `state:created` | The feature is created and work has not started. | SME |
| `state:dev-in-progress` | Developer(s) is(are) actively working on the feature. | SME |
| `state:dev-blocked` | Development is blocked because of a dependency or an open question to business | SME |
| `state:ready-for-qa` | Development is complete, and the feature is ready for QA Deployment. | SME |
| `state:qa-in-progress` | QA deployment is done and QA team is actively testing the task. | QA |
| `state:qa-verified` | QA testing is complete and the verification is successful. | QA |
| `state:qa-blocked` | QA testing is blocked because of a dependency. | QA |

#### Task
| Label | Description | Set By |
| --- | --- | --- |
| `state:created` | The task is created and waiting to be assigned. | SME/Developer |
| `state:assigned` | The task is assigned to a developer and is ready to be worked on. | SME/Developer  |
| `state:dev-in-progress` | A developer is actively working on the task. | Developer |
| `state:dev-blocked` | Development is blocked because of a dependency or an open question to business | Developer |
| `state:awaiting-sme-review` | Development is complete and waiting for SME review | Developer |
| `state:sme-review-pass` | SME review is complete and the task is ready for PR merge | SME |
| `state:sme-review-fail` | SME review is complete and the SME has provided some feedback that requires additional work| SME |
| `state:ready-for-qa` | Development and SME review are complete, and the task is ready for QA Deployment. | on Pull Request merge |

#### Bug
| Label | Description | Set By |
| --- | --- | --- |
| `state:created` | The bug is created and work has not started. | QA |
| `state:assigned` | The bug is assigned to a developer and is ready to be worked on. | SME/Developer  |
| `state:dev-in-progress` | A developer is actively working on the bug fix. | Developer |
| `state:dev-blocked` | Development is blocked because of a dependency or an open question to business | Developer |
| `state:awaiting-sme-review` | Development is complete and waiting for SME review | Developer |
| `state:sme-review-pass` | SME review is complete and the bug fix is ready for PR merge | SME |
| `state:sme-review-fail` | SME review is complete and the SME has provided some feedback that requires additional work| SME |
| `state:ready-for-qa` | Development and SME review are complete, and the bug fix is ready for QA Deployment. | on Pull Request merge |
| `state:resolved` | The bug is fixed and verified by QA | QA |
