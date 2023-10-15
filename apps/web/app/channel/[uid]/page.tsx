import { Chat } from "../../../components/chat";
import { getChannel } from "../../../data";

export default async function Channel({ params }: { params: { uid: string } }) {
  const channel = await getChannel(params.uid);
  return (
    <main className="">
      <div className="h-screen flex flex-col">
        <div className="sticky top-0 w-full p-8 border-b">
          <h1 className="font-bold text-xl mb-2">#{channel.name}</h1>
          <p>{channel.description}</p>
        </div>
        <Chat channel={channel} />
      </div>
    </main>
  );
}
