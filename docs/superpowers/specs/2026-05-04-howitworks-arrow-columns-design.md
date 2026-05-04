# HowItWorks — Arrow & Column Width Design

**Date:** 2026-05-04
**File:** `src/components/HowItWorks.jsx`

## Summary

Two targeted UI adjustments to the HowItWorks section based on user feedback.

## Changes

### 1. Arrow 2× Bigger

**Component:** `StepArrow` SVG (defined at top of HowItWorks.jsx)

- `width`: `48` → `96`
- `height`: `20` → `40`
- `viewBox`: `"0 0 48 20"` → `"0 0 96 40"`
- All path coordinates scaled ×2:
  - Shaft: `M2 10 C14 8.5 28 11.5 38 10` → `M4 20 C28 17 56 23 76 20`
  - Arrowhead: `M33 5.5 L40 10 L33 14.5` → `M66 11 L80 20 L66 29`
  - Tail dot: `cx="3" cy="10" r="1.5"` → `cx="6" cy="20" r="3"`

### 2. Steps Container Wider

**Element:** `div` wrapping `{stepsRef}`

- Remove `maxWidth: '900px'` → no max-width constraint (inherits parent `1200px`)
- Step item `padding`: `'0 28px'` → `'0 40px'`

## Constraints

- No other changes: font sizes, icon size, colors, animations unchanged
- Mobile CSS rule `.hiw-steps { flex-direction: column }` remains unaffected
