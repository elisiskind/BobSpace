import "./Image.css";

interface ImageProps {
  src: string;
}

export const Image = ({ src }: ImageProps) => {
  return <img className="image" alt={"Bob"} src={"images/" + src} />;
};
