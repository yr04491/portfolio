import { getPinnedRepos } from "@/lib/github";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects() {
  const repos = await getPinnedRepos();

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-100 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-8 text-center">
          Works
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-12 text-center">
          Projects
        </h2>

        {repos.length === 0 ? (
          <p className="text-neutral-400 text-center">プロジェクトを読み込み中...</p>
        ) : (
          <div className="overflow-y-auto max-h-[600px] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {repos.map((repo) => (
                <ProjectCard key={repo.name} repo={repo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
