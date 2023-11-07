import { IArticle } from "#types";
import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const baseURL = axios.create({
  baseURL: BASE_URL,
});

export const getArticles = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<IArticle[]> => {
  const { data } = await baseURL.get(
    `?page=${pageParam}&sort=newest&api-key=${API_KEY}`,
  );

  return data.response.docs;
};

export const getFilteredArticles = async ({
  pageParam = 1,
  date = "",
  countries = [],
}: {
  pageParam: number;
  date: string;
  countries: string[];
}): Promise<IArticle[]> => {
  const filters = [];

  if (date) {
    const formattedDate = DateTime.fromISO(date).toFormat("yyyyMMdd");
    filters.push(`begin_date=${formattedDate}&page=${pageParam}`);
  }

  if (countries && countries.length > 0) {
    filters.push(`q=${countries.join(",")}`);
  }

  const filterQueryString = filters.join("&");

  const { data } = await baseURL.get(
    `?${filterQueryString}&api-key=${API_KEY}`,
  );

  return data.response.docs;
};
