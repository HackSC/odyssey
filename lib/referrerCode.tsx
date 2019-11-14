import { parseCookies, setCookiesBaseDomain } from "./cookies";
import fetch from "isomorphic-unfetch";

const REF_CODE_KEY = "referrerCode";

// 3 Possible storage locations
// 1. URL 2. Cookie 3. Hacker Profile
// Always try to write as far as possible on page load
// Hacker Profile value is source of truth, once written don't change it

function getReferrerCode(ctx, profile: Profile): string {
  if (profile.referrerCode) return profile.referrerCode;

  const { referrerCode }: CookieValues = parseCookies(ctx);

  return referrerCode ? referrerCode : "";
}

function persistLinkReferrerCode(ctx, paramValues: QueryParamValues) {
  // Store any referral codes as a cookie
  const { referrerCode } = paramValues;

  if (referrerCode) {
    setCookiesBaseDomain(ctx, REF_CODE_KEY, referrerCode, {
      maxAge: 60 * 60 * 24
    });
    // Attempt to write it up to the server
    submitReferrerCode(referrerCode);
  } else {
    // Write a previous value to the sever
    const { referrerCode }: CookieValues = parseCookies(ctx);
    submitReferrerCode(referrerCode);
  }
}

export async function submitReferrerCode(referrerCode: string) {
  const fetch_url = process.env.URL_BASE + "/api/profile/referrerCode";
  await fetch(fetch_url, {
    method: "PUT",
    body: JSON.stringify({ referrerCode }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function generateReferralLink(hackerProfile: Profile) {
  return `https://odyssey.hacksc.com?${REF_CODE_KEY}=${hackerProfile.promoCode}`;
}

function generateFacebookPost(hackerProfile: Profile) {
  const url = generateReferralLink(hackerProfile);
  return {
    url,
    quote: "I'm applying to HackSC! Come Join me!"
  };
}

function generateTwitterPost(hackerProfile: Profile) {
  const url = generateReferralLink(hackerProfile);

  return {
    url,
    title: "HackSC",
    hashtags: ["HackSC", "Hackathons", "USC"]
  };
}

function generateEmailPost(hackerProfile: Profile) {
  const url = generateReferralLink(hackerProfile);

  return {
    url,
    subject: "Apply to HackSC with me!",
    body: "Got you a referral code, apply rn."
  };
}

function generatePosts(hackerProfile: Profile) {
  return {
    twitter: generateTwitterPost(hackerProfile),
    facebook: generateFacebookPost(hackerProfile),
    email: generateEmailPost(hackerProfile)
  };
}

export { getReferrerCode, persistLinkReferrerCode, generatePosts };
