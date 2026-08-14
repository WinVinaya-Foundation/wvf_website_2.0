# Award photos

Drop these two files in here and they appear on the Awards & Recognition
page automatically — no code changes needed. Until they exist, each shows
a themed placeholder icon instead.

- `atf-award-ceremony.jpg` — the award ceremony photo (roughly 4:3,
  landscape works best; it's cropped to fill its frame).
- `atf-badge.png` — the ATF/AssisTech Foundation badge or logo, ideally
  transparent PNG (it's shown uncropped, "contain"-fit).

If more awards get their own photo later, add the file and point that
award's `photoUrl`/`badgeUrl` at it in
`src/pages/about/awardsContent.ts`.
