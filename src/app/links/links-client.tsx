"use client";

export { DotsCloud as DotsBackground } from "@/components/dots/dots-cloud";

export function OpenSheet({ target, children }: { target: string; children: React.ReactNode }) {
  return (
    <button
      className="more"
      type="button"
      onClick={() => (document.getElementById(target) as HTMLDialogElement | null)?.showModal()}
    >
      {children}
    </button>
  );
}

export function Sheet({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <dialog
      id={id}
      aria-label={label}
      onClick={(e) => {
        const el = e.target as HTMLElement;
        if (el === e.currentTarget || el.closest("[data-close]")) e.currentTarget.close();
      }}
    >
      <div className="sheet">
        <button className="close" type="button" data-close aria-label="Fechar">
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}
