import type { IResultData } from "@/types/global";
import type { SearchSuggest } from "@/types/home";
import ztRequest from "..";

export const getSearchSuggest = () => ztRequest.get<IResultData<SearchSuggest>>({
  url: '/searchSuggest/get'
})
