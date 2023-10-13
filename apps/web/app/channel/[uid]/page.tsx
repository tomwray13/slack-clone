import { SideNav } from "../../../components/side-nav";
import { getChannel } from "../../../data";

export default async function Channel({ params }: { params: { uid: string } }) {
  const channel = await getChannel(params.uid);
  const loggedInUser = {
    id: `700`,
  };
  const colors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-red-50",
  ];
  const getColor = (userId: string) => colors[parseInt(userId) % colors.length];
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="h-screen flex flex-col bg-gray-100">
        <SideNav uid={params.uid} />
      </div>
      <div className="col-span-3">
        <main className="">
          <div className="h-screen flex flex-col">
            <div className="sticky top-0 w-full p-8 border-b">
              <h1 className="font-bold text-xl mb-2">#{channel.name}</h1>
              <p>{channel.description}</p>
            </div>
            <div className="overflow-y-auto flex-grow p-8 flex flex-col-reverse space-y-reverse space-y-6">
              {channel.messages.map((message) => (
                <div
                  key={message.id}
                  className={`w-4/5 ${
                    message.user.id === loggedInUser.id
                      ? "self-start"
                      : "self-end"
                  }`}
                >
                  <div
                    className={`rounded-lg py-2 px-4 ${getColor(
                      message.user.id
                    )}`}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <p className="text-xs uppercase">{`${message.user.firstName[0]}${message.user.lastName[0]}`}</p>
                      </div>
                      <span className="ml-2 text-sm font-bold">
                        {message.user.firstName} {message.user.lastName}
                      </span>
                    </div>
                    <p>{message.text}</p>
                    <p className="text-xs mt-2 text-gray-600">
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(message.createdAt))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 w-full p-8 border-t">
              {/* Fixed content at the bottom */}
              <p>Input field and button here</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
