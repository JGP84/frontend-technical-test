# API Integration Clarifications - Leboncoin Messaging Interface

**Document**: API Ambiguities & Implementation Guidance
**Created**: 2025-10-22
**Status**: Final
**Related Spec**: `spec.md`

## Executive Summary

This document clarifies potential ambiguities in the leboncoin messaging interface implementation, focusing on API integration patterns, error handling strategies, data persistence approaches, and responsive design requirements. All clarifications align with the project's constitutional principles of KISS, Clean Code, Simplicity by Design, Universal Accessibility, and Delightful UX.

## 1. API Response Handling & Error Management

### 1.1 Missing API Responses (404 Errors)

**Clarification**: The API returns 404 for "No conversations found" and "No messages found", indicating empty results rather than errors.

**Implementation Strategy**:
```typescript
// Handle 404 as empty results, not errors
const handleApiResponse = async (response: Response) => {
  if (response.status === 404) {
    return []; // Empty array for conversations/messages
  }
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};
```

**User Experience**:
- Show appropriate empty states with actionable guidance
- No error messages for empty results - treat as normal application state

### 1.2 Service Unavailable (503 Errors)

**Clarification**: All endpoints can return 503 "Unavailable" errors, confirming the README's mention of "shaky infrastructure."

**Implementation Strategy**:
```typescript
// Implement exponential backoff retry logic
const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

const retryApiCall = async (apiCall: () => Promise<any>) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.status === 503 && attempt < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};
```

**User Experience**:
- Show "Server temporarily unavailable" message with retry button
- Implement automatic retry with visual feedback
- Graceful degradation to cached/local data when available

### 1.3 Network Timeouts & Offline Handling

**Clarification**: No offline requirements in API, but essential for user experience given infrastructure instability.

**Implementation Strategy**:
- Implement request timeouts (10 seconds for all requests)
- Use Service Worker for basic offline message queuing
- Cache successful responses in IndexedDB for offline viewing

## 2. Conversation Creation & Local Persistence

### 2.1 New Conversation Creation Flow

**Clarification**: API requires `recipientId` in request body when creating conversations via `POST /conversations/{userId}`.

**Implementation Strategy**:
```typescript
// Step 1: User selects recipient from users list
const createConversation = async (currentUserId: number, recipientId: number) => {
  const response = await fetch(`/conversations/${currentUserId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipientId })
  });

  if (response.ok) {
    const { id: conversationId } = await response.json();
    return conversationId;
  }

  throw new Error('Failed to create conversation');
};
```

**Edge Cases**:
- Handle duplicate conversation attempts (user tries to create conversation with same person twice)
- Validate recipient exists before showing in user selection
- Handle race conditions if both users try to initiate simultaneously

### 2.2 Local State Management

**Clarification**: Implement optimistic updates for immediate UI feedback while API calls are in progress.

**Implementation Strategy**:
```typescript
// Optimistic UI updates
const sendMessage = async (conversationId: number, content: string) => {
  const tempMessage = {
    id: `temp-${Date.now()}`,
    conversationId,
    authorId: currentUserId,
    body: content,
    timestamp: new Date().toISOString(),
    status: 'sending'
  };

  // Immediately update UI
  addMessageToUI(tempMessage);

  try {
    const savedMessage = await api.saveMessage(conversationId, content);
    // Replace temp message with real one
    updateMessageInUI(tempMessage.id, { ...savedMessage, status: 'sent' });
  } catch (error) {
    // Mark as failed and show retry option
    updateMessageInUI(tempMessage.id, { ...tempMessage, status: 'failed' });
  }
};
```

### 2.3 Data Persistence Strategy

**Clarification**: Implement hybrid approach - API as source of truth, local storage for performance and offline capability.

**Storage Architecture**:
- **IndexedDB**: Store conversations and messages for offline access
- **SessionStorage**: Cache active conversation state
- **API**: Source of truth for all data, sync on app load

## 3. Content & Data Constraints

### 3.1 Message Content Validation

**Clarification**: API accepts any string content, but implement client-side validation for user experience and safety.

**Validation Rules**:
```typescript
const MESSAGE_CONSTRAINTS = {
  maxLength: 1000,
  minLength: 1,
  allowedPatterns: {
    // No HTML tags
    noHtml: /<[^>]*>/,
    // No URLs (prevent spam)
    noUrls: /https?:\/\/[^\s]+/,
    // Reasonable character set
    validChars: /^[\u0000-\u007F\u0080-\uFFFF]*$/
  }
};

const validateMessage = (content: string): ValidationResult => {
  if (content.length < MESSAGE_CONSTRAINTS.minLength) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (content.length > MESSAGE_CONSTRAINTS.maxLength) {
    return { valid: false, error: 'Message too long (max 1000 characters)' };
  }

  for (const [rule, pattern] of Object.entries(MESSAGE_CONSTRAINTS.allowedPatterns)) {
    if (pattern.test(content)) {
      return { valid: false, error: `Message contains invalid content: ${rule}` };
    }
  }

  return { valid: true };
};
```

### 3.2 User Data Handling

**Clarification**: API provides user IDs and nicknames, but no authentication mechanism visible in swagger.

**Implementation Strategy**:
- Use API user endpoints to populate user selection for new conversations
- Cache user data locally to reduce API calls
- Handle user data staleness (users may be deleted or updated)

**Privacy Considerations**:
- Store minimal user data locally (ID, nickname only)
- Refresh user cache on app startup
- Clear user cache on logout/session expiry

## 4. Mobile vs Desktop Layout Behavior

### 4.1 Responsive Breakpoints

**Clarification**: Follow mobile-first approach with specific breakpoints for optimal experience.

**Breakpoint Strategy**:
```typescript
const BREAKPOINTS = {
  mobile: { max: 768, sidebar: 'overlay', input: 'bottom-fixed' },
  tablet: { max: 1024, sidebar: 'collapsible', input: 'bottom-fixed' },
  desktop: { max: Infinity, sidebar: 'persistent', input: 'inline' }
};

const getLayoutConfig = (width: number) => {
  if (width <= BREAKPOINTS.mobile.max) return BREAKPOINTS.mobile;
  if (width <= BREAKPOINTS.tablet.max) return BREAKPOINTS.tablet;
  return BREAKPOINTS.desktop;
};
```

### 4.2 Mobile-Specific Behaviors

**Conversations List (Mobile)**:
- Full-screen overlay navigation
- Pull-to-refresh capability
- Touch-optimized conversation cards (min 44px touch targets)
- Swipe actions for conversation management

**Message Composition (Mobile)**:
- Fixed bottom input area
- Auto-resize text input
- Camera/media attachment button
- Send button disabled for empty messages

**Conversation View (Mobile)**:
- Full-screen message list
- Auto-scroll to bottom on new messages
- Header with back button and participant info
- Optimized touch scrolling

### 4.3 Desktop-Specific Behaviors

**Conversations List (Desktop)**:
- Persistent sidebar (320px width)
- Hover states for better interaction feedback
- Keyboard shortcuts (Ctrl+K for search, Enter to open)
- Resizable sidebar panel

**Message Composition (Desktop)**:
- Inline input field at bottom of conversation
- Multi-line text input with Enter to send, Shift+Enter for new line
- Drag-and-drop file attachment
- Rich text formatting options

**Conversation View (Desktop)**:
- Two-panel layout (sidebar + main conversation area)
- Fixed header with conversation info
- Scrollable message area with auto-scroll to bottom
- Keyboard navigation support

### 4.4 Cross-Platform Consistency

**Shared Behaviors**:
- Same data loading and error handling across all platforms
- Consistent visual design language
- Unified notification system
- Same accessibility features (WCAG 2.1 AA compliance)

## 5. Performance Optimizations

### 5.1 API Call Optimization

**Pagination Strategy**:
- Conversations: Load 20 at a time with infinite scroll
- Messages: Load 50 at a time with pagination controls
- Implement virtual scrolling for large lists

**Caching Strategy**:
- Cache conversations list for 5 minutes
- Cache individual conversations for 2 minutes
- Cache user data for 1 hour
- Implement cache invalidation on successful mutations

### 5.2 Bundle Size Optimization

**Code Splitting**:
- Route-based code splitting for different views
- Component lazy loading for heavy UI components
- Dynamic imports for optional features

**Asset Optimization**:
- Image optimization with WebP format
- CSS purging for unused styles
- JavaScript minification and compression

## 6. Accessibility Compliance

### 6.1 WCAG 2.1 AA Requirements

**Keyboard Navigation**:
- Full keyboard accessibility for all interactive elements
- Logical tab order throughout the interface
- Escape key to close modals and overlays
- Enter/Space for button activation

**Screen Reader Support**:
- Proper ARIA labels for all UI elements
- Live regions for dynamic content updates
- Semantic HTML structure
- Alternative text for images and icons

**Visual Accessibility**:
- Color contrast ratios of 4.5:1 minimum
- Focus indicators visible and prominent
- Text scaling support up to 200%
- No information conveyed by color alone

## 7. Testing Strategy

### 7.1 API Error Simulation

**Test Coverage**:
- Mock all API endpoints with different response codes
- Test retry logic with various failure scenarios
- Verify offline behavior with network disconnection
- Test race conditions and concurrent API calls

### 7.2 Cross-Platform Testing

**Device Coverage**:
- iOS Safari (iPhone SE to iPhone Pro Max)
- Android Chrome (Pixel 3a to Pixel 8 Pro)
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablet devices (iPad, Android tablets)

## Conclusion

These clarifications provide a comprehensive foundation for implementing the leboncoin messaging interface while addressing the specific challenges mentioned in the README and API documentation. The implementation strategy prioritizes user experience, performance, and reliability while maintaining alignment with the project's constitutional principles.

**Key Success Factors**:
1. Robust error handling for infrastructure instability
2. Optimistic UI updates for responsive feel
3. Mobile-first responsive design
4. Comprehensive accessibility support
5. Performance optimization for millions of users

All implementation decisions should be validated against these clarifications and the established constitutional principles to ensure consistency and quality.