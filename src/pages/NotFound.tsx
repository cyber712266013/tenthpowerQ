import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>الصفحة غير موجودة | القوة العاشرة</title>
      </Helmet>

      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        {/* 404 */}
        <p
          className="text-8xl md:text-9xl font-bold leading-none mb-6 select-none"
          style={{ color: "var(--color-border-dark)" }}
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="text-xl md:text-2xl font-semibold text-[var(--color-primary)] mb-3">
          هذه الصفحة غير موجودة
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-8 max-w-xs">
          يبدو أن الرابط الذي فتحته غير صحيح أو تمت إزالة الصفحة.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors duration-200"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            العودة إلى الرئيسية
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-200"
          >
            استعرض أعمالنا
          </Link>
        </div>
      </div>
    </>
  );
}
