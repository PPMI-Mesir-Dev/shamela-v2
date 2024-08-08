export const PUBLIC_API_URL = `https://ppmi.nubiacademy.id`;

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

export async function getNewsByPage({ queryKey }: any) {
  const response = await fetch(
    `https://www.ppmimesir.or.id/wp-json/wp/v2/posts?page=${queryKey[1]}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getSinglePost({ queryKey }: any) {
  const response = await fetch(
    `https://www.ppmimesir.or.id/wp-json/wp/v2/posts/${queryKey[1]}`,
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

export async function getBadanOtonom() {
  const response = await fetch(`${PUBLIC_API_URL}/api/badan-otonom`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}

export async function getHimbauan() {
  const response = await fetch(`${PUBLIC_API_URL}/api/himbauan`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}
