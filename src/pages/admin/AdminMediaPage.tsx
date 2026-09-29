import React, { useEffect, useState, useRef } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  Eye,
  Loader2,
  Sparkles,
  AlertCircle,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import {
  listMediaFiles,
  uploadMediaFile,
  deleteMediaFile,
  isSupabaseConfigured,
} from '../../lib/supabase';
import { MediaFile } from '../../types';
import { SafeImage } from '../../components/SafeImage';

export const AdminMediaPage: React.FC = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [fileToDelete, setFileToDelete] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isConfigured = isSupabaseConfigured();

  const fetchFiles = async () => {
    setLoading(true);
    const media = await listMediaFiles();
    setFiles(media);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setErrorMessage(null);

    let uploadedCount = 0;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const { url, error } = await uploadMediaFile(file);
      if (error) {
        setErrorMessage(`Upload error for ${file.name}: ${error}`);
      } else {
        uploadedCount++;
      }
    }

    setUploading(false);
    if (uploadedCount > 0) {
      showToast(`${uploadedCount} image(s) uploaded to Supabase Storage!`);
      fetchFiles();
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Copied image URL to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const confirmDelete = async () => {
    if (!fileToDelete) return;
    setDeleting(true);
    const { success, error } = await deleteMediaFile(fileToDelete.id, fileToDelete.storagePath);
    setDeleting(false);

    if (success) {
      setFiles((prev) => prev.filter((f) => f.id !== fileToDelete.id));
      showToast('Media image deleted.');
      setFileToDelete(null);
    } else {
      setErrorMessage(`Delete error: ${error}`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout
      title="Media Library"
      subtitle="Upload and manage article photos hosted on Supabase Storage"
      action={
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition shadow-sm disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload Images</span>
              </>
            )}
          </button>
        </div>
      }
    >
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-orange-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Media Operation Alert</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-stone-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-stone-800 hover:border-orange-500/80 bg-stone-900/50 hover:bg-stone-900 rounded-3xl p-8 sm:p-10 text-center transition cursor-pointer group"
      >
        <div className="w-14 h-14 rounded-2xl bg-stone-800 group-hover:bg-orange-600/20 text-stone-400 group-hover:text-orange-400 flex items-center justify-center mx-auto transition">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="font-serif font-bold text-white text-base mt-3">
          Click or Drag Images Here to Upload
        </h3>
        <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
          Supports WebP, JPEG, PNG, and GIF. Images are automatically saved to your Supabase Storage bucket <code>media</code>.
        </p>
      </div>

      {/* Media Grid */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-base text-white">
            Uploaded Assets ({files.length})
          </h2>
          <button
            type="button"
            onClick={fetchFiles}
            className="text-xs text-stone-400 hover:text-white transition"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-16 text-center text-xs text-stone-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
            <span>Loading media library...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="p-16 text-center bg-stone-900 border border-stone-800 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-500 mx-auto">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-white text-base">Media Library Empty</h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Upload images here to use them across your articles and guides.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden group flex flex-col hover:border-stone-700 transition shadow-md"
              >
                {/* Thumbnail */}
                <div
                  className="relative aspect-square overflow-hidden bg-stone-950 cursor-pointer"
                  onClick={() => setPreviewFile(file)}
                >
                  <SafeImage
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    fallbackSrc="/images/pet-fallback.webp"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewFile(file);
                      }}
                      className="p-1.5 rounded-lg bg-stone-900/90 text-white hover:bg-stone-800 transition"
                      title="View Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(file.url, file.id);
                      }}
                      className="p-1.5 rounded-lg bg-stone-900/90 text-white hover:bg-stone-800 transition"
                      title="Copy Public URL"
                    >
                      {copiedId === file.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Info & Actions */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-1">
                  <p className="text-xs font-semibold text-white truncate" title={file.name}>
                    {file.name}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                    <span>{formatFileSize(file.size)}</span>
                    <button
                      type="button"
                      onClick={() => setFileToDelete(file)}
                      className="text-stone-500 hover:text-rose-400 transition"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-white text-base truncate">
                {previewFile.name}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-stone-950 aspect-[16/10] border border-stone-800 flex items-center justify-center">
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase text-stone-400">
                Public CDN URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={previewFile.url}
                  className="flex-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewFile.url, previewFile.id)}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition shrink-0 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl w-full max-w-md space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-white text-lg">
                Delete Media File?
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-white">"{fileToDelete.name}"</strong>? If this image is used as a featured image or inside an article body, it may break on the public site.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-300 hover:text-white hover:bg-stone-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Media</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
