export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<{ url: string; blob: Blob }> => {
  const image: HTMLImageElement = await new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });

  if (typeof image.decode === "function") await image.decode();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Determine the original format or use a sensible default
  const getMimeType = (src: string): string => {
    if (src.toLowerCase().endsWith(".png")) return "image/png";
    if (
      src.toLowerCase().endsWith(".jpg") ||
      src.toLowerCase().endsWith(".jpeg")
    )
      return "image/jpeg";
    if (src.toLowerCase().endsWith(".webp")) return "image/webp";
    return "image/jpeg"; // default to jpeg
  };

  const result = new Promise<{ url: string; blob: Blob }>((resolve, reject) => {
    const mime = getMimeType(imageSrc);
    const quality = mime === "image/png" ? undefined : 0.4;
    canvas.toBlob(
      (blob) => {
        if (!blob)
          return reject(new Error("Failed to create Blob from canvas"));
        const url = URL.createObjectURL(blob);
        resolve({ url, blob });
      },
      mime,
      quality
    );
  });

  return result;
};
