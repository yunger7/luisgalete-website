import { Center, createStyles, useMantineColorScheme } from "@mantine/core";
import { ParallaxBanner } from "react-scroll-parallax";

const useStyles = createStyles({
	fullSize: {
		width: "100%",
		height: "100%",
	},

	content: {
		position: "absolute",
		top: 0,
		left: 0,
	},
});

export function WaveBackground({ children }) {
	const { colorScheme } = useMantineColorScheme();
	const { classes, cx } = useStyles();

	return (
		<ParallaxBanner
			className={classes.fullSize}
			layers={[
				{
					image: colorScheme === "light" ? "/wave-light.svg" : "/wave-dark.svg",
					speed: -50,
				},
				{
					children: (
						<Center className={cx(classes.content, classes.fullSize)}>
							{children}
						</Center>
					),
					speed: -15,
				},
			]}
		/>
	);
}
