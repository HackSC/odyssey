import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import { getUser, handleLoginRedirect } from "../lib/authenticate";
import createAuth0Client from "@auth0/auth0-spa-js";
import FormStepper from "../components/FormStepper";
import HomeStep from "../components/applicationSteps/HomeStep";
import ApplicationStep from "../components/applicationSteps/ApplicationStep";
import ProfileStep from "../components/applicationSteps/ProfileStep";
import ResultStep from "../components/applicationSteps/ResultStep";

// Load AuthForm as an AMP page
export const config = { amp: "hybrid" };

const formSteps: FormStep[] = [
	{
		title: "Home",
		component: HomeStep
	},
	{
		title: "Application",
		component: ApplicationStep
	},
	{
		title: "Profile",
		component: ProfileStep
	},
	{
		title: "Results",
		component: ResultStep
	}
];

const Dashboard = initialObject => {
	const { user } = initialObject;

	return (
		<Layout>
			<div>
				<div>Email: {user._json.email} </div>
				<div>Username: {user.nickname} </div>
				<div> Email Verified: {user._json.email_verified + ""} </div>
				<div>
					{" "}
					<a href={user.picture}> Picture </a>{" "}
				</div>
				<FormStepper serverStep={1} steps={formSteps}></FormStepper>
			</div>
		</Layout>
	);
};

Dashboard.getInitialProps = async ({ req }) => {
	const user = await getUser(req);
	if (!user) {
		// The user isn't signed in
		handleLoginRedirect(req);
	}
	return {
		user: user
	};
};

export default Dashboard;
