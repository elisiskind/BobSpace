import "./Caption.css";

interface CaptionProps {
  text: string;
}

export const Caption = ({ text }: CaptionProps) => {
  return <div className="caption">{text}</div>;
};
