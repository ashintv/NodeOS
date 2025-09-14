import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BASE_URL } from "@/config";
import axios from "axios";

export function CredentialSelector({
	platform,
	onChange,
}: {
	platform: string;
	value: string;
	onChange: (value: string) => void;
}) {
	const [selectedCredential, setSelectedCredential] = useState<string>("");
	const [credentialOptions, setCredentialOptions] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const fetchOptions = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${BASE_URL}/credential/${platform}`, {
				headers: {
					token: localStorage.getItem("token"),
				},
			});
			setCredentialOptions(res.data.credentials);
			console.log(res.data.credentials);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
        fetchOptions();
	}, []);

    const handleChange = (value: string) => {
        setSelectedCredential(value);
        onChange(value);
    }



	return (
		<div className="space-y-2 w-full">
			<Select
				value={selectedCredential}
				onValueChange={handleChange}
				onOpenChange={(open) => {
					if (open) fetchOptions();
				}}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={<span>Select a credential</span>} />
				</SelectTrigger>

				<SelectContent>
					{loading ? (
						<div className="p-2 text-sm text-gray-500">Loading...</div>
					) : credentialOptions.length > 0 ? (
						credentialOptions.map((credential) => (
							<SelectItem key={credential._id} value={credential._id}>
								{credential.title}
							</SelectItem>
						))
					) : (
						<div className="p-2 text-sm text-gray-500">No credentials found</div>
					)}
				</SelectContent>
			</Select>
		</div>
	);
}
