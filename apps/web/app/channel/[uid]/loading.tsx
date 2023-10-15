export default async function ChannelLoading() {
  return (
    <main className="">
      <div className="h-screen flex flex-col">
        <div className="sticky top-0 w-full p-8">
          <p>Loading...</p>
        </div>
        <div className="overflow-y-auto flex-grow p-8">
          {/* Main content goes here */}
          <div>
            <p>Loading...</p>
          </div>
        </div>
        <div className="sticky bottom-0 w-full p-8 ">
          {/* Fixed content at the bottom */}
          <p>Loading...</p>
        </div>
      </div>
    </main>
  );
}
