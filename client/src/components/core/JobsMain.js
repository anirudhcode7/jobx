import axios from "axios";
import JobPostMain from "./JobPostMain";
import AddJobModal from "./AddJobModal";
import { useState, useEffect } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
const API_URL = "http://localhost:3004/api/";


export default function JobsMain() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobData, setJobData] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    useEffect(() => {
      // Fetch jobs from the backend when the component mounts
      fetchJobs();
    }, []);
  
    useEffect(() => {
      if (jobData) {
        onOpen();
      }
    }, [jobData, onOpen]);
  
    useEffect(() => {
      if (!isOpen) {
        setJobData(null);
      }
    }, [isOpen]);
  
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL + "/jobs");
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
  
    const handleAddJob = async (newJobData) => {
      try {
        // Send POST request to add the job
        await axios.post(API_URL + "/jobs", newJobData);
  
        // Refetch jobs to update the job list
        fetchJobs();
      } catch (error) {
        console.error("Error adding job:", error);
      }
    };
  
    const handleUpdateJob = async (updatedJobData) => {
      try {
        // Send PUT request to update the job
        await axios.put(`${API_URL}/jobs/${jobData._id}`, updatedJobData);
        // Refetch jobs to update the job list
        fetchJobs();
      } catch (error) {
        console.error("Error updating job:", error);
      }
    };
  
    const handleEdit = async (id) => {
      console.log("Editing job with id:", id);
      // Implement logic to edit the job
      for (const job of jobs) {
        if (job._id.toString() === id) {
          setJobData(job);
          break;
        }
      }
    };
  
    const handleDelete = async (id) => {
      console.log("Deleting job with id:", id);
      try {
        await axios.delete(`${API_URL}/jobs/${id}`);
        // Implement any additional logic here, if needed
        fetchJobs(); // Example: Refresh the job list
      } catch (error) {
        console.error("Error deleting job:", error);
        throw error; // Rethrow the error to handle it elsewhere, if needed
      }
    };
  
    return (
      <>
        {/* Render Add Job button */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-black mb-4">All Jobs</h1>
          <Button
            onPress={onOpen}
            className="ml-auto text-white bg-indigo-800"
            size="lg"
            radius="full"
            variant="bordered"
          >
            Add Job
          </Button>
  
          <AddJobModal
            isOpen={isOpen}
            onClose={onClose}
            onAddJob={handleAddJob}
            initialJobData={jobData}
            onUpdateJob={handleUpdateJob}
          />
  
          {loading ? (
            <p>Loading...</p>
          ) : (
            jobs.map((job, index) => (
              <JobPostMain
                key={index}
                id={job._id.toString()}
                title={job.title}
                jobLink={job.job_link}
                companyLogoUrl={job.company_logo}
                company={job.company_name}
                description={job.description}
                location={job.location}
                employmentType={job.employment_type}
                yearsOfExperience={job.experience_required}
                skills={job.skills_required}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          )}
        </div>
      </>
    );
  }