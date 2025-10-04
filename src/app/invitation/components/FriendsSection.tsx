import React from "react";
import UserCircleIcon from "../../../components/icons/UserCircleIcon";

interface Friend {
  id: number;
  name: string;
}

interface FriendsSectionProps {
  friends: Friend[];
}

export default function FriendsSection({ friends }: FriendsSectionProps) {
  return (
    <div>
      <label className="text-lg font-semibold text-gray-700">초대한 친구</label>
      <div className="mt-2 space-y-3">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <UserCircleIcon />
              <span className="text-lg font-medium text-gray-800">
                {friend.name}
              </span>
            </div>
            <button className="text-sm text-red-500 hover:text-red-700">
              삭제
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 w-full p-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
      >
        + 친구 초대
      </button>
    </div>
  );
}
