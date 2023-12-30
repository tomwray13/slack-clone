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

export async function magicSignIn(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/magic/signin`,
    {
      next: { revalidate: 1 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    if (Array.isArray(data.message)) {
      throw data.message[0]; // Assuming message is always an array
    }
    throw data.message;
  }
}

export async function magicSignUp({
  email,
  firstName,
  lastName,
}: {
  email: string;
  firstName: string;
  lastName: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/magic/signup`,
    {
      next: { revalidate: 1 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, firstName, lastName }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    if (Array.isArray(data.message)) {
      throw data.message[0]; // Assuming message is always an array
    }
    throw data.message;
  }
}

export async function magicVerify({ uuid }: { uuid: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/magic/verify/${uuid}`,
    {
      next: { revalidate: 1 },
      method: "POST",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    if (Array.isArray(data.message)) {
      throw data.message[0]; // Assuming message is always an array
    }
    throw data.message;
  }
}

export async function handleGoogleAuth({ token }: { token: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
    {
      next: { revalidate: 1 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: `include`,
      body: JSON.stringify({
        token,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    if (Array.isArray(data.message)) {
      throw data.message[0]; // Assuming message is always an array
    }
    throw data.message;
  }
  return data;
}
