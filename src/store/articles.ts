import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { IArticleData } from "types";

export interface INewsArticle {
  web_url: string;
  headline: string;
  pub_date: string;
  abstract: string;
  reporter: string;
  source: string;
  isScrapped: boolean;
}

interface INews {
  allNews: IArticleData[];
  scrapArticles: INewsArticle[];
  actions: {
    setAllNews: (article: IArticleData) => void;
    setFilteredAllNews: (article: IArticleData) => void;
    setScrapToggle: (url: string) => void;
    setScrapArticles: (article: INewsArticle) => void;
  };
}

const useNewsStore = create<INews>()(
  devtools(
    persist(
      (set) => ({
        allNews: [],
        scrapArticles: [],
        actions: {
          setAllNews: (article) =>
            set((state) => {
              const isExist =
                state.allNews.at(0) !== null &&
                state.allNews.find((news) => news.web_url === article.web_url);

              if (isExist) {
                return state;
              } else {
                return {
                  allNews: [...state.allNews, article],
                };
              }
            }),
          setFilteredAllNews: (filteredArticles) => {
            set((state) => {
              const allNewsArray = [filteredArticles].map(
                (article: IArticleData) => ({
                  web_url: article.web_url,
                  headline: article.headline,
                  pub_date: article.pub_date,
                  abstract: article.abstract,
                  reporter: article.reporter,
                  source: article.source,
                  isScrapped: article.isScrapped,
                }),
              );
              return {
                allNews: allNewsArray,
              };
            });
          },
          setScrapToggle: (url) => {
            set((state) =>
              produce(state, (draft) => {
                const data = draft.allNews.find((news) => news.web_url === url);
                if (data) {
                  data.isScrapped = !data.isScrapped;
                }
              }),
            );
          },
          setScrapArticles: (article) => {
            set((state) => {
              const newArticleData = {
                ...article,
                isScrapped: !article.isScrapped,
              };

              const isExist = state.scrapArticles.find(
                (news) => news.web_url === newArticleData.web_url,
              );

              if (!isExist) {
                return {
                  ...state,
                  scrapArticles: [...state.scrapArticles, newArticleData],
                };
              } else {
                return {
                  ...state,
                  scrapArticles: state.scrapArticles.filter(
                    (news) => news.web_url !== article.web_url,
                  ),
                };
              }
            });
          },
        },
      }),
      {
        name: "scrap-storage",
      },
    ),
  ),
);

/** State */
export const useAllNews = () => useNewsStore((state) => state.allNews);
export const useScrappedArticles = () =>
  useNewsStore((state) => state.scrapArticles);
export const useAllNewsActions = () => useNewsStore((state) => state.actions);

/** Action */
export const useNewsActions = () => useNewsStore((state) => state.actions);
