import { FormRow, FormRowSelector } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
const singleJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job edited successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(singleJobQuery(id));
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <h4 className="form-title">edit job</h4>
      <Form method="patch" className="form-center">
        <FormRow type="text" name="position" defaultValue={job.position} />
        <FormRow type="text" name="company" defaultValue={job.company} />
        <FormRow
          type="text"
          name="jobLocation"
          labelText="job location"
          defaultValue={job.jobLocation}
        />
        <FormRowSelector
          name="jobStatus"
          labelText="job status"
          defaultValue={job.jobStatus}
          list={Object.values(JOB_STATUS)}
        />
        <FormRowSelector
          name="jobType"
          labelText="job type"
          defaultValue={job.jobType}
          list={Object.values(JOB_TYPE)}
        />
        <button
          type="submit"
          className="btn btn-block form-btn "
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting" : "submit"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
