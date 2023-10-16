"use client";

import Link from "next/link";
import { Channel } from "../data";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import { AddChannel } from "./add-channel";
import useChannelStore from "../store/channels.store";
import { useEffect } from "react";

const SideNav = ({
  channels,
  currentChannel,
}: {
  channels: Channel[];
  currentChannel: string;
}) => {
  // set messages state in the store
  useEffect(() => {
    useChannelStore.setState({ channels });
  }, [channels]);
  const channelsInState = useChannelStore((state) => state.channels);
  return (
    <>
      <div className="sticky top-0 w-full p-8 ">
        {/* Fixed content at the bottom */}
        <AddChannel />
      </div>
      <div className="overflow-y-auto flex-grow">
        {/* Main content goes here */}
        <div>
          {!channelsInState ||
            (channelsInState.length === 0 && <p>Loading...</p>)}
          {channelsInState.map((channel) => (
            <Link href={`/channel/${channel.id}`} key={channel.id}>
              <div
                key={channel.id}
                className={`py-2 px-8 hover:bg-slate-200 ${
                  channel.id.toString() === currentChannel
                    ? "bg-slate-800 text-white"
                    : ""
                }`}
              >
                <p>#{channel.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 w-full p-8">
        {/* Fixed content at the bottom */}
        <p className="opacity-40 hover:opacity-100 cursor-pointer text-sm">
          Logout
        </p>
      </div>
    </>
  );
};

export { SideNav };
