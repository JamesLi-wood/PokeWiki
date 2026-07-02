import { Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const ErrorPage = ({ title }: { title: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={`${isMobile ? "text-md" : "text-xl"} flex flex-col gap-4 justify-center items-center h-full`}
    >
      <div>Uh oh! An error has occured.</div>
      <Image
        src="/sleeping-pikachu.png"
        alt="sleeping pikachu"
        w={isMobile ? "15rem" : "20rem"}
        h="auto"
        fit="contain"
      />
      <div>{title}</div>
    </div>
  );
};

export default ErrorPage;
