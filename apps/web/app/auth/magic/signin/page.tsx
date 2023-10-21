export default function MagicSignIn({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const email = searchParams?.email;
  if (!email) {
    return;
  }
  return;
}
