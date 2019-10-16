import express from "express";
import users from "./users";
import hackerProfile from "./hackerProfile";
import testRoutes from "./testRoutes";

const router = express.Router();

router.use("/users", users);
router.use("/hackerProfiles", hackerProfile);
router.use("/", testRoutes);

export default router;
