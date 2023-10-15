import Link from "next/link";
import { getChannels } from "../../data";

export default async function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const channels = await getChannels();
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="h-screen flex flex-col bg-gray-100">
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
                  className={`py-2 px-8 hover:bg-slate-200 `}
                >
                  <p>#{channel.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 w-full p-8">
          {/* Fixed content at the bottom */}
          <p className="opacity-40 hover:opacity-100 cursor-pointer">Logout</p>
        </div>
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
