import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { IArticleData } from "#types";
import { INewsArticle } from "./articles";
import { countries } from "./countries";

interface IModal {
  toggle: boolean;
  headline: string;
  selectedDate: string;
  selectedCountries: { label: string; status: boolean }[];
  filteredArticles: IArticleData[];
  scrapFilteredArticles: INewsArticle[];
  actions: {
    setToggle: (isOpen: boolean) => void;
    setHeadline: (value: string) => void;
    setSelectedDate: (value: string) => void;
    setSelectedCountries: (value: { label: string; status: boolean }[]) => void;
    setFilteredArticles: (article: IArticleData) => void;
  };
}

const useModalStore = create<IModal>()(
  devtools(
    (set) => ({
      toggle: false,
      headline: "",
      selectedDate: "",
      selectedCountries: countries,
      filteredArticles: [],
      scrapFilteredArticles: [],
      actions: {
        setToggle: (isOpen) =>
          set((state) => {
            return produce(state, (draft) => {
              draft.toggle = isOpen;
            });
          }),
        setHeadline: (value) =>
          set((state) => {
            return produce(state, (draft) => {
              draft.headline = value;
            });
          }),
        setSelectedDate: (value) =>
          set((state) => {
            return produce(state, (draft) => {
              draft.selectedDate = value;
            });
          }),
        setSelectedCountries: (value) =>
          set((state) => {
            return produce(state, (draft) => {
              draft.selectedCountries = value;
            });
          }),
        setFilteredArticles: (article) =>
          set((state) => {
            const isExist =
              state.filteredArticles.at(0) !== null &&
              state.filteredArticles.find(
                (news) => news.web_url === article.web_url,
              );

            if (isExist) {
              return {};
            } else {
              return produce(state, (draft) => {
                draft.filteredArticles.push(article);
              });
            }
          }),
      },
    }),
    {
      name: "modal-storage",
    },
  ),
);

/** State */
export const useToggle = () => useModalStore((state) => state.toggle);
export const useHeadline = () => useModalStore((state) => state.headline);
export const useSelectedDate = () =>
  useModalStore((state) => state.selectedDate);
export const useSelectedCountries = () =>
  useModalStore((state) => state.selectedCountries);
export const useFilteredArticles = () =>
  useModalStore((state) => state.filteredArticles);
export const useScrapFilteredArticles = () =>
  useModalStore((state) => state.scrapFilteredArticles);

/** Action */
export const useModalActions = () => useModalStore((state) => state.actions);
