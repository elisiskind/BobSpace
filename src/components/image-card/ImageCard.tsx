import "./ImageCard.css";
import { ImageInfo } from "api/api";
import { Image } from "components/image";
import { Caption } from "components/caption";

interface ImageProps {
  imageInfo: ImageInfo | string;
  favorite?: boolean;
}

export const ImageCard = ({ imageInfo, favorite }: ImageProps) => {
  return (
    <div className={`image-card${favorite ? " image-card--favorite" : ""}`}>
      {typeof imageInfo === "string" ? (
        <Image src={imageInfo} />
      ) : (
        <>
          <Image src={imageInfo.url} />
          <div className="image-card__actions">
            <Caption
              text={
                "Image uploaded by Bob at " +
                imageInfo.uploaded.toLocaleTimeString()
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
