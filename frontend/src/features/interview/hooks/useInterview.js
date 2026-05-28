import {getAllInterviewReports,getInterviewReportById,generateInterviewReport,generateResumePdf} from "../services/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context.jsx"

export const useInterview = () => {
  const context = useContext(InterviewContext)
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider")
  }
  const { loading, setLoading, report, setReport, reports, setReports } = context
  const generateReport = async ({
  jobDescription,
  selfDescription,
  resumeFile
}) => {

  setLoading(true)
  let response = null

  try {

    const response = await generateInterviewReport({
      jobDescription,
      selfDescription,
      resumeFile
    })

    setReport(response.interviewReport)

    return response

  } catch (error) {

    console.error("Error generating interview report:", error)

  } finally {

    setLoading(false)
  }
  return response.interviewReport
}
const getReportById = async (interviewId) => {

  setLoading(true)
  let response = null

  try {

    const response = await getInterviewReportById(interviewId)

    console.log(response)

    setReport(response.interviewReport)

  } catch (error) {

    console.error(error)

  } finally {

    setLoading(false)
  }
  return response.interviewReport
}
const GetReports = async () => {

  setLoading(true)
  let response = null

  try {

    const response = await getAllInterviewReports()

    setReports(response.interviewReports)

  } catch (error) {

    console.error("Error fetching interview reports:", error)

  } finally {

    setLoading(false)
  }
  return response.interviewReports
}
   const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  

    return { loading, report, reports, generateReport, getReportById, GetReports,getResumePdf}

 }


