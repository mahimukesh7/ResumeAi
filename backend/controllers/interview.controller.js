const pdfParse = require("pdf-parse")

const {
  generateInterviewReport,
  generateResumePdf} = require("../src/services/ai.services")

const interviewReportModel =
  require("../models/interviewReport.model")



function sanitizeQuestions(arr) {

  if (!Array.isArray(arr)) return []

  return arr.map((item) => {

    if (typeof item === "string") {

      return {
        question: item,
        intention: "Not provided by AI",
        answer: "Not provided by AI"
      }
    }

    return {
      question:
        item.question || "No question provided",

      intention:
        item.intention || "Not provided by AI",

      answer:
        item.answer || "Not provided by AI"
    }
  })
}



function sanitizeSkillGaps(arr) {

  if (!Array.isArray(arr)) return []

  return arr.map((item) => {

    if (typeof item === "string") {

      return {
        skill: item,
        severity: "medium"
      }
    }

    return {
      skill:
        item.skill || "Unknown skill",

      severity:
        item.severity || "medium"
    }
  })
}



function sanitizePreparation(arr) {

  if (!Array.isArray(arr)) return []

  return arr.map((item, index) => {

    if (typeof item === "string") {

      return {
        day: index + 1,
        focus: item,
        tasks: []
      }
    }

    return {
      day:
        item.day || index + 1,

      focus:
        item.focus || "General Preparation",

      tasks:
        Array.isArray(item.tasks)
          ? item.tasks
          : []
    }
  })
}



async function generateInterViewReportController(
  req,
  res
) {

  try {

    let resumeText = ""

    if (req.file) {

      const pdfData =
        await pdfParse(req.file.buffer)

      resumeText = pdfData.text
    }

    const {
      selfDescription,
      jobDescription
    } = req.body



    const interViewReportByAi =
      await generateInterviewReport({

        resume: resumeText,

        selfDescription,

        jobDescription
      })



    interViewReportByAi.technicalQuestions =
      sanitizeQuestions(
        interViewReportByAi.technicalQuestions
      )



    interViewReportByAi.behavioralQuestions =
      sanitizeQuestions(
        interViewReportByAi.behavioralQuestions
      )



    interViewReportByAi.skillGaps =
      sanitizeSkillGaps(
        interViewReportByAi.skillGaps
      )



    interViewReportByAi.preparationPlan =
      sanitizePreparation(
        interViewReportByAi.preparationPlan
      )



    console.log(
      JSON.stringify(
        interViewReportByAi,
        null,
        2
      )
    )



    const interviewReport =
      await interviewReportModel.create({

        user: req.user.id,

        resume: resumeText,

        selfDescription,

        jobDescription,

        ...interViewReportByAi
      })



    res.status(201).json({

      message:
        "Interview report generated successfully.",

      interviewReport
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message
    })
  }
}



async function getInterviewReportByIdController(
  req,
  res
) {

  try {

    const { interviewId } = req.params

    const interviewReport =
      await interviewReportModel.findOne({

        _id: interviewId,

        user: req.user.id
      })

    if (!interviewReport) {

      return res.status(404).json({

        message:
          "Interview report not found."
      })
    }

    res.status(200).json({

      message:
        "Interview report fetched successfully.",

      interviewReport
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message
    })
  }
}



async function getAllInterviewReportsController(
  req,
  res
) {

  try {

    const interviewReports =
      await interviewReportModel.find({

        user: req.user.id

      })
      .sort({ createdAt: -1 })

      .select(
        "-resume -selfDescription -jobDescription -__v"
      )



    res.status(200).json({

      message:
        "Interview reports fetched successfully.",

      interviewReports
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message
    })
  }
}
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
}