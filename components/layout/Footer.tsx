import { GithubIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { SITE } from "@/lib/site";

const LINK = "inline-flex items-center gap-1.5 rounded transition hover:text-primary";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-6 font-mono text-xs text-text-muted sm:px-6">
        <span>
          <span className="text-primary">{"//"}</span>C_ALIGO
        </span>
        <span aria-hidden>·</span>
        <span>FISC UTP Coclé</span>
        <span aria-hidden>·</span>
        <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
          <InstagramIcon className="size-3.5" /> Instagram
        </a>
        <span aria-hidden>·</span>
        <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
          <GithubIcon className="size-3.5" /> GitHub
        </a>
      </div>
    </footer>
  );
}
