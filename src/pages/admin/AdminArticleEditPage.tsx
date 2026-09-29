import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Eye,
  Upload,
  X,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Loader2,
  Trash2,
  Globe,
  Tag,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';
import {
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getCategories,
  getAuthors,
  uploadMediaFile,
  checkSlugUnique,
  isSupabaseConfigured,
} from '../../lib/supabase';
import { CategoryInfo, Author, Article } from '../../types';
import { SafeImage } from '../../components/SafeImage';

export const AdminArticleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('/images/hero-dog-cat.webp');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [categorySlug, setCategorySlug] = useState('dogs');
  const [authorId, setAuthorId] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [publishedAt, setPublishedAt] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [isFeatured, setIsFeatured] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [readingTime, setReadingTime] = useState('5 min read');

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogImage, setOgImage] = useState('');

  // Auxiliary State
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // File input ref for image upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Categories, Authors, and Article (if edit)
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      const [cats, auths] = await Promise.all([getCategories(), getAuthors()]);
      if (!mounted) return;

      setCategories(cats);
      setAuthors(auths);
      if (auths.length > 0) {
        setAuthorId(auths[0].id);
      }
      if (cats.length > 0) {
        setCategorySlug(cats[0].slug);
      }

      if (isEditing && id) {
        setLoadingInitial(true);
        const art = await getArticleById(id);
        if (mounted && art) {
          setTitle(art.title);
          setSlug(art.slug);
          setAutoSlug(false);
          setExcerpt(art.excerpt || '');
          setContent(art.content || '');
          setFeaturedImage(art.featuredImage || '/images/pet-fallback.webp');
          setImageAlt(art.imageAlt || '');
          setImageCaption(art.imageCaption || '');
          setCategorySlug(art.category || (cats[0]?.slug || 'dogs'));
          if (art.authorId) setAuthorId(art.authorId);
          setStatus(art.status);
          setIsFeatured(Boolean(art.isFeatured));
          setTagsInput(art.tags ? art.tags.join(', ') : '');
          setReadingTime(art.readingTime || '5 min read');
          setSeoTitle(art.seoTitle || '');
          setSeoDescription(art.seoDescription || '');
          setCanonicalUrl(art.canonicalUrl || '');
          setOgImage(art.ogImage || '');
          if (art.publishedAt) {
            setPublishedAt(new Date(art.publishedAt).toISOString().slice(0, 16));
          }
        }
        setLoadingInitial(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, [id, isEditing]);

  // Unsaved changes browser prompt
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Auto-generate slug from title if enabled
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setIsDirty(true);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Upload featured image to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMessage(null);

    const { url, error } = await uploadMediaFile(file);
    setUploadingImage(false);

    if (error) {
      setErrorMessage(`Image upload failed: ${error}. (Ensure storage bucket 'media' exists in Supabase).`);
    } else if (url) {
      setFeaturedImage(url);
      if (!ogImage) setOgImage(url);
      setIsDirty(true);
      showToast('Image uploaded successfully to Supabase Storage!');
    }
  };

  // Save handler (draft or publish)
  const handleSave = async (targetStatus: 'draft' | 'published') => {
    if (!title.trim()) {
      setErrorMessage('Please provide an article title.');
      return;
    }

    if (!slug.trim()) {
      setErrorMessage('Please provide a valid slug for the article URL.');
      return;
    }

    // Check slug uniqueness
    const isUnique = await checkSlugUnique(slug.trim(), isEditing ? id : undefined);
    if (!isUnique) {
      setErrorMessage(`The slug "${slug}" is already taken by another article. Please modify the slug.`);
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const chosenCat = categories.find((c) => c.slug.toLowerCase() === categorySlug.toLowerCase());

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      featured_image: featuredImage.trim(),
      image_alt: imageAlt.trim() || title.trim(),
      image_caption: imageCaption.trim(),
      category_id: chosenCat?.id,
      category_slug: categorySlug.toLowerCase(),
      author_id: authorId || undefined,
      status: targetStatus,
      is_featured: isFeatured,
      tags: parsedTags,
      reading_time: readingTime || '4 min read',
      seo_title: seoTitle.trim() || title.trim(),
      seo_description: seoDescription.trim() || excerpt.trim(),
      canonical_url: canonicalUrl.trim() || `https://petzora.shop/${categorySlug.toLowerCase()}/${slug.trim()}`,
      og_image: ogImage.trim() || featuredImage.trim(),
      published_at: targetStatus === 'published' ? new Date(publishedAt).toISOString() : null,
    };

    if (isEditing && id) {
      const { data, error } = await updateArticle(id, payload);
      setSaving(false);
      if (error) {
        setErrorMessage(error);
      } else {
        setIsDirty(false);
        setStatus(targetStatus);
        showToast(targetStatus === 'published' ? 'Article published successfully!' : 'Draft updated.');
      }
    } else {
      const { data, error } = await createArticle(payload);
      setSaving(false);
      if (error) {
        setErrorMessage(error);
      } else {
        setIsDirty(false);
        showToast(targetStatus === 'published' ? 'Article published!' : 'Draft created.');
        if (data?.id) {
          navigate(`/admin/articles/edit/${data.id}`, { replace: true });
        } else {
          navigate('/admin/articles');
        }
      }
    }
  };

  if (loadingInitial) {
    return (
      <AdminLayout title="Loading Article...">
        <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          <p className="text-xs font-mono text-stone-400">Loading article details from Supabase...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEditing ? 'Edit Article' : 'New Article'}
      subtitle={isEditing ? `Editing: ${title || slug}` : 'Draft or publish a veterinary-reviewed pet guide'}
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 transition flex items-center gap-1.5 border border-stone-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('published')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition flex items-center gap-1.5 shadow-md shadow-orange-950 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>{status === 'published' ? 'Update & Publish' : 'Publish Article'}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-orange-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Unable to save article</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Column (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2 font-semibold">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Why Does My Dog Follow Me Everywhere?"
                className="w-full px-4 py-3 rounded-2xl bg-stone-950 border border-stone-800 text-lg sm:text-xl font-serif font-bold text-white placeholder-stone-600 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Slug row */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
                  URL Permalink (Slug) *
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[10px] font-mono text-orange-400 hover:underline"
                >
                  {autoSlug ? 'Auto-generating from title' : 'Manual editing enabled'}
                </button>
              </div>
              <div className="flex items-center rounded-xl bg-stone-950 border border-stone-800 px-3.5 py-2 text-xs font-mono text-stone-400">
                <span className="text-stone-600 select-none">
                  https://petzora.shop/{categorySlug}/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setAutoSlug(false);
                    setIsDirty(true);
                  }}
                  className="bg-transparent text-white outline-none flex-1 ml-1"
                  placeholder="article-slug"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5 font-semibold">
                Article Summary / Excerpt *
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="A compelling 1-2 sentence overview of the article shown on cards and search results."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 outline-none focus:border-orange-500 transition leading-relaxed"
              />
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold">
                Article Body Content (Rich Text) *
              </label>
              <span className="text-[11px] text-stone-500 font-mono">
                {content.length > 0 ? `${content.split(/\s+/).filter(Boolean).length} words` : 'Empty'}
              </span>
            </div>
            <RichTextEditor
              value={content}
              onChange={(newHtml) => {
                setContent(newHtml);
                setIsDirty(true);
              }}
              placeholder="Write your veterinary guide, tips, clinical notes, and advice..."
            />
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
              <Globe className="w-4 h-4 text-orange-400" />
              <h3 className="font-serif font-bold text-white text-sm">
                Search Engine Optimization (SEO & Social Graph)
              </h3>
            </div>

            {/* Google Search Card Preview */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">
                Google Search Snippet Preview
              </span>
              <p className="text-xs text-stone-400 truncate">
                https://petzora.shop/{categorySlug}/{slug || 'article-slug'}
              </p>
              <h4 className="text-sm font-semibold text-blue-400 hover:underline truncate">
                {seoTitle || title || 'Article Title – Petzora'}
              </h4>
              <p className="text-xs text-stone-400 line-clamp-2">
                {seoDescription || excerpt || 'Article excerpt and description will appear here in Google Search results.'}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  SEO Meta Title (Defaults to Article Title)
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder={title || 'Custom search engine title'}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  SEO Meta Description (Defaults to Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => {
                    setSeoDescription(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder={excerpt || 'Concise description under 160 characters'}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                    Canonical URL Override (Optional)
                  </label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => {
                      setCanonicalUrl(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder={`https://petzora.shop/${categorySlug}/${slug}`}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                    Open Graph Share Image URL
                  </label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => {
                      setOgImage(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="https://petzora.shop/images/hero-dog-cat.webp"
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls Column (Right 1 col) */}
        <div className="space-y-6">
          {/* Publishing Status Box */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-white text-sm">Publishing Status</h3>

            {/* Status Selector */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1.5">
                Current Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatus('draft');
                    setIsDirty(true);
                  }}
                  className={`py-2 rounded-xl text-xs font-semibold transition border ${
                    status === 'draft'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('published');
                    setIsDirty(true);
                  }}
                  className={`py-2 rounded-xl text-xs font-semibold transition border ${
                    status === 'published'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  Published
                </button>
              </div>
            </div>

            {/* Published date */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1.5">
                Publish Date
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => {
                  setPublishedAt(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500 font-mono"
              />
            </div>

            {/* Featured toggle */}
            <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Featured Article</p>
                <p className="text-[11px] text-stone-500">Highlight in homepage top spots</p>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => {
                  setIsFeatured(e.target.checked);
                  setIsDirty(true);
                }}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 bg-stone-950 border-stone-800 cursor-pointer"
              />
            </div>

            {/* Reading time */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1">
                Reading Time Estimate
              </label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => {
                  setReadingTime(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="4 min read"
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Featured Image Box */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-white text-sm">Featured Image</h3>
              {featuredImage && (
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="text-[11px] text-stone-500 hover:text-rose-400"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Image Preview */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
              {featuredImage ? (
                <SafeImage
                  src={featuredImage}
                  alt={imageAlt || 'Featured image'}
                  className="w-full h-full object-cover"
                  fallbackSrc="/images/pet-fallback.webp"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-600 text-xs">
                  <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                  <span>No image selected</span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                disabled={uploadingImage}
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition flex items-center justify-center gap-2 border border-stone-700/80 disabled:opacity-50"
              >
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                    <span>Uploading to Supabase...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-orange-400" />
                    <span>Upload to Supabase Storage</span>
                  </>
                )}
              </button>
            </div>

            {/* Image URL fallback */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                Or Direct Image URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => {
                  setFeaturedImage(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="/images/hero-dog-cat.webp"
                className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => {
                  setImageAlt(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Golden retriever playing in the grass"
                className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Taxonomy: Category & Author */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-white text-sm">Classification</h3>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1.5">
                Category *
              </label>
              <select
                value={categorySlug}
                onChange={(e) => {
                  setCategorySlug(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name} ({c.slug})
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1.5">
                Article Author *
              </label>
              <select
                value={authorId}
                onChange={(e) => {
                  setAuthorId(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
              >
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role || 'Writer'})
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1.5">
                Tags (Comma separated)
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => {
                    setTagsInput(e.target.value);
                    setIsDirty(true);
                  }}
                  placeholder="puppy care, leash training, nutrition"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 sm:px-6 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold bg-orange-950 text-orange-400 border border-orange-800">
                  Preview Mode
                </span>
                <span className="text-xs text-stone-400">/{categorySlug}/{slug}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-stone-100 font-sans">
              <span className="px-3 py-1 rounded-full bg-orange-600 text-white font-mono uppercase text-xs font-semibold">
                {categorySlug}
              </span>
              <h1 className="font-serif font-black text-2xl sm:text-4xl text-white leading-tight">
                {title || 'Untitled Article'}
              </h1>
              <p className="text-base text-stone-300 italic">{excerpt}</p>
              {featuredImage && (
                <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-stone-800">
                  <SafeImage
                    src={featuredImage}
                    alt={imageAlt || title}
                    className="w-full h-full object-cover"
                    fallbackSrc="/images/pet-fallback.webp"
                  />
                </div>
              )}
              <div
                className="prose prose-invert max-w-none text-stone-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
