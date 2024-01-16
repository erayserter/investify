import { UserButton } from "@clerk/nextjs";

import { ToggleTheme } from "@/app/ui/toggle-theme";

export const Navbar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b px-6 shadow-lg">
      <div>Logo</div>
      <div className="flex h-full items-center justify-end gap-4">
        <ToggleTheme />
        <UserButton />
      </div>
    </div>
  );
};
