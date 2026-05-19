---
title: AtomQuest
description: >
  A corporate goal tracking portal. We are using a Linear-inspired aesthetic:
  deep dark theme, vibrant but subtle purple/violet accents, modern sans-serif
  typography, and structured layouts with borders and glassmorphism.
deviceType: DESKTOP
---

# AtomQuest Design System

This is the primary design system for the AtomQuest portal, optimized for premium SaaS experiences with a sleek, low-contrast dark mode foundation.

## 1. Typography
We use **Inter** (or a system geometric sans-serif) for all UI text, emphasizing clarity and structure.

- **Headings**: Crisp, slightly tighter letter-spacing.
- **Body**: Highly legible, subtle contrast variations (never pure white text).
- **Labels**: Uppercase, small, high-tracking for secondary metadata.

## 2. Color Palette
The color scheme is almost entirely dark mode.

- **Backgrounds**: 
  - Main app background: `#0E1015` (Deep navy/charcoal)
  - Card/Surface backgrounds: `#17191F` (Slightly lighter for elevation)
- **Text**: 
  - Primary text: `#F1F2F4` (Off-white)
  - Secondary/Muted text: `#8A8F98` (Cool gray)
- **Accents & Borders**:
  - Borders/Dividers: `#272A30` (Subtle separators)
  - Primary Brand/Action Color: `#5E6AD2` (Vibrant Linear Purple)
  - Secondary/Hover Color: `#707DEC` (Lighter Purple)
- **Status/Semantic Colors**:
  - Success/On Track: `#3E8E41` (Green)
  - Warning/Not Started: `#E5A832` (Amber)
  - Danger/Overdue/Return: `#D14343` (Red)

## 3. Shape & Geometry
Sharp, precise, yet accessible.

- **Roundness**: `8px` for primary elements (buttons, inputs, cards).
- **Padding**: Generous interior padding for cards, compact spacing for data density in tables.
- **Borders**: 1px subtle borders on almost all surfaces instead of heavy drop shadows.
- **Shadows**: Soft, multi-layered black shadows (`rgba(0,0,0,0.4)`) only for popovers or highly elevated elements.

## 4. Interaction & Motion
Interactions should feel instantaneous.

- **Hover States**: Slight background lightening, subtle border color changes.
- **Focus States**: Crisp `2px` purple ring (`#5E6AD2`).
- **Transitions**: Fast, `150ms` ease-in-out for all interactive states.

## 5. UI Elements
- **Navigation**: Sidebar or top navbar with highly muted icons until hovered.
- **Buttons**:
  - Primary: Solid purple `#5E6AD2` background, white text.
  - Secondary/Outline: Transparent background, subtle border, white text.
- **Inputs**: Darker background than surface (`#0E1015`), subtle border, placeholder text in `#8A8F98`.
- **Tables**: Clean rows, no vertical dividers, subtle horizontal borders, aligned data.

## 6. Layout
Max-width constraints on main content areas to maintain readability on large screens, utilizing CSS Grid and Flexbox for precise alignment. Use 2-column layouts where applicable (e.g. form + checklist).
