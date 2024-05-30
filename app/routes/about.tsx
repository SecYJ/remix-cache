import { HeadersFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import axios from "axios";

interface User {
	username: string;
	_id: string;
}

export const loader = async () => {
	const data = await axios.get<{
		data: User[];
	}>("https://remix-knowledge-sharing-backend.onrender.com/notes");

	return json(data.data);
};

export const headers: HeadersFunction = () => {
	return {
		"Cache-Control": "public, max-age=20",
	};
};

const AboutPage = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>About</h1>
			{data.data.map((item) => (
				<div key={item._id}>{item.username}</div>
			))}
		</div>
	);
};

export default AboutPage;
