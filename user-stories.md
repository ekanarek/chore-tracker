# Concept: Weekly Chore Tracker and Planner

## Feature 1: Display Chores

### User Story

As a user, I want to view all planned and completed chores, organized by day, so that I can appropriately plan for my week.

### Details

Designate a column for each day of the week. On page load, fetch chore data and display each chore within a card under the day it's assigned to.

## Feature 2: Add New Chores

### User Story

As a user, I want to add new chores and see them displayed in my weekly planner so that I can customize my plans.

### Details

Create a form with fields for chore name (text input), assigned weekday (dropdown), and priority level (dropdown). When submitted, the new chore is displayed beneath the appropriate day.

## Feature 3: Edit Existing Chores

### User Story

As a user, I want to edit the chores in my tracker so that I have flexibility to change my plans.

### Details

When the edit button at the bottom of a chore card is clicked, the card switches into edit mode and the user can update any of the chore's fields. When saved, the card leaves edit mode and the changes are displayed.

## Feature 4: Delete Chores

### User Story

As a user, I want to delete chores that I no longer plan on doing that week.

### Details

When the "x" in the corner of a chore card is clicked, that chore is removed from view.

## Feature 5: Mark Chores as "Done"

### User Story

As a user, I want to mark chores as "done" so I can keep track of what I've already accomplished for the week.

### Details

When the "Done?" checkbox on a chore card is clicked, the card is greyed out and moved to the bottom of the column for that day. The box can be un-checked to reverse these effects.
