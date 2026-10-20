import { GithubIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { BrandDivider } from "@/components/ui/BrandDivider";
import { LogoMark, Wordmark } from "@/components/ui/LogoMark";
import { SITE } from "@/lib/site";

const LINK = "inline-flex items-center gap-1.5 rounded transition hover:text-primary";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
        <BrandDivider className="max-w-xs" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoMark className="size-9" />
            <div className="flex flex-col gap-1.5">
              <Wordmark className="text-base" />
              <p className="brand-label max-w-xs text-[10px] leading-relaxed text-text-muted">
                Comunidad de Agentes de Liderazgo y Gestión de Oportunidades
              </p>
            </div>
          </div>
          <div className="brand-label flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-text-muted">
            <span>
              <span className="text-primary">{"> "}</span>FISC UTP Coclé
            </span>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
              <InstagramIcon className="size-3.5" /> Instagram
            </a>
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
              <GithubIcon className="size-3.5" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
