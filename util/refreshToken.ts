export default async function refreshToken(refresh_token: string) {
  const res = await fetch(
    `https://oauth2.gogleapis.com/token?client_id=${
      process.env.GOOGLE_CLIENT_ID as string
    }&client_secret=${
      process.env.GOOGLE_CLIENT_SECRET
    }&refresh_token=${refresh_token}&grant_type=refresh_token`
  );
  const data = await res.json();
  const { access_token, expires_in } = data;
  return { access_token, expires_in };
}
