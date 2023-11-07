export interface ILegacy {
  xlarge: string;
  xlargewidth: number;
  xlargeheight: number;
}

export interface IMultimedia {
  rank: number;
  subtype: string;
  caption: null;
  credit: null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: ILegacy;
  subType: string;
  crop_name: string;
}

export interface IHeadline {
  main: string;
  kicker: null;
  content_kicker: null;
  print_headline: null;
  name: null;
  seo: null;
  sub: null;
}

export interface IKeywords {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface IPerson {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: null;
  title: null;
  role: string;
  organization: string;
  rank: number;
}

export interface IByline {
  original: string;
  person: IPerson;
  organization: null;
}

export interface IArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: IMultimedia[];
  headline: IHeadline;
  keywords: IKeywords[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name: string;
  byline: IByline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface IArticleData
  extends Pick<IArticle, "web_url" | "pub_date" | "abstract" | "source"> {
  headline: string;
  reporter: string;
  isScrapped: boolean;
}

export interface IResponse {
  docs: IArticle[];
  meta: {
    hits: number;
    offset: number;
    time: number;
  };
}

export interface IArticleResponse {
  copyright: string;
  response: IResponse;
  status: string;
}
