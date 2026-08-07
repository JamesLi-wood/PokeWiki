import { Badge } from "@mantine/core";

const LoadPkmnType = ({
  type,
  isMobile,
}: {
  type: string;
  isMobile: boolean;
}) => {
  return (
    <Badge
      style={{ backgroundColor: `var(--${type})` }}
      size={`${isMobile ? "xs" : "md"}`}
    >
      {type}
    </Badge>
  );
};

export default LoadPkmnType;
