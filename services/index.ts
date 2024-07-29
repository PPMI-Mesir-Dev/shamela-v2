export const PUBLIC_API_URL = "https://2660-41-236-207-143.ngrok-free.app";

export async function getNews({ pageParam }: any) {
  const response = await fetch(
    `https://www.ppmimesir.or.id/wp-json/wp/v2/posts?page=${pageParam}`,
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
  const response = await fetch(`${PUBLIC_API_URL}/api/video/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getWihdah() {
  const response = await fetch(
    `${PUBLIC_API_URL}/api/badan-otonom/669792e6d192a16535ece054`,
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
  const response = await fetch(`${PUBLIC_API_URL}/api/media/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getKekeluargaan() {
  const response = await fetch(`${PUBLIC_API_URL}/api/kekeluargaan`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getRadio() {
  const response = await fetch(
    `${PUBLIC_API_URL}/api/badan-otonom/669793c4d192a16535ece070`,
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
  const response = await fetch(`${PUBLIC_API_URL}/api/agenda`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getPublikasi({ pageParam }: any) {
  const response = await fetch(
    `${PUBLIC_API_URL}/api/publikasi?page=${pageParam}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getPublikasiById({ queryKey }: any) {
  const [_key, { id }] = queryKey;
  const response = await fetch(`${PUBLIC_API_URL}/api/publikasi/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getPustaka({ pageParam }: any) {
  const response = await fetch(
    `${PUBLIC_API_URL}/api/publikasi?page=${pageParam}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getPustakaById({ queryKey }: any) {
  const [_key, { id }] = queryKey;
  const response = await fetch(`${PUBLIC_API_URL}/api/publikasi/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}
