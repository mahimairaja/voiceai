# Contributing

Thanks for helping keep this a high-signal, vendor-neutral learning path for building real-time voice AI agents. New resources, fixes, and removals are all welcome.

## What belongs here

A resource should be:

- **Active in the last 12 months.**
- **Accessible to developers**: no hard paywall or signup wall to get value.
- **Vendor-neutral, or clearly labeled** when authored by a commercial party.
- **Genuinely notable**: canonical docs, widely used open-source projects, authoritative guides, or landmark papers and datasets. Brand-new or low-traction projects are usually held until they have real adoption.

If you authored or work on the resource, please disclose that in the pull request.

## How to add a resource

1. Find the most specific section (see the table of contents).
2. Add a single bullet that matches the existing format:

   ```
   - 🟢 [Title](https://link): One-line description of what it is and why it is useful.
   ```

   - The level tag is a single emoji at the start of the bullet: 🟢 beginner, 🟡 intermediate, 🔴 advanced. Blogs, podcasts, and communities (sections 17-19) are left untagged.
   - The separator between the link and the description is a colon, and the description ends with a period.
3. Bump the resource count in that section's `<summary>` line (both languages).
4. **Keep both languages in parity.** Add the matching entry to **both** `README.md` and `README_zh.md`. If you cannot translate it, add the English entry and note in the PR that the Chinese line still needs a translation.

   - `README_zh.md` uses full-width punctuation: `：` after the link, `、` between listed items, `（）` for parentheses, and `。` to end the line.
   - Translate "agent" as 智能体. Bare "Agent" is reserved for product names such as LiveKit Agents.
5. Keep it concise and specific. No marketing language.

## Reporting issues

Open an issue to suggest additions or removals, or to report a dead or moved link. A scheduled CI job checks every link weekly, but human reports are faster and welcome.

## House style

- No em dashes. Use colons, periods, or parentheses.
- One resource per bullet, placed in the most specific section.
- Prefer free, official, and vendor-neutral sources.
