import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return null;
};
const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

const Stats = () => {
  const { isLoading, isError, data } = useQuery(statsQuery);

  const { defaultStats, monthlyApplication } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplication?.length > 1 && (
        <ChartsContainer data={monthlyApplication} />
      )}
    </>
  );
};

export default Stats;
