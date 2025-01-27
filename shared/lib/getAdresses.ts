import axios from "axios";

export const getAdresses = async (value: string) => {
  const { data } = await axios.post(
    process.env.DADATA_URL as string,
    { query: value },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + process.env.DADATA_TOKEN,
      },
    }
  );
  return data.suggestions;
};
