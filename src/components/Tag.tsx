import { Chip } from "@nextui-org/react";

const TAG_COLORS: Record<string, string> = {
  ANDROID: "bgYellow",
  IOS: "bgGreen",
  NODE_JS: "bgYellow",
  RAILS: "bgGreen",
  REACT: "bgYellow"
};

const TAG_TEXT_COLORS: Record<string, string> = {
  ANDROID: "textYellow",
  IOS: "textGreen",
  NODE_JS: "textYellow",
  RAILS: "textGreen",
  REACT: "textYellow"
};

const Tag = ({ tag } : {tag: string}) => {
  const backgroundColor = TAG_COLORS[tag] || "black";
  const textColor = TAG_TEXT_COLORS[tag] || "white";

  return (
		<Chip className={`bg-${backgroundColor} text-${textColor} rounded-sm`}>{tag}</Chip>
	)
};

export default Tag;