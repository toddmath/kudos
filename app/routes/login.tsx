import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";

import {
	validateEmail,
	validateName,
	validatePassword,
} from "~/utils/validators.server";
import { login, register, getUser } from "~/utils/auth.server";
import { Layout } from "~/components/layout";
import { FormField } from "~/components/form-field";

export const loader: LoaderFunction = async ({ request }) => {
	const user = await getUser(request);
	return user ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const action = form.get("_action");
	const email = form.get("email");
	const password = form.get("password");
	let firstName = form.get("firstName");
	let lastName = form.get("lastName");

	if (
		typeof action !== "string" ||
		typeof email !== "string" ||
		typeof password !== "string"
	) {
		return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
	}

	if (
		action === "register" &&
		(typeof firstName !== "string" || typeof lastName !== "string")
	) {
		return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
	}

	const errors = {
		email: validateEmail(email),
		password: validatePassword(password),
		...(action === "register"
			? {
					firstName: validateName((firstName as string) || ""),
					lastName: validateName((lastName as string) || ""),
			  }
			: {}),
	};

	if (Object.values(errors).some(Boolean)) {
		return json(
			{
				errors,
				fields: { email, password, firstName, lastName },
				form: action,
			},
			{ status: 400 }
		);
	}

	if (action === "login") {
		return await login({ email, password });
	}
	if (action === "register") {
		firstName = firstName as string;
		lastName = lastName as string;
		return await register({ email, password, firstName, lastName });
	}

	return json({ error: `Invalid Form Data` }, { status: 400 });
};

const initialState = {
	email: "",
	password: "",
	firstName: "",
	lastName: "",
};

export default function Login() {
	const actionData = useActionData();
	const firstLoad = useRef(true);
	const [action, setAction] = useState("login");
	const [errors, setErrors] = useState(actionData?.errors || {});
	const [formError, setFormError] = useState(actionData?.error || "");
	const [formData, setFormData] = useState({
		email: actionData?.fields?.email || "",
		password: actionData?.fields?.password || "",
		firstName: actionData?.fields?.lastName || "",
		lastName: actionData?.fields?.firstName || "",
	});

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		setFormData((form) => ({ ...form, [field]: event.target.value }));
	};

	useEffect(() => {
		if (!firstLoad.current) {
			setErrors(initialState);
			setFormError("");
			setFormData(initialState);
		}
	}, [action]);

	useEffect(() => {
		if (!firstLoad.current) setFormError("");
	}, [formData]);

	useEffect(() => {
		firstLoad.current = false;
	}, []);

	return (
		<Layout>
			<div className="h-full justify-center items-center flex flex-col gap-y-4">
				<button
					onClick={() => setAction(action == "login" ? "register" : "login")}
					className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
				>
					{action === "login" ? "Sign Up" : "Sign In"}
				</button>
				<h2 className="text-5xl font-extrabold text-yellow-300">
					Welcome to Kudos!
				</h2>
				<p className="font-semibold text-slate-300">
					{action === "login"
						? "Log In To Give Some Praise!"
						: "Sign Up To Get Started!"}
				</p>

				<form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
					<div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
						{formError}
					</div>
					<FormField
						htmlFor="email"
						label="Email"
						value={formData.email}
						error={errors?.email}
						onChange={(e) => handleInputChange(e, "email")}
					/>
					<FormField
						type="password"
						htmlFor="password"
						label="Password"
						value={formData.password}
						error={errors?.password}
						onChange={(e) => handleInputChange(e, "password")}
					/>
					{action === "register" ? (
						<>
							<FormField
								htmlFor="firstName"
								label="First Name"
								value={formData.firstName}
								error={errors?.firstName}
								onChange={(e) => handleInputChange(e, "firstName")}
							/>
							<FormField
								htmlFor="lastName"
								label="Last Name"
								value={formData.lastName}
								error={errors?.lastName}
								onChange={(e) => handleInputChange(e, "lastName")}
							/>
						</>
					) : null}
					<div className="w-full text-center">
						<button
							type="submit"
							name="_action"
							value={action}
							className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
						>
							{action === "login" ? "Sign In" : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</Layout>
	);
}
