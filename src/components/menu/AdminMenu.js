import { mdiAccount, mdiBook,mdiDoorOpen,mdiAccountGroupOutline,mdiAccountCog } from "@mdi/js";
export const AdminMenu = [
  {
    path: "/students",
    label: "Students",
    name: "students",
    icon: mdiAccount,
  },
  {
    path: "/courses",
    label: "Courses",
    name: "courses",
    icon: mdiBook,
  },
  {
    path: "/rooms",
    label: "Rooms",
    name: "rooms",
    icon: mdiDoorOpen,
  },
  {
    path: "/groups",
    label: "Groups",
    name: "groups",
    keys:"single_group",
    icon: mdiAccountGroupOutline,
  },
  {
    path: "/admin-profile",
    label: "Profile",
    name: "admin-profile",
    icon: mdiAccountCog,
  },
];
