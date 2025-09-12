import Cropper, { Area } from "react-easy-crop";
import { Button } from "../../shadcn/components/ui/button";

import React from "react";

export interface ImageCropperProps {
  croppingImage: string | null;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: React.Dispatch<React.SetStateAction<ImageCropperProps["crop"]>>;
  setZoom: React.Dispatch<React.SetStateAction<ImageCropperProps["zoom"]>>;
  setCroppedAreaPixels: React.Dispatch<React.SetStateAction<Area | null>>;
  handleSave: () => void;
  aspect?: number;
  file: File | null;
  handleReset: () => void;
}

const ImageCropper = ({
  crop,
  croppingImage,
  setCrop,
  setCroppedAreaPixels,
  setZoom,
  zoom,
  handleSave,
  aspect,
  file,
  handleReset,
}: ImageCropperProps) => {
  return (
    croppingImage && (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-40">
        <div className="glass">
          <header className="p-4 w-[320px] text-center">
            <h1 className="font-header text-2xl rounded-md">CROP IMAGE</h1>
            <p className="text-xs font-light">{file?.name}</p>
          </header>

          {/* Cropper */}
          <div>
            <div className="relative w-[320px] h-[320px] overflow-hidden  border-4 border-primary">
              <Cropper
                image={croppingImage}
                crop={crop}
                zoom={zoom}
                aspect={aspect ?? 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
              />
            </div>
          </div>

          <div className="p-4 rounded-md w-[320px] grid grid-cols-2 gap-4 mt-4 z-50">
            <Button variant="outline" onClick={handleReset} size="sm">
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              Save
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageCropper;
