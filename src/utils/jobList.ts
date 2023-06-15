import { create } from "zustand"
import { getAllNotes } from "./dbActions"


interface JobListType {
    jobSearch: string,
    jobStatus: string,
    setJobSearch: (val: string) => void
    setJobStatus: (val: string) => void
}

const useJobList = create<JobListType>()((set) => ({
    jobSearch: "",
    jobStatus: "",
    setJobSearch: (val) => set({ jobSearch: val }),
    setJobStatus: (val) => set({ jobStatus: val })
}))

export default useJobList