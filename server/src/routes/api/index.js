import express from "express";
import users from "./users";
import hackerProfile from "./hackerProfile";

const router = express.Router();

router.use("/users", users);
router.use("/hackerProfiles", hackerProfile);

export default router;
