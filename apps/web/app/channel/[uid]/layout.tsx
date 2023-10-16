import { getChannels } from "../../../data";
import { SideNav } from "../../../components/side-nav";

export default async function ChannelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uid: string };
}) {
  const channels = await getChannels();
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="h-screen flex flex-col bg-gray-100">
        <SideNav channels={channels} currentChannel={params.uid} />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
