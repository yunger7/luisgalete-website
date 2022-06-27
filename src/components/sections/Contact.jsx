import { useState } from "react";

import {
	Box,
	Container,
	Stack,
	Group,
	Title,
	Text,
	TextInput,
	Textarea,
	Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { User as NameIcon, At as EmailIcon } from "tabler-icons-react";

import { useCommandMenu } from "@/hooks";
import { contactSchema } from "@/utils";

export function Contact() {
	const { contactRef } = useCommandMenu();
	const [loading, setLoading] = useState(false);

	const form = useForm({
		schema: zodResolver(contactSchema),
		initialValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	async function sendMessage(data) {
		setLoading(true);

		try {
			const response = await fetch(`/api/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.status != 200) throw new Error("Request failed");

			showNotification({
				title: "Mensagem enviada!",
				message: "Sua mensagem foi encaminhada com sucesso",
				color: "green",
				closeButtonProps: "Fechar notificação",
			});

			form.reset();
		} catch (error) {
			showNotification({
				title: "Wops! Parece que alguma coisa deu errado :(",
				message:
					"Houve um problema ao enviar sua mensagem, tente novamente mais tarde",
				color: "red",
				closeButtonProps: "Fechar notificação",
			});
		}

		setLoading(false);
	}

	return (
		<Box
			ref={contactRef}
			sx={{
				position: "relative",
				width: "100%",
				height: "100%",
				minHeight: "60vh",
			}}
		>
			<Container size="sm" py="10vh" sx={{ width: "100%", height: "100%" }}>
				<Title order={2} align="center">
					Que tal construir algo?{" "}
					<Text
						inherit
						component="span"
						variant="gradient"
						gradient={{ from: "blue", to: "cyan" }}
					>
						Juntos
					</Text>
					.
				</Title>
				<Box my="xl">
					<form onSubmit={form.onSubmit(sendMessage)}>
						<Stack>
							<TextInput
								required
								type="text"
								label="Nome"
								placeholder="Seu nome"
								icon={<NameIcon size={14} />}
								disabled={loading}
								{...form.getInputProps("name")}
							/>

							<TextInput
								required
								type="email"
								label="Email"
								placeholder="nome@email.com"
								icon={<EmailIcon size={14} />}
								disabled={loading}
								{...form.getInputProps("email")}
							/>

							<Textarea
								autosize
								required
								label="Mensagem"
								placeholder="Sua mensagem..."
								minRows={4}
								disabled={loading}
								{...form.getInputProps("message")}
							/>

							<Group grow position="center" mt="lg">
								<Button type="submit" loading={loading} sx={{ maxWidth: 200 }}>
									Enviar
								</Button>
							</Group>
						</Stack>
					</form>
				</Box>
			</Container>
		</Box>
	);
}
