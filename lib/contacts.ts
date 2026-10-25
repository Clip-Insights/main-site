import { CONTACT_EMAIL } from "./site";

interface DeveloperContact {
  name: string;
  role: string;
  avatar?: string;
  email?: string;
  github?: string;
  linkedin: string;
}

// Display order shared by desktop and mobile.
export const developerContacts: DeveloperContact[] = [
  { name: "Muhammad Zubair", role: "Developer", email: CONTACT_EMAIL, avatar: "/people/muhammad-zubair.jpg", github: "https://github.com/zubayr-ahmad", linkedin: "https://www.linkedin.com/in/zubayr-ahmad/" },
  { name: "Anas Waleed Tahir", role: "Developer", avatar: "/people/anaswaleedtahir.jpg", github: "https://github.com/anaswaleedtahir", linkedin: "https://www.linkedin.com/in/anas-waleed-tahir-9a5b78214/" },
  { name: "Muhammad Abdullah Ghazi", role: "Developer", avatar: "/people/abdullahdotnet.jpg", github: "https://github.com/abdullahdotnet", linkedin: "https://www.linkedin.com/in/abdullahdotnet20/" },
  { name: "Abdullah Ashfaq", role: "Developer", avatar: "/people/abdullahashfaqvirk.jpg", github: "https://github.com/abdullahashfaqvirk", linkedin: "https://www.linkedin.com/in/abdullahashfaqvirk/" },
  { name: "Etisam Ul Haq", role: "Developer", avatar: "/people/etisamhaq.jpg", github: "https://github.com/etisamhaq", linkedin: "https://www.linkedin.com/in/etisamulhaq/" },
];
