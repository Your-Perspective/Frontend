import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const HandleImage = ({
  src,
}: {
  src: string | StaticImport | undefined;
}): string | StaticImport => {
  if (typeof src === "string") {
    return src;
  }

  if (src && typeof src === "object" && "src" in src) {
    return src.src;
  }

  return "https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png";
};
