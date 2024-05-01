export const useFetch = () => {
  return async (url: string, method: string, body: object) => {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  };
};
