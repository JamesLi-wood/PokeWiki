"use client";
import { useParams } from "next/navigation";

const Page = () => {
  const slug = useParams().dexNumber;
  if (typeof slug !== "string") return <div>ERROR</div>;

  return <div></div>;
};

export default Page;
