import Link from "next/link";
import { getChannels } from "../data";

const SideNav = async ({ uid }: { uid: string }) => {
  const channels = await getChannels();
  return (
    <>
      <div className="sticky top-0 w-full p-8 ">
        {/* Fixed content at the bottom */}
        <p>Add new channel button goes here</p>
      </div>
      <div className="overflow-y-auto flex-grow">
        {/* Main content goes here */}
        <div>
          {!channels && <p>Loading...</p>}
          {channels.length === 0 && <p>No channels</p>}
          {channels.map((channel) => (
            <Link href={`/channel/${channel.id}`} key={channel.id}>
              <div
                key={channel.id}
                className={`py-2 px-8 hover:bg-slate-200 ${
                  channel.id === uid ? "bg-slate-800 text-white" : ""
                }`}
              >
                <p>#{channel.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 w-full p-8 border-t">
        {/* Fixed content at the bottom */}
        <p className="opacity-40 hover:opacity-100 cursor-pointer">Logout</p>
      </div>
    </>
  );
};

export { SideNav };
