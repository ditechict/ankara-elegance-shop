# Create the reusable homepage visual-edits guide

## Deliverable
Create a standalone Markdown document in Files that lets a developer reproduce the recent Gedhe Couture homepage edits on another repository of the same website.

## Content
- Start with prerequisites and a short scope statement covering only the recent homepage changes.
- Document each edit with its purpose, source location, before/after code, exact replacement steps, and expected visual result:
  1. Remove the three-item summary strip from the bottom of the hero and delete its unused data.
  2. Remove “The House,” its introductory heading, and supporting paragraph above the vertical cards.
  3. Close the resulting space by keeping the vertical cards directly after the hero with the current mobile and desktop section spacing.
  4. Replace the two vertical-card labels and two catalog filter labels through their shared data source.
  5. Remove the visible `01`, `02`, and `03` card markers.
- Correct the earlier marker implementation: remove the marker paragraph completely instead of inserting `{"\\n"}`, because the newline is invisible but leaves an empty styled block and unwanted spacing.
- Explain that the menu bar was requested and recorded as follow-up work but was not actually implemented in the inspected source; do not present it as one of the completed visual edits.
- Preserve all unaffected behavior: hero copy and catalog action, three vertical cards, filtering, Instagram/WhatsApp actions, product catalog, bag, and checkout.
- Add repository-variation guidance so the reader can trace labels from rendered elements to shared constants if line numbers differ.

## Verification checklist
- Confirm the hero summary strip and verticals intro are absent.
- Confirm exactly three vertical cards remain, with no blank number placeholder or excess top gap.
- Confirm all four replacement labels render exactly as specified.
- Confirm every card action and catalog filter still works.
- Check phone and desktop layouts for a clean hero-to-card transition, then run the repository’s normal type/build checks and inspect browser errors.

## Technical notes
- Use the inspected current source and archived change plans as evidence.
- Include code snippets that are narrowly scoped and safe to copy; do not include unrelated payment, backend, or admin changes.
- Name likely files but instruct readers to search by old display text and data usage rather than relying only on line numbers.
