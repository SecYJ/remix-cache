import { HeadersFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import axios from "axios";

interface User {
	firstName: string;
	lastName: string;
	_id: string;
}

export const loader = async () => {
	const data = await axios.get<{
		data: User[];
	}>("https://remix-knowledge-sharing-backend.onrender.com/todos");

	return json(data.data);
};

export const headers: HeadersFunction = () => {
	return {
		"Cache-Control": "public, s-maxage=3600",
	};
};

const AboutPage = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>Hello world</h1>
			{data.data.map((item) => (
				<div key={item._id}>
					{item.firstName} {item.lastName}
				</div>
			))}
		</div>
	);
};

export default AboutPage;