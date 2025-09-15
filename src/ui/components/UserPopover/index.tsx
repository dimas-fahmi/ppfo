import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../shadcn/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../shadcn/components/ui/avatar";
import { useProfile } from "@/src/lib/hooks/useProfile";
import { DEFAULT_AVATAR_PLACEHOLDER } from "@/src/lib/configs/app";
import { Button } from "../../shadcn/components/ui/button";
import Link from "next/link";
import { Bell, LogOut, LucideIcon, UserRoundPen } from "lucide-react";
import { useSignOut } from "@/src/lib/hooks/useAuth";
import { cn } from "@/src/lib/shadcn/utils";

type Reactivity =
  | { href: string; onClick?: undefined }
  | { href?: undefined; onClick: () => void };

interface PopoverItemProps {
  icon: LucideIcon;
  title: string;
  disabled?: boolean;
  className?: string;
}

const PopoverItem = ({
  icon,
  title,
  href,
  onClick,
  disabled = false,
  className,
}: PopoverItemProps & Reactivity) => {
  const Icon = icon;

  const Content = (
    <>
      <Icon />
      {title}
    </>
  );

  return (
    <Button
      onClick={!onClick ? () => {} : onClick}
      variant={"outline"}
      asChild={!onClick}
      disabled={disabled}
      className={cn("", className)}
    >
      {href ? <Link href={href}>{Content}</Link> : Content}
    </Button>
  );
};

const UserPopover = ({ className }: { className?: string }) => {
  const { data: profile } = useProfile();
  const signOut = useSignOut();

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer active:scale-90 transition-all duration-300">
        <Avatar
          className={cn(
            "hover:scale-[1.05] transition-all duration-300",
            className
          )}
        >
          <AvatarImage
            src={profile?.avatar ?? DEFAULT_AVATAR_PLACEHOLDER}
            alt="Placeholder"
          />
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mx-4 gap-2">
        {/* Header */}
        <header className="flex flex-col justify-center items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={profile?.avatar ?? DEFAULT_AVATAR_PLACEHOLDER}
              alt="Placeholder"
            />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-header">
            {profile?.firstName} {profile?.lastName}
          </h1>
          <p className="text-sm font-light">{profile?.username}</p>
        </header>

        {/* Navigation */}
        <div className="mt-4 grid grid-cols-1 gap-2">
          <PopoverItem
            icon={Bell}
            href="/notifications"
            title="Notifications"
          />
          <div className="grid grid-cols-2 gap-2">
            <PopoverItem icon={UserRoundPen} href="/profile" title="Profile" />
            <PopoverItem
              icon={LogOut}
              onClick={() => {
                signOut.mutate();
              }}
              title="Logout"
              disabled={signOut.isPending}
              className="hover:bg-destructive/20 hover:text-destructive"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
