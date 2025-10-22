# Implementation Plan: Leboncoin Messaging Interface

**Branch**: `[001-messaging-interface]` | **Date**: 2025-10-22 | **Spec**: [link](spec.md)
**Input**: Feature specification from `/specs/001-messaging-interface/spec.md`

## Summary

Build a simple responsive messaging interface for leboncoin using Next.js with TypeScript and Tailwind CSS. Core features: list conversations, view messages, send messages, handle API errors. The interface must remain accessible and keyboard-friendly across all devices. Simple fetch-based API integration with basic error handling and mobile-responsive design following KISS principles.

## Out-of-Scope Features

**Purpose**: Document advanced features not included in this technical test implementation for future reference.

### User Stories Out-of-Scope
- **US4: Create New Conversations** (P2) - New conversation creation with user search and selection
- **US5: Advanced Error Handling** (P2) - Complex retry logic, offline queuing, advanced server error management

### Functional Requirements Out-of-Scope
- **FR-004**: Create new conversations with other users
- **FR-008**: Message status indicators (sending, sent, failed)
- **FR-009**: Offline caching for conversations and messages
- **FR-010**: Rate limiting for spam prevention (maximum 10 messages per minute per user)

### Success Criteria Out-of-Scope
- **SC-001**: Sub-2-second loading on 3G connections (performance metric)
- **SC-002**: 99.9% message delivery success rate (advanced reliability metric)
- **SC-004**: Offline functionality during server outages (advanced caching)

**Rationale**: These features represent P2/P3 priorities that extend beyond the technical test scope. Core messaging functionality (US1-US3) provides complete user value for evaluation purposes.

## Technical Context

**Language/Version**: TypeScript 5.8.2, React 19.0.0, Next.js 15.2.2
**Primary Dependencies**: Tailwind CSS 3.x, json-server 0.17.1
**Storage**: Simple React state management, API as source of truth
**Testing**: Jest 29.7.0, React Testing Library 16.2.0
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Simple web application with basic responsive design
**Performance Goals**: Fast loading and responsive interactions
**Constraints**: Simple implementation, easy to understand and maintain
**Scale/Scope**: Technical test implementation with core messaging features

**Accessibility Note**: All interactive elements must be keyboard-accessible with visible focus states using Tailwind's focus-visible utility classes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Core Principle Gates:**
- **KISS (Keep It Simple)**: ✅ PASSED - Minimal component hierarchy, basic fetch API, simple state management
- **Clean Code**: ✅ PASSED - TypeScript types, clear component structure, basic error handling
- **Simplicity by Design**: ✅ PASSED - Straightforward mobile-responsive layout with Tailwind CSS
- **Universal Accessibility**: ✅ PASSED - Basic accessibility features (keyboard nav, alt text, color contrast)
- **Delightful UX**: ✅ PASSED - Loading states, basic error messages, responsive interactions

**Technical Standards Gates:**
- Next.js 15+ with Pages Router architecture ✅ PASSED - Using existing structure
- Mobile and desktop responsive design ✅ PASSED - Simple Tailwind breakpoints
- Input validation and error handling for all user inputs ✅ PASSED - Simple validation

## Project Structure

### Documentation (this feature)

```
specs/001-messaging-interface/
├── plan.md              # This file - Simple implementation plan
├── research.md          # Basic API analysis
├── data-model.md        # Simple data types
├── quickstart.md        # Setup guide
└── tasks.md             # Core implementation tasks
```

### Source Code (repository root)

```
src/
├── components/          # Simple UI components
│   ├── ConversationsList.tsx
│   ├── ConversationView.tsx
│   ├── MessageItem.tsx
│   └── MessageInput.tsx
├── lib/                # Basic utilities
│   ├── api.ts          # Simple API client
│   └── types.ts        # TypeScript definitions
├── pages/              # Next.js pages
│   ├── _app.tsx        # App setup
│   └── index.tsx       # Main interface
└── styles/             # Styles
    └── globals.css     # Tailwind imports
```

**Structure Decision**: Minimal single-page structure using existing Next.js setup. Simple component hierarchy with basic TypeScript types. Direct fetch API calls without complex state management.

## Implementation Phases

### 1️⃣ Setup
1. Configure Next.js with TypeScript (already done)
2. Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
3. Initialize Tailwind: `npx tailwindcss init -p`
4. Configure `tailwind.config.js` and `globals.css`

### 2️⃣ API Integration
1. Create simple API client in `lib/api.ts`:
```typescript
const API_URL = 'http://localhost:3005'

export const api = {
  async get(endpoint: string) {
    try {
      const res = await fetch(`${API_URL}${endpoint}`)
      if (!res.ok) {
        return { error: `HTTP ${res.status}: ${res.statusText}` }
      }
      return res.json()
    } catch (error) {
      return { error: 'Network error - please check connection' }
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        return { error: `HTTP ${res.status}: ${res.statusText}` }
      }
      return res.json()
    } catch (error) {
      return { error: 'Network error - please check connection' }
    }
  }
}
```

### 3️⃣ Components
1. **ConversationsList** - Display list of conversations
2. **ConversationView** - Show messages in selected conversation
3. **MessageItem** - Individual message display
4. **MessageInput** - Send new messages

### 4️⃣ Layout & Features
1. Create responsive layout with Tailwind classes and simple breakpoints
2. **List Conversations**: Fetch and display conversation list with "Loading..." state using `animate-pulse`
3. **View Messages**: Click conversation to view messages with loading state
4. **Send Messages**: Input field with send functionality
5. **Error Handling**: Show error messages for API failures

## Simple Testing Approach

### Basic Testing Setup
- Unit tests for components with React Testing Library
- Basic responsive design testing

### Manual Testing Checklist
- [ ] Conversations list loads and displays correctly
- [ ] Clicking conversation shows messages
- [ ] Can send new messages
- [ ] Error messages show for API failures
- [ ] Responsive on mobile and desktop
- [ ] Basic accessibility (keyboard navigation, alt text)

## Development Commands

```bash
# Start API server
npm run start-server

# Start Next.js dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

This simplified plan focuses on core functionality with straightforward implementation patterns suitable for a technical test timeframe.