import { getPersonalDetails } from "../services/personalDetailsService.js";

export const getPersonalDetailsController = async (_req, res) => {
  const data = await getPersonalDetails();
  if (!data) {
    res.status(404);
    return res.json({
      success: false,
      message: "Personal details not found.",
    });
  }
  return res.json({ success: true, data });
};

