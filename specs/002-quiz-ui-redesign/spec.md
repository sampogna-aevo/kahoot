# Feature Specification: Modern UI Redesign for Quiz Application

**Feature Branch**: `[002-quiz-ui-redesign]`  
**Created**: 2026-03-20  
**Status**: Draft  
**Input**: User description: "i need you to redesign my application. i want a design that is ux optimal, pleasant to the eyes and fcuntional. nothing too fancy, but somewhat towards the new level of applications we have nowadays"

## Clarifications

### Session 2026-03-20

- Q: What visual design style should guide the redesign? → A: Dark-first modern (dark backgrounds with accent colors, soft glows, muted palette, premium feel)
- Q: How should the application handle error and empty states? → A: Toast notifications only (non-blocking toasts that auto-dismiss after a few seconds, no inline feedback)
- Q: What is the maximum number of players allowed per room? → A: Up to 20 players
- Q: What layout pattern should the landing page use? → A: Atmospheric centered card (centered card with subtle animated/patterned dark background, logo, tagline, two buttons)
- Q: What style should the answer button colors use on the dark background? → A: Muted vibrant (rich jewel tones — ruby, sapphire, amber, emerald — that harmonize with dark backgrounds)

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Host Creates and Manages Quiz Room (Priority: P1)

A host opens the application, creates a quiz room, waits for players to join in the lobby, starts the quiz, advances through questions, and views final rankings.

**Why this priority**: The host is the primary actor who initiates the entire quiz experience. Without a smooth host flow, the application cannot function.

**Independent Test**: Can be fully tested by opening the landing page, clicking "Create Room", verifying the lobby UI, starting the quiz, answering questions, and viewing the final ranking screen.

**Acceptance Scenarios**:

1. **Given** the host is on the landing page, **When** they click "Criar Sala", **Then** they are taken to a visually clear lobby screen showing the room code prominently and an empty player list
2. **Given** players have joined the room, **When** the host views the lobby, **Then** each player appears as a distinct card with their nickname and a generated avatar or initial
3. **Given** the quiz is active, **When** the host views a question, **Then** the question text, progress indicator, and timer are clearly visible with proper visual hierarchy
4. **Given** a question has been answered, **When** the host sees the results, **Then** a clear button to advance to the next question is visible
5. **Given** the quiz has ended, **When** the host views the ranking screen, **Then** a sorted leaderboard with top 3 highlighted is displayed with an option to return home

---

### User Story 2 - Player Joins and Plays Quiz (Priority: P1)

A player enters a room code and nickname, waits in the lobby, answers quiz questions within the time limit, and sees their score and ranking.

**Why this priority**: Players are the core participants. The quiz experience must be engaging, clear, and responsive to keep players motivated.

**Independent Test**: Can be fully tested by joining a room with a code, waiting in the lobby, answering questions, and verifying score feedback and final ranking display.

**Acceptance Scenarios**:

1. **Given** the player is on the landing page, **When** they click "Entrar em Sala", **Then** a clean form appears with room code and nickname fields with clear labels
2. **Given** the player has joined the room, **When** they view the lobby, **Then** they see their nickname confirmed and a list of other players with avatars
3. **Given** a question is displayed, **When** the player views answer options, **Then** four distinct, color-coded answer buttons are shown in a 2x2 grid layout
4. **Given** the player selects an answer, **When** the answer is submitted, **Then** immediate visual feedback shows whether the answer was correct or incorrect
5. **Given** the timer is counting down, **When** time is running low (3 seconds or less), **Then** a clear visual urgency indicator is shown (color shift, pulse)

---

### User Story 3 - Responsive Mobile Experience (Priority: P2)

A player or host accesses the application on a mobile device and experiences a fully functional, touch-optimized interface.

**Why this priority**: Quiz games are predominantly played on mobile devices. A poor mobile experience would significantly limit adoption and usability.

**Independent Test**: Can be tested by accessing the application on various mobile screen sizes and verifying all interactive elements are tap-friendly and layouts adapt properly.

**Acceptance Scenarios**:

1. **Given** a user on a mobile device, **When** they open any screen, **Then** the layout adapts to the screen size without horizontal scrolling
2. **Given** a user tapping answer buttons, **When** they touch an option, **Then** the tap target is at least 44px in height and provides visual press feedback
3. **Given** a user on the landing page, **When** they view on mobile, **Then** buttons are full-width and easily tappable

---

### User Story 4 - Visual Feedback and Micro-interactions (Priority: P3)

Users experience smooth transitions between states, animated feedback for actions, and visual cues that enhance engagement without being distracting.

**Why this priority**: Micro-interactions elevate the perceived quality of the application and provide important UX feedback that helps users understand system state.

**Independent Test**: Can be tested by navigating through all screens and verifying transitions, button press animations, timer animations, and answer reveal effects are present and smooth.

**Acceptance Scenarios**:

1. **Given** a user navigates between screens, **When** the transition occurs, **Then** a subtle fade or slide animation plays within 300ms
2. **Given** a player answers correctly, **When** the result is shown, **Then** a positive visual animation (scale pulse or color flash) plays
3. **Given** a player answers incorrectly, **When** the result is shown, **Then** a distinct negative visual indicator appears (shake or red highlight)
4. **Given** the timer is active, **When** viewing the countdown, **Then** a circular or linear progress bar visually depletes alongside the numeric countdown

---

### Edge Cases

- What happens when a user joins on an extremely narrow screen (below 320px)? — Layout stacks vertically, font sizes scale down, buttons remain full-width
- How does the UI handle long player nicknames that might overflow containers? — Nicknames are truncated with ellipsis after 15 characters in compact views, full name shown on hover/tap
- What happens when the timer reaches zero while a user is tapping an answer? — Late submissions are rejected, a toast notification informs the user their answer was too late
- How does the ranking screen display when there are 0, 1, or 50+ players? — Empty state shows a message, single player shows their score prominently, 50+ players scroll vertically with top 3 pinned

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use a dark-first design language with dark backgrounds, accent colors for interactive elements, soft glows, and a muted premium palette consistent across all screens
- **FR-002**: System MUST present answer options in a 2x2 grid layout with distinct muted vibrant color coding (ruby, sapphire, amber, emerald) on dark cards, ensuring WCAG AA contrast ratios
- **FR-003**: System MUST include a visual timer progress bar (circular or linear) that depletes as the countdown proceeds
- **FR-004**: System MUST show clear visual urgency when the timer reaches 3 seconds or below (color change, pulse animation)
- **FR-005**: System MUST provide immediate visual feedback when a player selects an answer (selected state, then correct/incorrect state)
- **FR-006**: System MUST display a question progress indicator showing current question number out of total (e.g., "3/10")
- **FR-007**: System MUST show the room code prominently and large enough to be easily read aloud to other players
- **FR-008**: System MUST display player avatars or visual identifiers (initials with colored background) in the lobby and ranking screens
- **FR-009**: System MUST highlight the top 3 positions on the ranking screen with distinct visual treatment (gold, silver, bronze accents)
- **FR-010**: System MUST ensure all interactive elements have minimum 44px touch targets on mobile viewports
- **FR-011**: System MUST use a consistent typography hierarchy (headings, body text, labels) across all screens
- **FR-012**: System MUST include loading states with visual indicators (spinners or skeleton screens) instead of plain text
- **FR-013**: System MUST apply smooth transitions (fade or slide) between major screen states
- **FR-014**: System MUST truncate or ellipsis player names that exceed available display space
- **FR-015**: System MUST display the landing page as an atmospheric centered card on a subtle animated or patterned dark background, containing the app logo, a short tagline, and two clearly labeled action buttons (Create Room / Join Room)
- **FR-016**: System MUST use non-blocking toast notifications for all error states (invalid code, room full, connection lost) and empty states (no players), auto-dismissing after 4 seconds with optional retry action
- **FR-017**: System MUST support up to 20 players per room, displaying all players in the lobby without scrolling on standard mobile viewports (375px+ width)

### Key Entities *(include if feature involves data)*

- **Screen State**: Represents which view the user currently sees (landing, join form, lobby, quiz active, quiz results, final ranking)
- **Answer Option**: A selectable choice with associated visual styling (color, selected state, correct/incorrect state)
- **Timer State**: The current countdown value and its visual representation (progress bar fill percentage, urgency level)
- **Player Card**: A visual representation of a player including nickname, avatar/initials, and score
- **Ranking Position**: An ordered entry with position number, player name, score, and medal indicator for top 3

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify and tap the correct answer option within 1 second of reading the question on mobile devices
- **SC-002**: The room code is readable from arm's length on a mobile screen (approximately 50cm viewing distance)
- **SC-003**: All screen transitions complete within 300ms, perceived as instant by users
- **SC-004**: 95% of users can navigate from landing page to joining a room without confusion on first attempt
- **SC-005**: Answer selection feedback (correct/incorrect) is visually apparent within 200ms of submission
- **SC-006**: Timer urgency is perceptible to users without reading the numeric countdown (visual-only cue)
- **SC-007**: Touch targets are at least 44x44px on all interactive elements when viewport width is below 768px
- **SC-008**: Ranking screen clearly identifies the top 3 players to 100% of viewers without requiring text reading

## Assumptions

- The application targets modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- The primary language remains Portuguese (pt-BR) as in the current application
- The redesign focuses on visual/UX improvements only; backend logic, API routes, and data flow remain unchanged
- The application will continue to use Tailwind CSS for styling
- Mobile devices are the primary target, with desktop as secondary
- The 2x2 answer grid is the standard layout for all question types
- No audio or sound effects are included in this redesign scope
- The current 10-second timer per question is maintained
- The visual direction is dark-first modern: dark backgrounds (#0f172a to #1e293b range), accent colors for CTAs and answer options, soft glow effects on interactive elements, muted text hierarchy (white/gray-300/gray-500)
- Answer buttons use muted vibrant jewel tones (ruby, sapphire, amber, emerald) rather than fully saturated primary colors
- Maximum 20 players per room; lobby and ranking layouts must accommodate this ceiling without horizontal scrolling
