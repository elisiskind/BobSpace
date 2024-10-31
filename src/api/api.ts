import { Server } from "./server";

export interface ImageInfo {
  url: string;
  uploaded: Date;
}

/**
 * This is the interface we can use to talk to our fake server, implemented in Server.ts.
 */
export interface Api {
  /**
   * Retrieves the url of the latest image Bob has uploaded.
   *
   * @return a promise that will resolve with the url of the image.
   */
  retrieveImage: () => Promise<ImageInfo>;

  /**
   * Retrieve a list of urls of Bob's favorite images.
   */
  retrieveBobsFavorites: () => Promise<string[]>;

  /**
   * Listen to updates of the latest images as Bob uploads them, by passing in a function that will be called with the
   * url of the new image as it is uploaded. In practice, this will be every 5 seconds.
   *
   * @param onUpdate A function to call every time a new image is available.
   */
  subscribeToImageUpdates: (onUpdate: (image: ImageInfo) => void) => void;

  /**
   * Tell the server to stop calling the passed onUpdate function every time a new image is available.
   *
   * @param onUpdate The function that should no longer be called.
   */
  unsubscribeFromImageUpdates: (onUpdate: (image: ImageInfo) => void) => void;

  /**
   * Asynchronously sends a string to the server.
   *
   * @param message The string to send.
   * @return a promise that resolves when the string has been received by the server.
   */
  sendMessageToBob: (message: string) => Promise<void>;
}

export const server = new Server();