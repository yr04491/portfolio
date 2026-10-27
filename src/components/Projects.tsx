import { getPinnedRepos } from "@/lib/github";
import ProjectCard from "@/components/ProjectCard";
import { FEATURED_REPOS } from "@/config/projects";

export default async function Projects() {
  const repos = await getPinnedRepos();

  // 主要作品は FEATURED_REPOS の順番で並べ、それ以外は「その他の作品」へ
  const featured = FEATURED_REPOS.map((name) =>
    repos.find((repo) => repo.name === name)
  ).filter((repo): repo is NonNullable<typeof repo> => repo !== undefined);
  const others = repos.filter((repo) => !FEATURED_REPOS.includes(repo.name));

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
          <div className="space-y-16">
            {featured.length > 0 && (
              <div>
                <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-6">
                  Featured
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featured.map((repo) => (
                    <ProjectCard key={repo.name} repo={repo} featured />
                  ))}
                </div>
              </div>
            )}

            {others.length > 0 && (
              <div>
                <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-6">
                  Other Works
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {others.map((repo) => (
                    <ProjectCard key={repo.name} repo={repo} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
