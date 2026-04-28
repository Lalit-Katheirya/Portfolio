import { PersonalDetails } from "../models/PersonalDetails.js";

export const getPersonalDetails = async () => {
  const doc = await PersonalDetails.findOne().lean();
  return doc;
};

