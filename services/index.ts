export async function getNews() {
  const response = await fetch(
    `https://www.ppmimesir.or.id/wp-json/wp/v2/posts?page=1`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getVideos() {
  const response = await fetch(
    `https://5364-156-222-200-203.ngrok-free.app/api/video/`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getWihdah() {
  const response = await fetch(
    `https://5364-156-222-200-203.ngrok-free.app/api/badan-otonom/669792e6d192a16535ece054`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getImage() {
  const response = await fetch(
    `https://5364-156-222-200-203.ngrok-free.app/api/media/`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getKekeluargaan() {
  const response = await fetch(
    `https://5364-156-222-200-203.ngrok-free.app/api/kekeluargaan`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getRadio() {
  const response = await fetch(
    `https://5364-156-222-200-203.ngrok-free.app/api/badan-otonom/669793c4d192a16535ece070`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getAgenda() {
  const response = await fetch(
    `https://5364-156-222-200-203.ngrok-free.app/api/agenda`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}
