import { getMainChannel } from "../data";
import { redirect } from "next/navigation";

export default async function Home() {
  const mainChannel = await getMainChannel();
  redirect(`/channel/${mainChannel.id}`);
}
