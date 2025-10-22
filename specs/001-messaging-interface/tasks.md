# Tasks: Leboncoin Messaging Interface

**Input**: Design documents from `/specs/001-messaging-interface/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup

**Purpose**: Minimal setup for immediate development

- [ ] T001 [P] Configure Tailwind CSS for styling
- [ ] T002 Create basic API client and TypeScript types

---

## Phase 2: Core Features

**Purpose**: Essential functionality only

### User Story 1 - List Conversations (Priority: P1) 🎯

**Goal**: Display conversations list

- [ ] T003 [US1] Create ConversationsList component with API integration, handling API errors

**Checkpoint**: Can see list of conversations, with errors displayed gracefully

---

### User Story 2 - View Messages (Priority: P1) 🎯

**Goal**: Read messages in selected conversation

- [ ] T004 [US2] Create ConversationView component with message display, handling API errors

**Checkpoint**: Can select conversation and read messages, with errors displayed gracefully

---

### User Story 3 - Send Messages (Priority: P1) 🎯

**Goal**: Send new messages

- [ ] T005 [US3] Create MessageInput component with send functionality, handling API errors

**Checkpoint**: Can type and send messages, with errors displayed gracefully

---

## Phase 3: Polish

**Purpose**: Essential responsive layout and accessibility

- [ ] T006 [P] Add responsive layout and basic accessibility

---

## Notes

- Strictly essential tasks only
- No redundant or extra steps
- Core functionality focus: US1–US3 implemented
- US4 ("Create Conversations") and advanced features are out-of-scope for this technical test