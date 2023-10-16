export interface Channel {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface ChannelWithMessages extends Channel {
  messages: Message[];
}

export async function getChannels(): Promise<Channel[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/channel`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();
  return json.data;
}

export async function getChannel(id: string): Promise<ChannelWithMessages> {
  const res = await fetch(`${process.env.BACKEND_URL}/channel/${id}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();
  return json.data;
}

export async function getMainChannel() {
  const channels = await getChannels();
  return channels[0];
}
