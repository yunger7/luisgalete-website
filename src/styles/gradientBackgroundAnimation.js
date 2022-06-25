import { keyframes } from "@mantine/core";

export const gradientBackgroundAnimation = keyframes({
	"0%": {
		backgroundPosition: "0% 50%",
	},

	"50%": {
		backgroundPosition: "100% 50%",
	},
	"100%": {
		backgroundPosition: "0% 50%",
	},
});
