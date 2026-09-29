import React, { useRef, useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Table as TableIcon,
  AlertTriangle,
  Lightbulb,
  Code,
  Eye,
  Undo,
  Redo,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onImageRequest?: () => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your veterinary-reviewed article here...',
  onImageRequest,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showHtml, setShowHtml] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Sync internal content on initial load or reset
  useEffect(() => {
    if (editorRef.current && !showHtml) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setHtmlContent(value || '');
  }, [value, showHtml]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      onChange(html);
    }
  };

  const exec = (command: string, val: string | undefined = undefined) => {
    if (showHtml) return;
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    handleInput();
  };

  const insertHeading = (tag: 'h2' | 'h3' | 'p') => {
    if (showHtml) return;
    exec('formatBlock', `<${tag}>`);
  };

  const handleInsertLink = () => {
    if (!linkUrl) return;
    const url = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('/')
      ? linkUrl
      : `https://${linkUrl}`;

    if (showHtml) {
      const aTag = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText || url}</a>`;
      setHtmlContent((prev) => prev + aTag);
      onChange(htmlContent + aTag);
    } else {
      editorRef.current?.focus();
      if (linkText) {
        document.execCommand('insertHTML', false, `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-orange-500 underline font-medium">${linkText}</a>`);
      } else {
        document.execCommand('createLink', false, url);
      }
      handleInput();
    }

    setLinkUrl('');
    setLinkText('');
    setShowLinkModal(false);
  };

  const handleInsertImage = () => {
    if (!imageUrl) return;
    const figHtml = `
      <figure class="my-6 rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-stone-800">
        <img src="${imageUrl}" alt="${imageAlt || 'Article illustration'}" class="w-full h-auto object-cover max-h-[460px]" loading="lazy" />
        ${imageCaption ? `<figcaption class="p-3 bg-stone-100 dark:bg-stone-900 text-xs text-stone-500 dark:text-stone-400 text-center italic border-t border-stone-200 dark:border-stone-800">${imageCaption}</figcaption>` : ''}
      </figure>
    `;

    if (showHtml) {
      const updated = htmlContent + figHtml;
      setHtmlContent(updated);
      onChange(updated);
    } else {
      editorRef.current?.focus();
      document.execCommand('insertHTML', false, figHtml);
      handleInput();
    }

    setImageUrl('');
    setImageCaption('');
    setImageAlt('');
    setShowImageModal(false);
  };

  const handleInsertCallout = (type: 'tip' | 'warning') => {
    const isTip = type === 'tip';
    const calloutHtml = `
      <div class="my-6 p-5 rounded-2xl ${
        isTip
          ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60'
          : 'bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60'
      }">
        <div class="flex items-center gap-2 mb-2 font-serif font-bold ${
          isTip ? 'text-amber-900 dark:text-amber-300' : 'text-rose-900 dark:text-rose-300'
        }">
          <span>${isTip ? '💡 Expert Care Tip:' : '⚠️ Veterinary Caution:'}</span>
        </div>
        <p class="text-sm ${
          isTip ? 'text-amber-950 dark:text-amber-100' : 'text-rose-950 dark:text-rose-100'
        }">Write your clinical note or advice highlight here...</p>
      </div>
    `;

    if (showHtml) {
      const updated = htmlContent + calloutHtml;
      setHtmlContent(updated);
      onChange(updated);
    } else {
      editorRef.current?.focus();
      document.execCommand('insertHTML', false, calloutHtml);
      handleInput();
    }
  };

  const handleInsertTable = () => {
    const tableHtml = `
      <div class="my-6 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
        <table class="w-full text-left text-sm">
          <thead class="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold border-b border-stone-200 dark:border-stone-700">
            <tr>
              <th class="p-3">Feature / Ingredient</th>
              <th class="p-3">Canine Benefit</th>
              <th class="p-3">Recommendation</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-200 dark:divide-stone-800">
            <tr>
              <td class="p-3 font-medium">Omega-3 Fatty Acids</td>
              <td class="p-3">Skin & coat shine, joint mobility</td>
              <td class="p-3">Daily dietary addition</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">Glucosamine</td>
              <td class="p-3">Cartilage protection</td>
              <td class="p-3">Recommended for seniors</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    if (showHtml) {
      const updated = htmlContent + tableHtml;
      setHtmlContent(updated);
      onChange(updated);
    } else {
      editorRef.current?.focus();
      document.execCommand('insertHTML', false, tableHtml);
      handleInput();
    }
  };

  const handleHtmlAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="border border-stone-700/80 rounded-2xl bg-stone-900 overflow-hidden shadow-inner flex flex-col focus-within:border-orange-500/80 transition-colors">
      {/* Editor Toolbar */}
      <div className="p-2 sm:p-2.5 bg-stone-950/80 border-b border-stone-800 flex flex-wrap items-center gap-1 sm:gap-1.5 select-none">
        {/* Headings */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-stone-800">
          <button
            type="button"
            onClick={() => insertHeading('p')}
            title="Normal Paragraph"
            className="p-1.5 rounded-lg text-xs font-semibold text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            P
          </button>
          <button
            type="button"
            onClick={() => insertHeading('h2')}
            title="Heading 2"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition flex items-center gap-0.5"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertHeading('h3')}
            title="Heading 3"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition flex items-center gap-0.5"
          >
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        {/* Text styling */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-stone-800">
          <button
            type="button"
            onClick={() => exec('bold')}
            title="Bold (Ctrl+B)"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('italic')}
            title="Italic (Ctrl+I)"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('underline')}
            title="Underline (Ctrl+U)"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-stone-800">
          <button
            type="button"
            onClick={() => exec('insertUnorderedList')}
            title="Bullet List"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('insertOrderedList')}
            title="Numbered List"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<blockquote>')}
            title="Blockquote"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>

        {/* Inserts: Links, Images, Dividers, Tables */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-stone-800">
          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            title="Insert Link"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (onImageRequest) {
                onImageRequest();
              } else {
                setShowImageModal(true);
              }
            }}
            title="Insert Image"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition flex items-center gap-1"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('insertHorizontalRule')}
            title="Divider Line"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertTable}
            title="Insert Table"
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Petzora Special Blocks */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-stone-800">
          <button
            type="button"
            onClick={() => handleInsertCallout('tip')}
            title="Care Tip Box"
            className="p-1.5 rounded-lg text-amber-400 hover:text-amber-200 hover:bg-stone-800 transition flex items-center gap-1 text-xs"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tip</span>
          </button>
          <button
            type="button"
            onClick={() => handleInsertCallout('warning')}
            title="Veterinary Caution Box"
            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-stone-800 transition flex items-center gap-1 text-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Caution</span>
          </button>
        </div>

        {/* Undo/Redo & Source toggle */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => exec('undo')}
            title="Undo"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec('redo')}
            title="Redo"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <Redo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowHtml(!showHtml)}
            title={showHtml ? 'Switch to Visual Editor' : 'Switch to HTML Source Code'}
            className={`p-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1 transition ${
              showHtml
                ? 'bg-orange-600 text-white'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            {showHtml ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            <span>{showHtml ? 'Visual' : 'HTML'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Box */}
      <div className="relative min-h-[360px] sm:min-h-[460px] p-5 flex flex-col flex-1 overflow-y-auto">
        {showHtml ? (
          <textarea
            value={htmlContent}
            onChange={handleHtmlAreaChange}
            className="w-full flex-1 min-h-[420px] font-mono text-sm bg-transparent text-stone-200 outline-none resize-y leading-relaxed"
            placeholder="Write or edit raw HTML content here..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="editor-content prose prose-invert max-w-none min-h-[420px] outline-none text-stone-100 font-sans leading-relaxed text-base focus:outline-none"
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* Insert Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-white text-lg">Insert Hyperlink</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                  Destination URL *
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or /dogs/puppy-guide"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm outline-none focus:border-orange-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                  Anchor Text (optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Read our full canine guide"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm outline-none focus:border-orange-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insert Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-white text-lg">Insert Image into Body</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                  Image URL *
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /images/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm outline-none focus:border-orange-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                  Alt Text (for accessibility & SEO)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Golden retriever resting on a soft dog bed"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Photo: Petzora editorial archive"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm outline-none focus:border-orange-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
