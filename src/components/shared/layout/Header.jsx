import React from "react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { BellIcon, ChevronDownIcon, SearchIcon } from "lucide-react";

export default function Header({ user = { name: "Babatunde Alaraje" } }) {
  return (
    <header className="w-full h-[90px] bg-white flex items-center justify-between px-6 z-[50] fixed top-0 pt-2  right-0">
{/* Logo Section */}
      <div className="flex items-center gap-6">
        <img
          className="w-[90px] h-[90px] object-cover"
          alt="Company Logo"
          src="https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/468003658_122112544214596405_8899206654368310843_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JdaHOFBwcuAQ7kNvwG1nKV7&_nc_oc=AdkUij3RA0M3LYl3vVOvZ-2zO4YIaknvmy8hTq6c4nhzAAxb6Pm5v7tZPKX4P0AIUd6c1IYddjHAcavSdpd5JQ44&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=g_iv4hQXsoFnIQVUu0hUpw&oh=00_AfJxoGTStTisYyCfXKh6bdKNbkw55oBCCqzSr95I0t7n9Q&oe=683C6E92"
        />
      </div>

      {/* Search Bar */}
      <div className="flex-1 ml-20">
        <div className="relative max-w-[391px]">
          <Input
            className="pl-10 py-3 h-[49px] bg-[#f7f9fc] border-[#ececec] rounded-md"
            placeholder="Search..."
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#bfbfbf]" />
        </div>
      </div>
            {/* Center: User Greeting */}

      {/* Right Side: Notifications & User */}
      <div className="flex items-center gap-5">
        <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        <span className="text-sm text-gray-800 whitespace-nowrap font-medium cursor-pointer">
          Code: REM001
        </span>
        <div className="flex items-center gap-[9px] cursor-pointer">
          <div className="flex items-center gap-[7px]">
            <Avatar className="w-[30px] h-[30px] bg-green-700">
            <AvatarFallback className="font-semibold text-white text-[13px]">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500 whitespace-nowrap font-bold">
            {user.name}         
              </span>
          </div>
          <ChevronDownIcon className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
