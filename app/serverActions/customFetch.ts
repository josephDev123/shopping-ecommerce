"use server";

type revalidate = number | undefined;
type Cache = RequestCache | undefined;

type CustomFetchOptions = {
  url: string;
  revalidate?: number;
  //   cache?: RequestCache;
};
export async function CustomFetch({
  url,
  revalidate,
}: //   cache = "force-cache",
CustomFetchOptions) {
  try {
    const response = await fetch(url, {
      next: { revalidate },
      //   cache: cache,
    });

    const parseResult = await response.json();
    if (!response.ok) {
      // Handle errors
      // console.error(`Error: ${response.status} - ${response.statusText}`);

      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return parseResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("something went wrong");
  }
}
