export async function sendSlackMessage(name, description, startsAt, endsAt) {
  const response = await fetch(
    "https://cronjobs.hacksc.com/api/message-slack",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({
        name: name,
        description: description,
        startsAt: startsAt,
        endsAt: endsAt,
      }),
    }
  );

  return response;
}
