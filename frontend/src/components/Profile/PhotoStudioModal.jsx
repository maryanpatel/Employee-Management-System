import { useRef, useState } from "react";
import {
  X,
  Check,
  Trash2,
  UploadCloud,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250&auto=format&fit=crop&q=80",
];

export default function PhotoStudioModal({
  currentPic,
  saving,
  onApply,
  onRemove,
  onClose,
}) {
  const [photoTab, setPhotoTab] = useState("presets");
  const [selectedPreset, setSelectedPreset] = useState(currentPic || "");
  const [customPhotoUrl, setCustomPhotoUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    setUploadError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose a valid image file (PNG, JPG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCustomPhotoUrl(reader.result);
      setSelectedPreset("");
    };
    reader.onerror = () => setUploadError("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    const finalPhoto = customPhotoUrl || selectedPreset;
    onApply(finalPhoto);
  };

  const TAB_CLASS = (tab) =>
    `py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition cursor-pointer ${
      photoTab === tab
        ? "border-indigo-600 text-indigo-600"
        : "border-transparent text-slate-400 hover:text-slate-700"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Profile Picture Studio</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a preset avatar or upload your own photo
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/60 px-6">
          <button onClick={() => setPhotoTab("presets")} className={TAB_CLASS("presets")}>
            Preset Avatars
          </button>
          <button onClick={() => setPhotoTab("upload")} className={TAB_CLASS("upload")}>
            Upload Photo
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle size={15} />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Presets grid */}
          {photoTab === "presets" && (
            <div>
              <p className="text-xs text-slate-500 mb-4">
                Choose from one of our handcrafted professional avatars:
              </p>
              <div className="grid grid-cols-4 gap-4">
                {PRESET_AVATARS.map((url, idx) => {
                  const isSelected = selectedPreset === url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(url);
                        setCustomPhotoUrl("");
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                        isSelected
                          ? "border-indigo-600 ring-4 ring-indigo-100 scale-105"
                          : "border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`Preset avatar ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                            <Check size={14} />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upload area */}
          {photoTab === "upload" && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {customPhotoUrl ? (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/30">
                  <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-2 border-white ring-4 ring-indigo-200">
                    <img
                      src={customPhotoUrl}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-3">Selected Photo Preview</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 transition cursor-pointer"
                  >
                    Choose Different File
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl bg-slate-50 hover:bg-indigo-50/20 transition cursor-pointer text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 transition mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    Click to upload an image from your device
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WebP up to 5MB</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {currentPic ? (
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition cursor-pointer"
            >
              <Trash2 size={15} />
              <span>Remove Picture</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving || (!selectedPreset && !customPhotoUrl)}
              onClick={handleApply}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Check size={14} />
                  Apply Picture
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
