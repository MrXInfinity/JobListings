import Card from "@/components/card";

const jobList = [
  {
    jobTitle: "Web Developer",
    dateOfApplication: "May 5",
    description: "This company is beri good.",
    companyName: "Company 1",
    companyAddress: "Muntinlupa city",
    link: "",
    status: "applicationSent",
  },
  {
    jobTitle: "Junior Web Developer",
    dateOfApplication: "May 3",
    description: "This company is beri good.",
    companyName: "Company 2",
    status: "interviewPending",
  },
  {
    jobTitle: "Web Developer",
    dateOfApplication: "May 5",
    companyName: "Company 1",
    link: "",
    status: "applicationSent",
  },
];

export default function JobList() {
  return (
    <div className="flex">
      <h1>List of All your Jobs Listings</h1>
      <div className="grid grid-cols-1">
        {jobList.map(
          (
            {
              jobTitle,
              dateOfApplication,
              status,
              companyName,
              companyAddress,
              description,
              link,
            },
            index
          ) => (
            <></>
          )
        )}
      </div>
    </div>
  );
}
