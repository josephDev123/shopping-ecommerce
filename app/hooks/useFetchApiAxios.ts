"use client";

import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { ServerReturnDataTypes } from "../types/serverDataReturnType";

type statusType = "idle" | "loading" | "data" | "error";

export function useFetchFilterAndPaginateApi(
  url: string,
  //   params: string | string[],
  paramKey: string,
  paramValue: string,
  limit?: string,
  filter?: {}
) {
  const [status, setStatus] = useState<statusType>("idle");
  const [data, setData] = useState<any[] | any>([]);
  const [additionalData, setAdditionalData] = useState<{ totalDoc: number }>({
    totalDoc: 0,
  });

  useCallback(() => {
    fetchApi();
  }, [paramKey, paramValue, limit]);

  const fetchApi = async () => {
    setStatus("loading");
    try {
      const result = await axiosInstance({
        method: "GET",
        url: `${url}?${paramKey}=${paramValue}`,
        params: {
          filter: filter,
          limit: limit,
        },
      });
      setStatus("data");
      const resultDocument = result.data.data;
      setData(resultDocument);
      setAdditionalData(result.data.additionalData);
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchApi();
  }, [paramKey, paramValue, limit]);

  return { status, data, additionalData };
}
