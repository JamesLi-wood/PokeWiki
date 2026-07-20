import { Badge } from "@mantine/core";

type pkmnType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

const LoadPkmnType = ({
  types,
  isMobile,
}: {
  types: pkmnType[];
  isMobile: boolean;
}) => {
  return (
    <div className="flex gap-2">
      {types.map((data) => (
        <Badge
          key={data.slot}
          style={{ backgroundColor: `var(--${data.type.name})` }}
          size={`${isMobile ? "xs" : "md"}`}
        >
          {data.type.name}
        </Badge>
      ))}
    </div>
  );
};

export default LoadPkmnType;
