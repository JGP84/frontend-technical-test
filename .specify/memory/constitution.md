<!--
SYNC IMPACT REPORT - Leboncoin Messaging Interface Constitution v1.0.0

Version change: None → 1.0.0 (initial creation)
Modified principles: None → 5 new principles added
  - None → I. KISS (Keep It Simple, Stupid)
  - None → II. Clean Code Standards
  - None → III. Simplicity by Design
  - None → IV. Universal Accessibility
  - None → V. Delightful User Experience
Added sections:
  - Technical Standards (replaced [SECTION_2_NAME]/[SECTION_2_CONTENT])
  - Development Workflow (replaced [SECTION_3_NAME]/[SECTION_3_CONTENT])
  - Governance (replaced [GOVERNANCE_RULES])
Removed sections: None (initial creation)
Templates requiring updates:
  - ✅ .specify/templates/plan-template.md - Updated Constitution Check section with principle gates
  - ✅ .specify/templates/spec-template.md - Reviewed, no changes needed
  - ✅ .specify/templates/tasks-template.md - Reviewed, no changes needed
  - ✅ README.md - Already aligned with accessibility and testing principles
Follow-up TODOs: None - all placeholders resolved

End of Sync Impact Report
-->

# Leboncoin Messaging Interface Constitution

## Core Principles

### I. KISS (Keep It Simple, Stupid)
Complex solutions are forbidden when simple ones exist. Every feature must have a clear, single purpose. Code must be immediately understandable without deep analysis. Prefer straightforward approaches over clever optimizations that sacrifice clarity.

### II. Clean Code Standards
Code must follow established TypeScript and React conventions, be well-documented with meaningful comments, and maintain consistent formatting. Functions must be small (under 50 lines), focused on single responsibilities, and have clear, descriptive names. No magic numbers, nested conditionals deeper than 3 levels, or functions with more than 4 parameters.

### III. Simplicity by Design
User interfaces must prioritize clarity over complexity. Every interaction must be intuitive and require minimal cognitive load from users. Information hierarchy must be obvious, and progressive disclosure should guide users naturally through complex workflows.

### IV. Universal Accessibility
All features must be usable by people with disabilities following WCAG 2.1 AA standards. Ensure keyboard navigation for all interactive elements, screen reader compatibility with proper ARIA labels, color contrast ratios of at least 4.5:1, and inclusive design patterns that don't rely solely on visual cues.

### V. Delightful User Experience
Every interaction must bring joy and satisfaction to users. Performance must be exceptional with sub-second load times for common actions and smooth 60fps animations. Users should feel empowered, not frustrated, by anticipating their needs and providing helpful feedback for all actions.

## Technical Standards

**Technology Stack Requirements:**
- Next.js 15+ with Pages Router for server-side rendering and static generation
- React 19+ with functional components and hooks
- TypeScript for type safety across all components and utilities
- Responsive design supporting mobile (320px+) and desktop (1920px+) viewports

**Performance Standards:**
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Bundle size < 500KB gzipped for initial page load
- API responses cached appropriately with proper cache headers
- Images optimized with WebP format and responsive sizing

**Safety and Reliability:**
- Input validation on all user inputs and API boundaries
- Error boundaries to prevent cascading failures
- Graceful degradation for offline/network failure scenarios
- Rate limiting and abuse prevention for user-generated content

## Development Workflow

**Testing Requirements:**
- Unit tests for all utility functions and custom hooks (minimum 80% coverage)
- Integration tests for complete user workflows
- End-to-end tests for critical user journeys
- Accessibility testing with automated tools and manual verification

**Code Review Process:**
- All changes require review by at least one other developer
- Changes must demonstrate adherence to all constitutional principles
- Performance impact must be justified for any new features
- Security implications must be considered for all changes

**Deployment Practices:**
- Continuous integration with automated testing on all branches
- Staging environment for validation before production deployment
- Feature flags for safe rollouts of new functionality
- Rollback procedures documented for failed deployments

## Governance

This constitution supersedes all other development practices and coding standards. All pull requests and code reviews must verify compliance with these principles. Complexity must be justified with clear business value. Use README.md and docs/ for runtime development guidance.

**Amendment Process:**
- Proposals require clear rationale and impact assessment
- Changes must maintain backward compatibility unless explicitly justified
- All stakeholders must be notified of constitutional changes
- Migration guides must be provided for breaking changes

**Compliance Verification:**
- Automated linting enforces code style consistency
- Accessibility audits run on all deployments
- Performance budgets enforced through build tooling
- Regular constitution compliance reviews during sprint retrospectives

**Version**: 1.0.0 | **Ratified**: 2025-10-20 | **Last Amended**: 2025-10-20
