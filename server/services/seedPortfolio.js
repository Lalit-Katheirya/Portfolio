import { Portfolio } from "../models/Portfolio.js";
import { portfolioSeed } from "../data/seedPortfolio.js";

const toPeriod = (period) =>
  typeof period === "string" ? { display: period } : period;

export const normalizeSeed = (seed) => {
  const data = structuredClone(seed);

  if (typeof data.personal?.location === "string") {
    const parts = data.personal.location.split(",").map((part) => part.trim());
    data.personal.location = {
      city: parts[0] || "",
      state: parts[1] || "",
      pincode: parts[2] || "",
    };
  }

  data.experience = (data.experience ?? []).map((item) => ({
    ...item,
    period: toPeriod(item.period),
  }));

  data.projects = (data.projects ?? []).map((item) => ({
    ...item,
    period: toPeriod(item.period),
  }));

  data.education = (data.education ?? []).map((item) => ({
    ...item,
    period: toPeriod(item.period),
    cgpa: item.cgpa != null ? Number(item.cgpa) : undefined,
  }));

  return data;
};

export const fallbackPortfolio = normalizeSeed(portfolioSeed);

export const seedPortfolioIfEmpty = async () => {
  const count = await Portfolio.countDocuments();
  if (count > 0) return;

  await Portfolio.create(normalizeSeed(portfolioSeed));
  // eslint-disable-next-line no-console
  console.log("Portfolio database seeded.");
};
