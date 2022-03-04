import { Logger } from "logging";
import { favoriteUrls, getImage } from "api/images";
import { Api, ImageInfo } from "api/api";

interface ServerOptions {
  slowMode?: boolean;
  scheduleUploads?: boolean;
}

export class Server implements Api {
  private readonly _logger;
  private readonly _started;
  private readonly _slowMode;
  private readonly _subscribers: ((image: ImageInfo) => void)[];

  constructor(options?: ServerOptions) {
    this._logger = new Logger("blue", "server");
    this._started = new Date();
    this._subscribers = [];
    this._slowMode = !!options?.slowMode
    if (options?.scheduleUploads) {
      this._scheduleUploads();
    }
  }

  private _scheduleUploads = () => {
    // Bob uploads a picture every 5 seconds
    setInterval(() => {
      const image = this._returnImage();
      this._subscribers.forEach((subscriber) => subscriber(image));
    }, 5000);
  };

  retrieveImage = async (): Promise<ImageInfo> => {
    const image = {
      url: getImage(),
      uploaded: this._started,
    };
    this._logger.info(
      "Received request for image! Returning: " + JSON.stringify(image, null, 2)
    );
    return await this._onServer(() => {
      return image;
    });
  };

  retrieveBobsFavorites = async (): Promise<string[]> => {
    this._logger.info(
      "Received request for favorites! Returning " +
        favoriteUrls.length +
        " urls"
    );
    return await this._onServer(() => {
      return favoriteUrls;
    });
  };

  subscribeToImageUpdates = (onUpdate: (image: ImageInfo) => void): void => {
    this._subscribers.push(onUpdate);
  };

  unsubscribeFromImageUpdates(onUpdate: (image: ImageInfo) => void): void {
    this._subscribers.splice(
      this._subscribers.findIndex((func) => func === onUpdate)
    );
  }

  sendMessageToBob = async (message: string): Promise<void> => {
    await this._onServer(() => {
      this._logger.info("Received message for Bob: " + message);
    });
  };

  private _returnImage = () => {
    const image = {
      url: getImage(),
      uploaded: new Date(),
    };
    this._logger.info(
      "New image! Returning: " + JSON.stringify(image, null, 2)
    );
    return image;
  };

  private _onServer<T>(func: () => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(func());
        } catch (e) {
          reject(e);
        }
      }, this._slowMode ? Math.random() * 1000 + 500 : 100);
    });
  }
}