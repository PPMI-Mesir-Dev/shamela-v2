export function newsFilterData(data: [] | any): [] | any {
  return Array.isArray(data)
    ? data.map((arr: any) => {
        return {
          id: arr["id"],
          date: new Date(arr["date"]).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
          slug: arr["slug"],
          title: arr["title"].rendered,
          image: arr["jetpack_featured_media_url"],
          author: arr["yoast_head_json"]["author"],
          content: arr["content"].rendered,
          description: arr["yoast_head_json"].schema["@graph"][1].caption,
          imgHeight: arr["yoast_head_json"].og_image[0].height,
          imgWidth: arr["yoast_head_json"].og_image[0].width,
          avatarWriter:
            arr["yoast_head_json"].schema["@graph"][
              arr["yoast_head_json"].schema["@graph"].length - 1
            ]["image"].contentUrl,
        };
      })
    : {
        id: data["id"],
        date: new Date(data["date"]).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        slug: data["slug"],
        title: data["title"].rendered,
        image: data["jetpack_featured_media_url"],
        author: data["yoast_head_json"]["author"],
        content: data["content"].rendered,
        description: data["yoast_head_json"].schema["@graph"][1].caption,
        imgHeight: data["yoast_head_json"].og_image[0].height,
        imgWidth: data["yoast_head_json"].og_image[0].width,
        avatarWriter:
          data["yoast_head_json"].schema["@graph"][
            data["yoast_head_json"].schema["@graph"].length - 1
          ]["image"].contentUrl,
      };
}

export function getYoutubeVideoId(url: string) {
  // Regular expression to match various YouTube URL formats
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/embed\/|\/v\/|\/)([^#\&\?]*)/
  );

  // If a match is found, return the video ID (group 1 of the match)
  if (match && match[1].length === 11) {
    return match[1];
  } else {
    // If no match or invalid ID length, return null (or an error message)
    return "Error";
  }
}
