import { useDispatch, useSelector } from "react-redux";
import { Chat } from "../components/Chat";
import { SideNav } from "../components/Sidenav";
import { RootState } from "../store";
import { addChannels, setActiveChannel } from "../store/channels";
import { useEffect } from "react";
import { useGetChannelsQuery } from "../store/api";

export default function Home() {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector(
    (state: RootState) => state.channels
  );
  const {
    data: channels,
    isFetching,
    isError,
  } = useGetChannelsQuery(undefined);

  useEffect(() => {
    if (channels) {
      dispatch(addChannels(channels.data))
    }
    if (channels && channels.data.length > 0 && !activeChannelId) {
      dispatch(setActiveChannel({ id: channels.data[0].id }));
    }
  }, [dispatch, channels, activeChannelId]);
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching channels</div>;
  }
  if (channels) {
    console.log(channels);
  }
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <SideNav />
      <Chat channelId={activeChannelId} />
    </div>
  );
}
