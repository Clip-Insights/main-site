# Contact page profiles

The Contact page uses the requested display order in `lib/contacts.ts`. Display order: Muhammad Zubair, Anas Waleed Tahir, Muhammad Abdullah Ghazi, Abdullah Ashfaq, Etisam Ul Haq. All contributors use the same Developer label and visual treatment. Optional email, GitHub and avatar fields are omitted when unavailable; an initials fallback is available for missing avatars. Product support remains a compact shared-purpose contact, without ownership or leadership titles.

The four LinkedIn URLs supplied by the user match links on these public GitHub profiles, checked on 25 October 2026:

| Name | GitHub | LinkedIn |
| --- | --- | --- |
| Abdullah Ashfaq | https://github.com/abdullahashfaqvirk | https://www.linkedin.com/in/abdullahashfaqvirk/ |
| Anas Waleed Tahir | https://github.com/anaswaleedtahir | https://www.linkedin.com/in/anas-waleed-tahir-9a5b78214/ |
| Etisam Ul Haq | https://github.com/etisamhaq | https://www.linkedin.com/in/etisamulhaq/ |
| Muhammad Abdullah Ghazi | https://github.com/abdullahdotnet | https://www.linkedin.com/in/abdullahdotnet20/ |
| Muhammad Zubair | https://github.com/zubayr-ahmad | https://www.linkedin.com/in/zubayr-ahmad/ |

LinkedIn photos were not available through public access. Avatars are locally saved copies of the verified GitHub avatars, fetched using GitHub's public profile API. No guessed email addresses, professional biographies or contribution rankings were added.

Contact layout lives in `components/contact-page.tsx`; the MDX file supplies its title and description. The other information pages continue using their existing MDX layout.

Verified: ESLint, Webpack production build and TypeScript; 36 local URL checks and seven legacy redirects; all five avatars loaded; responsive layouts at 320, 390, 768, 1024 and 1440 pixels; compact 12px support address; no horizontal overflow; copy-address feedback and primary email and account/privacy links.


## Contact redesign, second pass

Reviewed Linear (https://linear.app/contact), Figma (https://www.figma.com/contact/) and Notion (https://www.notion.com/contact-sales). Linear and Figma make support routing explicit; Notion focuses its sales flow on one next step. The previous Clip Insights page emphasized the developer directory, repeated email paths, and buried the primary contact action. The running development server also served an older global stylesheet: the previous `contact-intro` computed as block rather than grid.

Replaced that structure with a concise heading, primary email panel, two resource links and a compact equal-weight contributor roster. Dedicated CSS Modules now travel with the page components; verified that the affected local page loads the module and computes as grid. No contact form or delivery service is simulated. The email action opens a mail client and the copy control provides a working alternative.


## Contact presentation follow-up

Left-aligned the contact heading and removed the visible support address, copy button and helper text. The Email the team button retains the same mailto recipient. Verified on the running local site at 390px and 1440px: left alignment, no address visible in body text, no copy control, correct mailto target and no horizontal overflow. A further public LinkedIn check redirected to the sign-in wall with no accessible profile image, so the verified GitHub avatars remain.
