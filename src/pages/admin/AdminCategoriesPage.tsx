import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  FolderTree,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Loader2,
  X,
  ExternalLink,
} from 'lucide-react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../lib/supabase';
import { CategoryInfo } from '../../types';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal state
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryInfo | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCats = async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryInfo) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      setFormError('Category name and slug are required.');
      return;
    }

    setSaving(true);
    setFormError(null);

    if (editingCategory) {
      const { success, error } = await updateCategory(editingCategory.id, {
        name,
        slug,
        description,
      });
      setSaving(false);
      if (success) {
        showToast('Category updated!');
        setIsModalOpen(false);
        fetchCats();
      } else {
        setFormError(error || 'Failed to update category');
      }
    } else {
      const { success, error } = await createCategory({
        name,
        slug,
        description,
      });
      setSaving(false);
      if (success) {
        showToast('Category created!');
        setIsModalOpen(false);
        fetchCats();
      } else {
        setFormError(error || 'Failed to create category');
      }
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    setDeleting(true);
    const { success, error } = await deleteCategory(categoryToDelete.id);
    setDeleting(false);

    if (success) {
      showToast('Category deleted.');
      setCategoryToDelete(null);
      fetchCats();
    } else {
      showToast(`Error deleting: ${error}`);
    }
  };

  return (
    <AdminLayout
      title="Category Management"
      subtitle="Organize editorial topics and public pet taxonomy"
      action={
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Category</span>
        </button>
      }
    >
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-orange-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-lg">
          {loading ? (
            <div className="p-16 text-center text-xs text-stone-400 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
              <span>Loading categories...</span>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-500 mx-auto">
                <FolderTree className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-white text-base">No Categories Found</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Run the database seed script in Supabase or add your first category here.
              </p>
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition mt-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Category</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-950 text-stone-400 font-mono uppercase tracking-wider border-b border-stone-800">
                  <tr>
                    <th className="p-4 sm:px-6">Category Name</th>
                    <th className="p-4">Slug / URL Path</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-right sm:pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/80">
                  {categories.map((cat) => (
                    <tr key={cat.id || cat.slug} className="hover:bg-stone-850/50 transition">
                      <td className="p-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-950/60 border border-orange-800/80 text-orange-400 flex items-center justify-center font-bold text-xs uppercase">
                            {cat.name.slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-sm text-white">
                              {cat.name}
                            </h4>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap font-mono text-[11px] text-orange-400">
                        /{cat.slug}
                      </td>

                      <td className="p-4 text-stone-400 text-xs max-w-md truncate">
                        {cat.description || '—'}
                      </td>

                      <td className="p-4 text-right sm:pr-6 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/${cat.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                            title="View Public Category Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => openEditModal(cat)}
                            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                            title="Edit Category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setCategoryToDelete(cat)}
                            className="p-2 rounded-lg text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-3xl w-full max-w-md space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-white text-lg">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1 font-semibold">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Dogs, Cats, Nutrition"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1 font-semibold">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase())}
                  placeholder="e.g. dogs, pet-care"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-stone-400 mb-1 font-semibold">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of articles in this category."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-white hover:bg-stone-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition flex items-center gap-2 shadow-md shadow-orange-950 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl w-full max-w-md space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-white text-lg">
                Delete Category?
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-white">"{categoryToDelete.name}"</strong>? Articles assigned to this category will not be deleted, but will have their category reference cleared.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
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
                  <span>Delete Category</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
