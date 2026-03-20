import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    User, Mail, Calendar, Edit3, Save, X,
    Bookmark, Eye, ChevronRight, Loader2, Crown, Shield, BadgeCheck
} from "lucide-react";
import { AUTH_REQUEST } from "../../configs/axios";
import { ENDPOINTS } from "../../configs/api";

// ─────────────────────────────────────────────
const ROLE_CONFIG = {
    ADMIN:  { label: "Quản trị viên", icon: Crown,  cls: "bg-red-100 text-red-600",    dot: "bg-red-500" },
    EDITOR: { label: "Biên tập viên", icon: Shield, cls: "bg-blue-100 text-blue-600",  dot: "bg-blue-500" },
    USER:   { label: "Người dùng",    icon: User,   cls: "bg-green-100 text-green-700", dot: "bg-green-500" },
};

const inputCls = "w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all placeholder-gray-300";
const readonlyCls = "w-full text-sm text-gray-800 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5";

// ─────────────────────────────────────────────
const BookmarkCard = ({ article }) => (
    <Link
        to={`/detail/${article.slug}`}
        state={{ articleSlug: article.slug }}
        className="group flex gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all"
    >
        <div className="w-20 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            {article.featuredImage
                ? <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">📰</div>
            }
        </div>
        <div className="flex-1 min-w-0 py-0.5">
            <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors leading-snug">
                {article.title}
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                {article.category?.name && (
                    <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">{article.category.name}</span>
                )}
                {article.viewCount != null && (
                    <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />{article.viewCount.toLocaleString("vi-VN")}
                    </span>
                )}
                {article.created && <span>{article.created}</span>}
            </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 self-center flex-shrink-0 group-hover:text-green-500 transition-colors" />
    </Link>
);

// ─────────────────────────────────────────────
const ProfilePage = () => {
    const [profile, setProfile]         = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [editing, setEditing]         = useState(false);
    const [form, setForm]               = useState({ firstName: "", lastName: "", dob: "" });
    const [saving, setSaving]           = useState(false);
    const [saveError, setSaveError]     = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [bookmarks, setBookmarks]     = useState([]);
    const [bmLoading, setBmLoading]     = useState(true);
    const [bmPagination, setBmPagination] = useState({ currentPage: 1, totalPages: 1, totalElements: 0 });

    // Load profile
    useEffect(() => {
        AUTH_REQUEST.get(ENDPOINTS.AUTH.ME)
            .then(res => {
                const u = res.data.result;
                setProfile(u);
                setForm({ firstName: u.firstName || "", lastName: u.lastName || "", dob: u.dob || "" });
            })
            .finally(() => setProfileLoading(false));
    }, []);

    // Load bookmarks
    const loadBookmarks = async (page = 1) => {
        setBmLoading(true);
        try {
            const res = await AUTH_REQUEST.get(`/content/articles/bookmarks?page=${page}&size=8`);
            const r = res.data.result;
            setBookmarks(r.data || []);
            setBmPagination({ currentPage: r.currentPage ?? 1, totalPages: r.totalPages ?? 1, totalElements: r.totalElements ?? 0 });
        } catch { setBookmarks([]); }
        finally { setBmLoading(false); }
    };
    useEffect(() => { loadBookmarks(1); }, []);

    const handleSave = async () => {
        if (!profile?.id) return;
        setSaving(true); setSaveError(null);
        try {
            await AUTH_REQUEST.put(ENDPOINTS.ADMIN.UPDATE_USER(profile.id), form);
            setProfile(p => ({ ...p, ...form }));
            setEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch { setSaveError("Có lỗi xảy ra, vui lòng thử lại"); }
        finally { setSaving(false); }
    };

    const roleKey    = profile?.roles?.[0]?.name || "USER";
    const roleConfig = ROLE_CONFIG[roleKey] || ROLE_CONFIG.USER;
    const RoleIcon   = roleConfig.icon;
    const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || profile?.username || "Người dùng";

    if (profileLoading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ── Hero cover ── */}
            <div className="h-40 bg-gradient-to-r from-green-500 via-emerald-400 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            <div className="max-w-3xl mx-auto px-4 -mt-12 pb-12 space-y-5">

                {/* ── Profile card ── */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 pt-4 pb-6">
                        {/* Avatar row */}
                        <div className="flex items-end justify-between mb-5">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                                    <span className="text-white text-4xl font-bold">
                                        {(profile?.username || "U").charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${roleConfig.dot} rounded-full border-2 border-white`} />
                            </div>

                            <div className="pb-1">
                                {!editing ? (
                                    <button onClick={() => setEditing(true)}
                                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 transition-all bg-white">
                                        <Edit3 className="w-3.5 h-3.5" /> Chỉnh sửa
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={() => { setEditing(false); setSaveError(null); }}
                                            className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
                                            <X className="w-3.5 h-3.5" /> Hủy
                                        </button>
                                        <button onClick={handleSave} disabled={saving}
                                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all shadow-sm disabled:opacity-50">
                                            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                            Lưu
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Name + role */}
                        <div className="mb-5">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${roleConfig.cls}`}>
                                    <RoleIcon className="w-3 h-3" /> {roleConfig.label}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 flex items-center gap-1.5">
                                <BadgeCheck className="w-3.5 h-3.5 text-green-500" />
                                @{profile?.username}
                            </p>
                        </div>

                        {/* Alerts */}
                        {saveSuccess && (
                            <div className="mb-4 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4" /> Cập nhật thông tin thành công!
                            </div>
                        )}
                        {saveError && (
                            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                                {saveError}
                            </div>
                        )}

                        {/* Fields grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email readonly */}
                            <div>
                                <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
                                    <Mail className="w-3.5 h-3.5" /> Email
                                </label>
                                <div className={readonlyCls}>{profile?.email || <span className="text-gray-400 italic">Chưa có</span>}</div>
                            </div>

                            {/* DOB */}
                            <div>
                                <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
                                    <Calendar className="w-3.5 h-3.5" /> Ngày sinh
                                </label>
                                {editing
                                    ? <input type="date" value={form.dob} onChange={e => setForm(p => ({ ...p, dob: e.target.value }))} className={inputCls} />
                                    : <div className={readonlyCls}>{profile?.dob ? new Date(profile.dob).toLocaleDateString("vi-VN") : <span className="text-gray-400 italic">Chưa có</span>}</div>
                                }
                            </div>

                            {/* Họ */}
                            <div>
                                <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
                                    <User className="w-3.5 h-3.5" /> Họ
                                </label>
                                {editing
                                    ? <input type="text" value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} placeholder="Nhập họ..." className={inputCls} />
                                    : <div className={readonlyCls}>{profile?.lastName || <span className="text-gray-400 italic">Chưa có</span>}</div>
                                }
                            </div>

                            {/* Tên */}
                            <div>
                                <label className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
                                    <User className="w-3.5 h-3.5" /> Tên
                                </label>
                                {editing
                                    ? <input type="text" value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} placeholder="Nhập tên..." className={inputCls} />
                                    : <div className={readonlyCls}>{profile?.firstName || <span className="text-gray-400 italic">Chưa có</span>}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bookmarks ── */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-green-500" />
                            <h2 className="text-sm font-bold text-gray-900">Bài viết đã lưu</h2>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                                {bmPagination.totalElements}
                            </span>
                        </div>
                    </div>

                    <div className="px-3 py-3">
                        {bmLoading ? (
                            <div className="space-y-2 p-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex gap-3 p-3 rounded-2xl">
                                        <div className="w-20 h-14 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
                                        <div className="flex-1 space-y-2 py-1">
                                            <div className="h-3 bg-gray-100 rounded-full animate-pulse" />
                                            <div className="h-3 bg-gray-100 rounded-full animate-pulse w-2/3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : bookmarks.length > 0 ? (
                            <>
                                <div className="divide-y divide-gray-50">
                                    {bookmarks.map(article => <BookmarkCard key={article.id} article={article} />)}
                                </div>
                                {bmPagination.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-gray-50">
                                        <button onClick={() => loadBookmarks(bmPagination.currentPage - 1)}
                                            disabled={bmPagination.currentPage === 1}
                                            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                                            ← Trước
                                        </button>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {bmPagination.currentPage} / {bmPagination.totalPages}
                                        </span>
                                        <button onClick={() => loadBookmarks(bmPagination.currentPage + 1)}
                                            disabled={bmPagination.currentPage === bmPagination.totalPages}
                                            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                                            Sau →
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-14 text-center">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <Bookmark className="w-6 h-6 text-gray-300" />
                                </div>
                                <p className="text-sm font-medium text-gray-400">Chưa có bài viết nào được lưu</p>
                                <p className="text-xs text-gray-300 mt-1">Bấm icon lưu khi đọc bài để lưu lại</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;