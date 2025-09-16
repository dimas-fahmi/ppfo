import Cropper, { Area } from "react-easy-crop";
import { Button } from "../../shadcn/components/ui/button";

import React, { useState } from "react";
import {
  LoaderCircle,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from "lucide-react";

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
  dynamicAspectRatio?: boolean;
  roundCropAreaPixels?: boolean;
  loading?: boolean;
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
  dynamicAspectRatio = false,
  roundCropAreaPixels = false,
  loading = false,
}: ImageCropperProps) => {
  const [aspectRatio, setAspectRatio] = useState(aspect ?? 1);

  return (
    croppingImage && (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-40">
        <div className="glass">
          <header className="p-4 w-[320px] text-center">
            <h1 className="font-header text-2xl rounded-md">CROP IMAGE</h1>
            <p className="text-xs font-light block mx-auto max-w-48 truncate">
              {file?.name}
            </p>
          </header>

          {/* Cropper */}
          <div>
            <div className="relative w-[320px] h-[320px] overflow-hidden  border-4 border-primary">
              <Cropper
                image={croppingImage}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
                roundCropAreaPixels={roundCropAreaPixels}
              />
            </div>
          </div>

          {/* Aspect Ratio */}
          {dynamicAspectRatio && (
            <div className="grid grid-cols-3">
              <button
                className={`${
                  aspectRatio === 16 / 9
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                } flex flex-col text-xs font-light cursor-pointer transition-all duration-300 px-4 py-2 items-center justify-center`}
                onClick={() => setAspectRatio(16 / 9)}
              >
                <RectangleHorizontal className="w-4 h-4" />
                16:9
              </button>
              <button
                className={`${
                  aspectRatio === 9 / 16
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                } flex flex-col text-xs font-light cursor-pointer transition-all duration-300 px-4 py-2 items-center justify-center`}
                onClick={() => setAspectRatio(9 / 16)}
              >
                <RectangleVertical className="w-4 h-4" />
                9:16
              </button>
              <button
                className={`${
                  aspectRatio === 1 / 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                } flex flex-col text-xs font-light cursor-pointer transition-all duration-300 px-4 py-2 items-center justify-center`}
                onClick={() => setAspectRatio(1 / 1)}
              >
                <Square className="w-4 h-4" />
                4:3
              </button>
            </div>
          )}

          <div className="p-4 rounded-md w-[320px] grid grid-cols-2 gap-4 z-50">
            <Button
              variant="outline"
              onClick={handleReset}
              size="sm"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Saving
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageCropper;
