# Team Workflow Overview

Our team uses **GitHub Projects** to manage all work, broken down into weekly iterations to ensure a clear and structured workflow. The following guide outlines how tasks are structured and provides best practices aligned with GitHub's recommendations. This ensures that our work is transparent, manageable, and efficiently organized.

## Workflow Structure

1. **Weekly Iterations**:  
   Work is planned and tracked on a week-by-week basis. Each week begins with a planning session where high-level tasks are reviewed, refined, and assigned to team members.
   
2. **High-Level Tasks and Subtasks**:  
   Each high-level task represents a significant unit of work (e.g., feature development, bug fixes, research). These tasks are broken down into subtasks to allow for better tracking of progress and collaboration among multiple team members.

## GitHub Best Practices

### GitHub Projects

- All work is tracked using **GitHub Projects**.  
- We utilize **Kanban boards** to visualize task progress, moving tasks through columns like "To Do", "In Progress", and "Done."
- Each task must be assigned to a **milestone** (usually a weekly iteration) and have **labels** for categorization.

### Pull Requests (PRs) and Tasks

- **All Pull Requests must be associated with a task** in GitHub Projects.  
  - This ensures that every change made in the codebase can be traced back to an ongoing task, improving accountability and transparency.
- The **task description** should include a clear reference to the PR once created. Use GitHub's automatic linking feature by mentioning the issue number (e.g., `Fixes #123`).

## High-Level Tasks

High-level tasks describe a broader area of work and require:

1. **Clear Objective**:  
   The task must clearly state the expected outcome. For example, "Implement new authentication method" or "Fix payment processing bug."
   
2. **Breakdown into Subtasks**:  
   Every high-level task must be broken down into smaller, manageable subtasks. This helps improve progress tracking and collaboration.

3. **Assigned Owner(s)**:  
   Every high-level task must have an assigned team member who is responsible for its overall progress.

4. **Completion Criteria**:  
   The task must define clear criteria for completion, such as passing tests, code reviews, or delivering a user-facing feature.

## Subtasks

Subtasks allow us to manage smaller components of the high-level task and ensure that the work can be parallelized. Each subtask must include:

1. **Detailed Description**:  
   Provide a concise explanation of what needs to be accomplished, including any dependencies on other subtasks.

2. **Estimation**:  
   Effort estimates for each subtask should be included to help with planning and sprint tracking.

3. **Assignment**:  
   Each subtask must be assigned to a specific team member.

4. **PR Linkage**:  
   Subtasks often result in a Pull Request. When a subtask is completed, the associated PR should reference the task ID.

## Example Task Breakdown

**High-Level Task**:  
"Develop User Profile Page"

- **Subtasks**:
  1. Design User Profile UI
  2. Implement API endpoints for profile data
  3. Build frontend components for profile page
  4. Write unit tests for API and frontend

Each subtask will have its own set of requirements and will be linked to individual PRs for implementation.

## Summary

- Work is managed via **GitHub Projects**, leveraging a structured **weekly iteration** cycle.
- **High-level tasks** are broad units of work that require clear objectives, subtasks, assigned owners, and completion criteria.
- **Subtasks** are more granular, assigned individually, and often linked directly to PRs.
- All PRs must be linked to an associated task to ensure traceability and maintain workflow clarity.

By following these guidelines, we aim to maintain an organized, transparent, and efficient workflow that aligns with GitHub's best practices.
