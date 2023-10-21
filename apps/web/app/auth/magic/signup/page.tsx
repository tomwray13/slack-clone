export default function MagicSignUp({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const email = searchParams?.email;
  const firstName = searchParams?.firstName;
  const lastName = searchParams?.lastName;
  if (!email || !firstName || !lastName) {
    return;
  }
  return;
}
